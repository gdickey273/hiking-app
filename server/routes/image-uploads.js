const express = require('express');
const router = express.Router();

const upload = require('../services/image-uploads');

const singleUpload = upload.single('image');

router.post('/image-uploads', function(req, res) {
  singleUpload(req, res, function(err) {

    return res.json({ 'imageURL': req.file.location });
  });
});

module.exports = router;