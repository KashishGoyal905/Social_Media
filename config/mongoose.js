const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial');

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'error in connecting to the database'));

db.once('open', function (err) {
    console.log("sucessfully connected to the database");
})