var express = require('express');
var router = express.Router();
let roleModel = require('../schemas/roles');
let userModel = require('../schemas/users');

// GET all roles
router.get('/', async function (req, res, next) {
    try {
        let data = await roleModel.find({ isDeleted: false });
        res.send({ success: true, data: data });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// GET role by ID
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await roleModel.findOne({ isDeleted: false, _id: id });
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, message: "ID NOT FOUND" });
        }
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

// GET all users by role id: /roles/:id/users
router.get('/:id/users', async function (req, res, next) {
    try {
        let roleId = req.params.id;
        let role = await roleModel.findOne({ isDeleted: false, _id: roleId });
        if (role) {
            let users = await userModel.find({ isDeleted: false, role: roleId }).populate('role');
            res.send({ success: true, data: users });
        } else {
            res.status(404).send({ success: false, message: "ROLE NOT FOUND" });
        }
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

// CREATE role
router.post('/', async function (req, res) {
    try {
        let newRole = new roleModel({
            name: req.body.name,
            description: req.body.description
        });
        await newRole.save();
        res.send({ success: true, data: newRole });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// UPDATE role
router.put('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let result = await roleModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            req.body,
            { new: true }
        );
        if (result) {
            res.send({ success: true, data: result });
        } else {
            res.status(404).send({ success: false, message: "ID NOT FOUND" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// DELETE (soft delete) role
router.delete('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let result = await roleModel.findOneAndUpdate(
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
