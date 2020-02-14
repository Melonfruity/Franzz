
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function uploadFile(file, albumId) {
  const url = 'http://localhost:8001/api/photos/uploadPhotoToChat';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('album', `${albumId}`);

  // check what formdata looks like and grab the image address
  // send the message to the socket send { message, video:true, photo:false}
  // use emitsendmessage here

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => { console.log(res); })
    .catch((err) => { console.log(err); });
}

function handleFiles(files, albumId) {
  for (const file of files) {
    uploadFile(file, albumId);
  }
}

function handleDrop(e, albumId) {
  // get emitsendmessage to be passed through as a function
  preventDefaults(e);
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files, albumId);
}


module.exports = {
  preventDefaults,
  handleDrop,
  handleFiles,
};
