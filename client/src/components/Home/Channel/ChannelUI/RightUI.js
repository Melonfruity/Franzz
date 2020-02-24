
import React from 'react';
import UserList from '../../UserList/UserList';


const RightUI = ({ userList, userStatus, changeView }) => {

  function toggleStalkerMap() {
    changeView((prev) => (
      {
        imageBox: false,
        stalkerMap: !prev.stalkerMap,
        video: false,
      }));
  }

  function toggleImageBox() {
    changeView((prev) => (
      {
        stalkerMap: false,
        imageBox: !prev.imageBox,
        video: false,
      }));
  }

  function toggleVideoSync() {
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
        <button type="button" aria-label="stalker" id="stalkerMapButton" onClick={toggleStalkerMap} />
        <button type="button" aria-label="gallery" id="photoGalleryButton" onClick={toggleImageBox} />
        <button type="button" aria-label="video" id="videoSyncButton" onClick={toggleVideoSync} />
      </div>
      <UserList userList={userList} userStatus={userStatus} />
    </div>
  );
};

export default RightUI;
