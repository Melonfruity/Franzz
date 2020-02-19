import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useChat = (state, setState, socket) => {
  const updateMaps = (channel) => {
    const locationObj = {
      channel,
      location: state.center,
      authorization: state.authorization,
    };
    socket.emit('update maps', locationObj);
  };

  const emitSendMessage = (message, video, image) => {
    const channelID = state.currentChannel;
    const messageObj = {
      message,
      channelID,
      authorization: state.authorization,
      username: state.username,
      video,
      image,
    };
    socket.emit('message', messageObj, (newMessageObj) => {
      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [channelID]: {
              ...prev.channelStates[channelID],
              messages: prev.channelStates[channelID].messages.concat(newMessageObj),
            },
          },
        }));
    });
  };

  const emitCreateChannel = (channelName) => {
    const createChannelObj = {
      channelName,
      authorization: state.authorization,
    };
    socket.emit('create channel', createChannelObj, (channelData) => {
      const { data, messages } = channelData;
      const { channel } = data;

      // initializes a folder in the photo cloud for this channel
      const request = { channelId: `${channel}/chat`, albumName: false };
      axios.post('http://localhost:8001/api/photos/createEmptyFolder', { body: JSON.stringify(request) });

      updateMaps(channel);

      setState((prev) => (
        {
          ...prev,
          channelStates: {
            ...prev.channelStates,
            [channel]: {
              ...data,
              messages,
            },
          },
        }
      ));
    });
  };

  const emitJoinChannel = (channelLink) => {
    const joinChannelObj = {
      channelLink,
      authorization: state.authorization,
    };
    socket.emit('join channel', joinChannelObj, (channelData) => {
      const { error, data, messages } = channelData;
      if (!error) {
        const { channel } = data;

        updateMaps(channel);

        setState((prev) => (
          {
            ...prev,
            channelStates: {
              ...prev.channelStates,
              [channel]: {
                ...data,
                messages,
              },
            },
          }
        ));
      }
    });
  };

  return {
    emitSendMessage,
    emitJoinChannel,
    emitCreateChannel,
  };
};
