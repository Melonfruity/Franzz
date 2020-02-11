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
  return shortUrl;
};

const getChannel = (shortUrl) => {
  if (shortLinks[shortUrl]) {
    const { channel, created } = shortLinks[shortUrl];
    if (channel) {
      if (Date.now() - created >= 3600) {
        delete shortLinks[shortUrl];
        return false;
      }
      return channel;
    }
    return false;
  }
  return false;
};

module.exports = {
  createInviteLink,
  getChannel,
};
