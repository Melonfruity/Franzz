
import React from 'react';

const RightUI = ({ moduleView, changeView, changeVideoState }) => {
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

  function toggleVideoSync() {
    if (moduleView.video === true) {
      changeVideoState(null, null, null, null);
    }
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: false,
        video: !prev.video,
      }
    ));
  }

  return (
    <div className="rightBarUI">
      <div className="widgetList">
        <button id="stalkerMapButton" onClick={toggleStalkerMap} />
        <button id="photoGalleryButton" onClick={toggleImageBox} />
        <button id="videoSyncButton" onClick={toggleVideoSync}/>
      </div>
    </div>
  );
};

export default RightUI;
