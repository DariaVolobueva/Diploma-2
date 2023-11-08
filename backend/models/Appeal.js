const mongoose = require("mongoose");

const appealSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Resident",
        },
        text: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Appeal", appealSchema);

// mongoose.Schema.Types.ObjectId
