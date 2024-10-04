const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    f_Name: { type: String },
    f_Email: { type: String, unique: true, sparse: true },
    f_Mobile: { type: String },
    f_Designation: { type: String },
    f_Gender: { type: String },
    f_Course: { type: String },
    f_Image: { type: String },
    f_Createdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
