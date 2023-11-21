const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            default: "Resident",
        },
    ],
    residentName: {
        type: String,
        required: true,
    },
    residentSurname: {
        type: String,
        required: true,
    },
    currentDebt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Resident", residentSchema);
