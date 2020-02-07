const photosRouter = require('express').Router();
const cloudinary = require('cloudinary');
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = require('../utils/config');

// Setup for cloud-based api for photos
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

// uploads photos to the cloud (cloudinary)
channelRouter.post('/uploadPhoto', async (req, res) => {
  console.log(req);
});
