function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function uploadFile(file, channelId, albumName, emitSendMessage) {
  const url = 'http://localhost:8001/api/photos/uploadPhotos';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('channel', `${channelId}`);
  formData.append('album', `${albumName}`);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    // send the url of image/video to socket to be used for messaging
    .then((res) => res.json())
    .then((data) => {
      if (!albumName) {
        emitSendMessage(data.result.url, data.video, data.image);
      }
    })
    .catch((err) => { console.log(err); });
}

function handleFiles(files, channelId, albumName, emitSendMessage) {
  [...files].forEach((file) => {
    uploadFile(file, channelId, albumName, emitSendMessage);
  });
}

function handleDrop(e, channelId, albumName, emitSendMessage) {
  // get emitsendmessage to be passed through as a function
  preventDefaults(e);
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files, channelId, albumName, emitSendMessage);
}


module.exports = {
  preventDefaults,
  handleDrop,
  handleFiles,
};
