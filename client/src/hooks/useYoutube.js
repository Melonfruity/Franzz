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
      setState((prev) => (
        {
          ...prev,
          videoStates: { ...prev.videoStates, [channel]: { url, paused, played } },
        }
      ));
      socket.emit('change video state', videoObj);
    }
  };

  const syncVideo = (data) => {
    if (socket) {
      console.log(data.getCurrentTime());
    }
  };

  return {
    changeVideoState,
    syncVideo,
  };
};
