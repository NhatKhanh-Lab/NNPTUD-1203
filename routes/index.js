var express = require('express');
var router = express.Router();
let userModel = require('../schemas/users'); // Add user schema

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'API is running' });
});

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

module.exports = router;
