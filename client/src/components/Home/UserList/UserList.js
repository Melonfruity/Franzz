/* eslint-disable react/prop-types */
import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import UserItem from './UserItem';

const UserList = ({ userStatus }) => {
  const userListContainer = userStatus ? userStatus.map((element) => {
    const { username, id, online } = element;
    console.log(username, id, online)
    return (
      <div key={`${id}`} className="userItems">
        <UserItem
          name={username}
          online={online}
        />
        <Divider />
      </div>
    );
  }) : <p>Loading...</p>;

  return (
    <div className="userListContainer">
      <p className="onlineUsers">Online Users</p>
      <div className="userList">
        <List>
          {userListContainer}
        </List>
      </div>
    </div>
  );
};

export default UserList;
