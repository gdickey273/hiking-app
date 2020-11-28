const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS,
  accessKeyId: process.env.REACT_APP_AWS_KEY_ID,
  region: 'us-east-1'
});
 
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG or PNG'), false);
  }
}
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'trails-app-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;