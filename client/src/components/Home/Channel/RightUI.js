
import React from 'react';

const RightUI = ({ moduleView, changeView }) => {
  
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
        <button onClick={toggleStalkerMap} />
        <button onClick={toggleImageBox} />
      </div>
    </div>
  );
};

export default RightUI;
