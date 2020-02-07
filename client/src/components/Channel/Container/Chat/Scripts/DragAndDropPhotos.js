function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleFiles(files) {
  ([...files]).forEach((file) => console.log(file));
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
