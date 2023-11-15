const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [
            {
                text: {
                    type: String,
                    required: true,
                },
                votes: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        voters: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Resident",
                    required: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
