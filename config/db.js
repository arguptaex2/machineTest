const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = 'mongodb://localhost/bdx';


mongoose.connect(db);
var gridfs = require('mongoose-gridfs')({
    collection: 'files',
    model: 'FilesUp',
    mongooseConnection: mongoose.connection
});
mongoose.connection.on('connected', () => {
    console.log("Mongo: connected");
});
mongoose.connection.on('error', (e) => {
    console.log('Mongo Error:' + err);
})