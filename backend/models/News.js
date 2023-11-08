const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        text: {
            type: String,
            require: true,
        },
        img: {
            type: String,
            default: "src/assets/images/logo1.png",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("News", newsSchema);
