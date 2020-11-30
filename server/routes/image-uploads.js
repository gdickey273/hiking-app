const express = require('express');
const router = express.Router();

const upload = require('../services/image-uploads');

const singleUpload = upload.single('image');

router.post('/image-uploads', function(req, res) {
  singleUpload(req, res, function(err) {
    if(err) {
      return res.status(422).send({errors: [{title: 'File upload error', detail: err.message}]})
    }
    return res.json({ 'imageURL': req.file.location });
  });
});

module.exports = router;