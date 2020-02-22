// eslint-disable-next-line import/prefer-default-export
export const useYoutube = (state, setState, socket) => {
  const changeVideoState = (url, channel) => {
    if (socket) {
      const videoObj = {
        url,
        channel,
        authorization: state.authorization,
      };
      setState((prev) => (
        {
          ...prev,
          videoStates: { ...prev.videoStates, [channel]: { url } },
        }
      ));
      socket.emit('change video state', videoObj);
    }
  };

  return {
    changeVideoState,
  };
};
