const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

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

// appealSchema.plugin(AutoIncrement, {
//     inc_field: "ticket",
//     id: "ticketNums",
//     start_seq: 100,
// });

module.exports = mongoose.model("Appeal", appealSchema);

// mongoose.Schema.Types.ObjectId
