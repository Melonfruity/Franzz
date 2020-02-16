function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function uploadFile(file, albumId, EmitSendMessage) {
  const url = 'http://localhost:8001/api/photos/uploadPhotoToChat';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('album', `${albumId}`);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    // send the url of image/video to socket to be used for messaging
    .then((res) => res.json())
    .then((data) => {
      EmitSendMessage(data.result.url, data.video, data.image);
    })
    .catch((err) => { console.log(err); });
}

function handleFiles(files, albumId, EmitSendMessage) {
  [...files].forEach((file) => {
    uploadFile(file, albumId, EmitSendMessage);
  });
}

function handleDrop(e, albumId, emitSendMessage) {
  // get emitsendmessage to be passed through as a function
  preventDefaults(e);
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files, albumId, emitSendMessage);
}


module.exports = {
  preventDefaults,
  handleDrop,
  handleFiles,
};
