

function handleFiles(files) {
  ([...files]).forEach((file) => console.log(file));
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const { files } = dt;

  handleFiles(files);
}

function highlight() {
  change('highlight');
}

function unhighlight() {
  change('');
}

function DragEnter() {
  highlight();
}

function DragLeave() {
  unhighlight();
}

function DragOver() {
  highlight();
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}
