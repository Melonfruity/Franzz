let mousePosition;
let box;
let boxHeight;

function resize(e){
  if (e.offsetY >= boxHeight) {
    const dx = mousePosition - e.y;
    mousePosition = e.y;
    box.style.height = (parseInt(getComputedStyle(box, '').height) - dx) + "px";
  }
}
const mouseDownFunction = function(e){
  box = e.target;
  boxHeight=parseInt(getComputedStyle(box, '').height) - 10
  if (e.nativeEvent.offsetY >= boxHeight) {
    mousePosition = e.y;
    document.addEventListener("mousemove", resize, false);
  }
};

document.addEventListener("mouseup", function(){
  document.removeEventListener("mousemove", resize, false);
}, false);

module.exports = { mouseDownFunction }