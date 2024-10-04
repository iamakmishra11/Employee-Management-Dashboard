const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true, unique: true, validate: {
        validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }},
    f_Mobile: { type: String, required: true, validate: {
        validator: function(v) {
            return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid mobile number!`
    }},
    f_Designation: { type: String, required: true },
    f_Gender: { type: String, required: true },
    f_Course: { type: String, required: true },
    f_Image: { type: String, required: true },
    f_Createdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
