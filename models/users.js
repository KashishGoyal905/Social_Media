const mongoose = require('mongoose');
// requiring multer
// multer will help us store file remotely or locally in this case locally
const multer = require('multer');
const path = require('path');
// path where we need to store our images
const AVATAR_PATH = path.join('uploads/users/avatars');
const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    avatar: {
        type: 'string',
    }
});

// using multer to store the impage in the local machine inside specific folder path
// telling multer to store the impage into our local machine onto the destinatoion specified with the filename specified.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});

// multer middleware to call the storage ooption.

const User = mongoose.model('User', userSchema);

module.exports = User;