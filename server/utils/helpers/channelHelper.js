const partOfChannel = (users, userID) => {
  return users.includes(userID);
};

module.exports = {
  partOfChannel,
};
