
import React from 'react';

const RightUI = ({ changeView }) => {
  
  function toggleStalkerMap() {
    changeView((prev) => (
      {
        imageBox: false,
        stalkerMap: !prev.stalkerMap,
      }));
  }

  function toggleImageBox() {
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: !prev.imageBox,
      }));
  }

  return (
    <div className="rightBarUI">
      <div className="widgetList">
        <button id="stalkerMapButton" onClick={toggleStalkerMap} />
        <button id="photoGalleryButton" onClick={toggleImageBox} />
      </div>
    </div>
  );
};

export default RightUI;
