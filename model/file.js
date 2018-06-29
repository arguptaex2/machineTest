const mongoose = require('mongoose');
const _ = require('lodash');
require('../config/db');

const FileSchema = mongoose.Schema({
    filePath: {
        type: String
    }
});
FileSchema.statics.uploadFile = function (file) {
    return file.save();
}

const FileUp = mongoose.model('FileUp', FileSchema);
module.exports = {
    FileUp
}