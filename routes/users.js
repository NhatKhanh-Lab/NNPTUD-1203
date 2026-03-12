var express = require('express');
var router = express.Router();
let userModel = require('../schemas/users');

// POST /enable
router.post('/enable', async function (req, res) {
    try {
        let { email, username } = req.body;
        let user = await userModel.findOne({ email, username, isDeleted: false });
        if (user) {
            user.status = true;
            await user.save();
            res.send({ success: true, data: user });
        } else {
            res.status(404).send({ success: false, message: "Sai email hoặc username" });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// POST /disable
router.post('/disable', async function (req, res) {
    try {
        let { email, username } = req.body;
        let user = await userModel.findOne({ email, username, isDeleted: false });
        if (user) {
            user.status = false;
            await user.save();
            res.send({ success: true, data: user });
        } else {
            res.status(404).send({ success: false, message: "Sai email hoặc username" });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// GET all users
router.get('/', async function (req, res, next) {
    try {
        let data = await userModel.find({ isDeleted: false }).populate('role');
        res.send({ success: true, data: data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// GET user by ID
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await userModel.findOne({ isDeleted: false, _id: id }).populate('role');
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, message: "ID NOT FOUND" });
        }
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

// CREATE user
router.post('/', async function (req, res) {
    try {
        let newUser = new userModel({
            username: req.body.username,
            password: req.body.password, // Ideally, this should be hashed, but given the raw request it's just saved.
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            status: req.body.status,
            role: req.body.role,
            loginCount: req.body.loginCount
        });
        await newUser.save();
        res.send({ success: true, data: newUser });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// UPDATE user
router.put('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let result = await userModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        ).populate('role');
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, message: "ID NOT FOUND" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// DELETE (soft delete) user
router.delete('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let result = await userModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, message: "ID NOT FOUND" });
        }
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

module.exports = router;
