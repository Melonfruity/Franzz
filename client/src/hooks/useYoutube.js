// eslint-disable-next-line import/prefer-default-export
export const useYoutube = (state, setState, socket) => {
  const changeVideoState = (url, channel, paused, played) => {
    if (socket) {
      const videoObj = {
        url,
        paused,
        played,
        channel,
        authorization: state.authorization,
      };
      socket.emit('change video state', videoObj);
    }
  };

  const syncVideo = (data, channel) => {
    if (socket) {
      const timeObj = {
        time: data,
        channel,
        authorization: state.authorization,
      };
      socket.emit('change video time', timeObj);
    }
  };

  return {
    changeVideoState,
    syncVideo,
  };
};
