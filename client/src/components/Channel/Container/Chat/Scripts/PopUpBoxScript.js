const BORDER_SIZE = 4;
const panel = document.getElementById("resize_box");

let m_pos;
function resize(e){
  const dx = m_pos - e.y;
  m_pos = e.y;
  panel.style.height = (parseInt(getComputedStyle(panel, '').height) - dx) + "px";
}

panel.addEventListener("mousedown", function(e){
  if (e.offsetY > BORDER_SIZE) {
    m_pos = e.y;
    document.addEventListener("mousemove", resize, false);
  }
}, false);

document.addEventListener("mouseup", function(){
    document.removeEventListener("mousemove", resize, false);
}, false);