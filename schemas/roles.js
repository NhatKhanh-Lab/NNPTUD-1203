let mongoose = require('mongoose');

let roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt (timestamp requirement)
});

module.exports = mongoose.model('role', roleSchema);
