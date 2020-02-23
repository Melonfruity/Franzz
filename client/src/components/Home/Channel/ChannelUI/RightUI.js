
import React from 'react';
import UserList from '../../UserList/UserList';


const RightUI = ({ moduleView, userList, userStatus, changeView, changeVideoState }) => {

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
        <button id="videoSyncButton" onClick={toggleVideoSync}/>
      </div>
      <UserList userList={userList} userStatus={userStatus} />
    </div>
  );
};

export default RightUI;
