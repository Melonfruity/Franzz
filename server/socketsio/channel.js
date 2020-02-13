const { info, errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');
const { partOfChannel, getChannel } = require('../utils/helpers/channelHelper');
const Message = require('../models/Message');
const Channel = require('../models/Channel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // server
    socket.emit('server message', {
      serverMsg: 'connected to server',
    });

    // socket (client)
    socket.on('message', async ({
      message, channelID, authorization, video, image,
    }, callback) => {
      try {
        const user = await extractJWT(authorization);
        if (typeof message === 'string' && user) {
          info(message, channelID);
          // create the mongo message obj
          const newMessage = new Message({
            message,
            video,
            image,
            user: user.id,
            channel: channelID,
          });
          // save it
          const savedMessage = await newMessage.save();
          // message obj to return
          console.log(savedMessage);
          const newMessageObj = {
            user: {
              username: user.username,
            },
            message: savedMessage.message,
            created: savedMessage.created,
            video: savedMessage.video,
            image: savedMessage.image,
            id: savedMessage.id,
          };
          socket.to(channelID).emit('new message', { channelID, newMessageObj });
          callback(newMessageObj);
        }
      } catch (err) {
        errm(err);
      }
    });

    socket.on('create channel', async ({
      channelName, authorization,
    }, callback) => {
      try {
        const user = await extractJWT(authorization);
        // Check if channel name is a string
        if (typeof channelName === 'string' && user) {
          info(channelName);
          const newChannel = new Channel({
            name: channelName,
            users: user.id,
          });

          const savedChannel = await newChannel.save();
          user.channels = user.channels.concat(savedChannel.id);

          // update that user
          await user.save();

          const channelData = {
            data: {
              users: savedChannel.users,
              channel: savedChannel.id,
              name: savedChannel.name,
            },
            messages: [],
          };
          socket.join(savedChannel.id);
          callback(channelData);
        }
      } catch (err) {
        errm(err);
      }
    });

    socket.on('join channel', async ({
      channelLink, authorization,
    }, callback) => {
      try {
        const user = await extractJWT(authorization);
        const channelID = getChannel(channelLink);

        if (channelID && user) {
          info(channelLink, channelID);
          const channel = await Channel.findById(channelID);
          const isPartOfChannel = partOfChannel(channel.users, user.id);
          if (!isPartOfChannel) {
            channel.users = channel.users.concat(user.id);
            user.channels = user.channels.concat(channel.id);
            await user.save();

            const savedChannel = await channel.save();
            const messages = await Message
              .find({ channel: savedChannel.id })
              .populate('user')
              .sort({ created: 'asc' });

            const channelData = {
              data: {
                users: savedChannel.users,
                channel: savedChannel.id,
                name: savedChannel.name,
              },
              messages,
            };

            // welcome message
            const welcomeMessage = new Message({
              message: 'has joined the channel!',
              user: user.id,
              channel: channelID,
            });
            // save it
            const savedMessage = await welcomeMessage.save();
            // message obj to return
            const newMessageObj = {
              user: {
                username: user.username,
              },
              message: savedMessage.message,
              created: savedMessage.created,
              id: savedMessage.id,
            };

            socket.join(channelID);
            socket.emit('server message', {
              serverMsg: {
                'joining room': channelID,
              },
            });
            socket.to(channelID).emit('new message', { channelID, newMessageObj });
            callback(channelData);
          } else {
            callback({ error: 'Already part of channel' });
          }
        } else {
          callback({ error: 'Invalid invite link' });
        }
      } catch (err) {
        errm(err);
      }
    });

    // namespace is channel and room will be called channel
    socket.on('join channels', async (channelData) => {
      info(channelData);
      const { authorization } = channelData;
      const user = await extractJWT(authorization);
      if (user) {
        socket.join(user.channels);
        const joinedRooms = Object.keys(io.sockets.adapter.rooms);
        socket.emit('server message', {
          serverMsg: {
            'joined rooms': joinedRooms,
          },
        });
      }
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
