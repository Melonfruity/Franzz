
import React from 'react';
import UserList from '../UserList/UserList'

const RightUI = ({ changeView, moduleView, userList, userStatus }) => {

  console.log("userlist1 ", userList)
  console.log("userstatus1 ", userStatus)
  
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
      <UserList userList={userList} userStatus={userStatus}/>
    </div>
  );
};

export default RightUI;
