
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function uploadFile(file) {
  const url = 'http://localhost:8001/api/photos/uploadPhoto';
  const formData = new FormData();

  formData.append('file', file);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(() => { /* Done. Inform the user */ })
    .catch(() => { /* Error. Inform the user */ });
}

function handleFiles(files) {
  ([...files]).forEach(uploadFile);
}

function handleDrop(e) {
  preventDefaults(e);
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files);
}


module.exports = {
  preventDefaults,
  handleDrop,
};
