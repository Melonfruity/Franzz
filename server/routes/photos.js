const photosRouter = require('express').Router();
const cloudinary = require('cloudinary');
const formidable = require('formidable');
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = require('../utils/config');

// Setup for cloud-based api for photos
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

// uploads photos to the cloud (cloudinary)
photosRouter.post('/uploadPhoto', async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {

    // If it is a video upload do this
    if (files.file.type.includes('video')) {
      cloudinary.v2.uploader.upload(files.file.path,
        { resource_type: 'video' });
    } else { // if it is a photo
      cloudinary.v2.uploader.upload(files.file.path);
    }
  });
  res.send('file has been uploaded :)');
});

// returns all the files

module.exports = photosRouter;
