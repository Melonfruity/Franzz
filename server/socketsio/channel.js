const { info, errm } = require('../utils/logger');
const { extractJWT } = require('../utils/helpers/authHelper');
const Message = require('../models/Message');

module.exports = (io) => {

  io.on('connection', (socket) => {
    // server
    io.emit('server message', {
      serverMsg: 'connected to server',
    });

    // socket (client)
    socket.on('message', async ({
      message, channelID, authorization,
    }) => {
      try {
        const user = await extractJWT(authorization);
        if (typeof message === 'string' && user) {
          info(message, channelID);
          const newMessage = new Message({
            message,
            user: user.id,
            channel: channelID,
          });
          const savedMessage = await newMessage.save();
          const newMessageObj = {
            user: {
              username: user.username,
            },
            message: savedMessage.message,
            created: savedMessage.created,
            id: savedMessage.id,
          };
          io.to(channelID).emit(`new message ${channelID}`, newMessageObj);
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
      socket.join(user.channels);
      socket.emit('server message', { serverMsg: `joined rooms ${user.channels}` });
      console.log('rooms:', Object.keys(io.sockets.adapter.rooms));
    });

    socket.on('disconnect', () => {
      info('client disconnected');
    });
  });
};
