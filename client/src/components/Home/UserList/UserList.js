/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import UserItem from './UserItem';

// import './channelList.css';

const UserList = ({userList, userStatus}) => {
  console.log("userlist1 ", userList)
  console.log("userStatus1 ", userStatus)

  const userListContainer = userStatus.map((element) => {
    let name = element.username
    console.log("name",name)
    return (
      <div>
        <li className="channelItems">
          <UserItem
            name={name}
          />
        </li>
        <Divider />
      </div>
    );
  });

  return (
    <div className="userList">
      <p className="onlineUsers">Online:</p>
        <List>
          {userListContainer}
        </List>
    </div>
  );
};

export default UserList;
