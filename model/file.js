const mongoose = require('mongoose');

// Define the File schema
const FileSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    size: { // Size of the file in bytes
        type: Number,
        required: true
    },
    path: { // Path where the file is stored
        type: String,
        required: true
    },
}, { timestamps: true }); 

// Create the File model
const File = mongoose.model('File', FileSchema);

module.exports = {
    File
};
