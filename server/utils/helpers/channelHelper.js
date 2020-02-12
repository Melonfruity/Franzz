const shortLinks = {};

const generateShortUrl = () => {
  // make sure short url is not used
  const shortUrl = Math.random().toString(36).substring(2, 15);
  if (shortLinks[shortUrl]) {
    return generateShortUrl();
  }
  return shortUrl;
};

const createInviteLink = (channel) => {
  const shortUrl = generateShortUrl();
  shortLinks[shortUrl] = {
    channel,
    created: Date.now(),
  };
  console.log(shortLinks);
  return shortUrl;
};

const getChannel = (shortUrl) => {
  if (shortLinks[shortUrl]) {
    const { channel, created } = shortLinks[shortUrl];
    if (channel) {
      console.log(shortLinks);
      if (Date.now() - created <= 3600) {
        console.log('link gets deleted');
        delete shortLinks[shortUrl];
        return false;
      }
      return channel;
    }
    return false;
  }
  return false;
};

const partOfChannel = (users, userID) => {
  return users.includes(userID);
};

module.exports = {
  createInviteLink,
  getChannel,
  partOfChannel,
};
