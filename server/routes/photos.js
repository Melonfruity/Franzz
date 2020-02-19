const photosRouter = require('express').Router();
const cloudinary = require('cloudinary');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = require('../utils/config');

photosRouter.use(bodyParser.json());

// create a socket here where we send the data to the server and send it back to
// the client (photos and video display)

// Setup for cloud-based api for photos
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

// uploads files to the cloud (cloudinary)
photosRouter.post('/uploadPhotos', async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    // If it is a video upload do this
    const filePath = `${fields.channel}/${fields.album}`;
    if (files.file.type.includes('video')) {
      cloudinary.v2.uploader.upload(files.file.path,
        {
          resource_type: 'video',
          folder: filePath,
        }).then((result) => res.send({ result, video: true, image: false }));
    } else { // if it is a photoa
      cloudinary.v2.uploader.upload(files.file.path,
        {
          folder: filePath,
        }).then((result) => res.send({ result, video: false, image: true }));
    }
  });
});

// returns all the images/videos from the chat
photosRouter.get('/getChannelPhotos/:channelId/:path/:album', async (req, res) => {
  const firstPath = `${req.params.channelId}/${req.params.path}`;
  const album = req.params.album === 'false'; // if this is false, we are only grabbing chat
  const finalPath = album
    ? `${firstPath}` : `${firstPath}/${req.params.album}`;
  cloudinary.v2.search
    .expression(`folder:${finalPath}`)
    .execute()
    .then((result) => { res.send(result); });
});


// creates an empty folder (used for new channels and creating albums)
// input => {channelId: 'example', albunName: 'exampleAlbum'}
photosRouter.post('/createEmptyFolder', (req, res) => {
  // gather path names for folder/album
  const channelFolder = req.body.channelId;
  const albumFolder = req.body.albumName;
  const filePath = albumFolder
    ? `${channelFolder}/${albumFolder}/sample` : `${channelFolder}/sample`;

  // adds the photo as a placeholder to create a folder (bc we can't create an empty folder)
  cloudinary.v2.uploader.upload('https://res.cloudinary.com/jekmessaging/image/upload/v1580958253/sample.jpg',
    {
      public_id: filePath,
    },
    (error, result) => {
      // deletes the placeholder photo to empty album
      cloudinary.v2.uploader.destroy(result.public_id);
    });

  res.send('file has been uploaded :)');
});

// Gets the album for a channel
photosRouter.get('/getAlbums/:channelId', (req, res) => {
  const { channelId } = req.params;
  const path = `${channelId}/albums`;
  cloudinary.v2.api.sub_folders(path, (error, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ folders: [] });
    }
  });
});

photosRouter.get('/coverPhoto/:channelId/:album/:albumName', (req, res) => {
  const albumPath = `${req.params.channelId}/${req.params.album}/${req.params.albumName}`;
  cloudinary.v2.search
    .expression(`folder=${albumPath}`)
    .sort_by('uploaded_at', 'desc')
    .execute().then((result) => {
      res.send([result.resources[0].resource_type, result.resources[0].url]);
    });
});

module.exports = photosRouter;
