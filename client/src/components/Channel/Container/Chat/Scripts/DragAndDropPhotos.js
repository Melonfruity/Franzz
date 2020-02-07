function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleFiles(files) {
  ([...files]).forEach((file) => console.log(file));
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files);
  preventDefaults(e);
}

function highlight() {
  change('highlight');
}

function unhighlight() {
  change('');
}

function dragEnter(e) {
  highlight();
  preventDefaults(e);
}

function dragLeave(e) {
  unhighlight();
  preventDefaults(e);
}

function dragOver(e) {
  highlight();
  preventDefaults(e);
}

module.exports = { dragEnter, dragLeave, dragOver, handleDrop}