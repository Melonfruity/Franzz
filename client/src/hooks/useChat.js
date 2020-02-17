module.exports = (state, setState, socket) => {
  const emitSendMessage = (message) => {
    const channelID = state.currentChannel;
    const messageObj = {
      message,
      channelID,
      authorization: state.authorization,
      username: state.username,
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

  const emitJoinChannel = (channelLink) => {
    const joinChannelObj = {
      channelLink,
      authorization: state.authorization,
    };
    socket.emit('join channel', joinChannelObj, (channelData) => {
      const { error, data, messages } = channelData;
      if (!error) {
        const { channel } = data;
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
      } else {
        console.log(error);
      }
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
      fetch('http://localhost:8001/api/photos/createEmptyFolder', {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => { console.log(res); })
        .catch((err) => { console.log(err); });

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

  return {
    emitSendMessage,
    emitJoinChannel,
    emitCreateChannel,
  };
};
