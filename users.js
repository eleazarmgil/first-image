const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true
        }
    });

const User = mongoose.model('User', usersSchema);

module.exports = User;