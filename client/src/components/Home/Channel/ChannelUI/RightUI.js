
import React from 'react';
import UserList from '../../UserList/UserList';

const RightUI = ({
  changeView, moduleView, userList, userStatus,
}) => {
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

        <button type="button" aria-label="stalker" id="stalkerMapButton" onClick={toggleStalkerMap} />
        <button type="button" aria-label="gallery" id="photoGalleryButton" onClick={toggleImageBox} />
      </div>
      <UserList userList={userList} userStatus={userStatus} />
    </div>
  );
};

export default RightUI;
