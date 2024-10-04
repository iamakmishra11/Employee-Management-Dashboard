const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only jpg/png files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create Employee
router.post('/', auth, upload.single('f_Image'), async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;
    const f_Image = req.file.path;

    try {
        let employee = new Employee({
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_Gender,
            f_Course,
            f_Image
        });

        await employee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Employees
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Employee
router.put('/:id', auth, upload.single('f_Image'), async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;
    const f_Image = req.file ? req.file.path : null;

    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        employee.f_Name = f_Name;
        employee.f_Email = f_Email;
        employee.f_Mobile = f_Mobile;
        employee.f_Designation = f_Designation;
        employee.f_Gender = f_Gender;
        employee.f_Course = f_Course;
        if (f_Image) employee.f_Image = f_Image;

        await employee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Employee
router.delete('/:id', auth, async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ msg: 'Employee not found' });

        await Employee.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
