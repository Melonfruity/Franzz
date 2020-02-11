const { info, errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');
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
      message, channelID, authorization,
    }, callback) => {
      try {
        const user = await extractJWT(authorization);
        if (typeof message === 'string' && user) {
          info(message, channelID);
          // create the mongo message obj
          const newMessage = new Message({
            message,
            user: user.id,
            channel: channelID,
          });
          // save it
          const savedMessage = await newMessage.save();
          // message obj to return
          const newMessageObj = {
            user: {
              username: user.username,
            },
            message: savedMessage.message,
            created: savedMessage.created,
            id: savedMessage.id,
          };
          callback(newMessageObj);
          socket.to(channelID).emit('new message', { channelID, newMessageObj });
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

          const newChannelObj = {
            channelName,
          };
          callback(newChannelObj);
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
        // Check if channel name is a string
        if (typeof channelName === 'string' && user) {
          info(channelLink);
          const newChannelObj = {
            channelLink,
          };
          callback(newChannelObj);
        }
      } catch (err) {
        errm(err);
      }
    });

    // // socket (client)
    // socket.on('message', async ({
    //   message, channelID, authorization,
    // }) => {
    //   try {
    //     const user = await extractJWT(authorization);
    //     if (typeof message === 'string' && user) {
    //       info(message, channelID);
    //       const newMessage = new Message({
    //         message,
    //         user: user.id,
    //         channel: channelID,
    //       });
    //       const savedMessage = await newMessage.save();
    //       const newMessageObj = {
    //         user: {
    //           username: user.username,
    //         },
    //         message: savedMessage.message,
    //         created: savedMessage.created,
    //         id: savedMessage.id,
    //       };
    //       io.to(channelID).emit(`new message ${channelID}`, newMessageObj);
    //     }
    //   } catch (err) {
    //     errm(err);
    //   }
    // });

    // // socket (client)
    // socket.on('message', async ({
    //   message, channelID, authorization,
    // }) => {
    //   try {
    //     const user = await extractJWT(authorization);
    //     if (typeof message === 'string' && user) {
    //       info(message, channelID);
    //       const newMessage = new Message({
    //         message,
    //         user: user.id,
    //         channel: channelID,
    //       });
    //       const savedMessage = await newMessage.save();
    //       const newMessageObj = {
    //         user: {
    //           username: user.username,
    //         },
    //         message: savedMessage.message,
    //         created: savedMessage.created,
    //         id: savedMessage.id,
    //       };
    //       io.to(channelID).emit(`new message ${channelID}`, newMessageObj);
    //     }
    //   } catch (err) {
    //     errm(err);
    //   }
    // });

    // namespace is channel and room will be called channel
    socket.on('join channels', async (channelData) => {
      info(channelData);
      const { authorization } = channelData;
      const user = await extractJWT(authorization);
      if (user) {
        socket.join(user.channels);
        socket.emit('server message', { serverMsg: `joined rooms ${user.channels}` });
      }
      console.log('rooms:', Object.keys(io.sockets.adapter.rooms));
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
