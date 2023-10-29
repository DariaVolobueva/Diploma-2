const Appeal = require("../models/Appeal");

// @desc Get all appeals
// @route GET /appeals
// @access Private
const getAllAppeals = async (req, res) => {
    const appeals = await Appeal.find().lean();
    if (!appeals?.length) {
        return res.status(400).json({ message: "No appeals found" });
    }
    res.json(appeals);
};

// @desc Create new appeal
// @route POST /appeals
// @access Private
const createNewAppeal = async (req, res) => {
    const { user, text } = req.body;

    // Confirm data
    if (!user || !text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const appealObject = { user, text };

    // Create and store new resident
    const appeal = await Appeal.create(appealObject);
    console.log(appeal);

    if (appeal) {
        // created
        res.status(201).json({ message: `New appeal created` });
    } else {
        res.status(400).json({ message: "Invalid appeal data reseived" });
    }
};

// @desc Update a appeal
// @route PATCH /appeals
// @access Private
const updateAppeals = async (req, res) => {
    const { id, user, text, status } = req.body;

    // Confirm data
    if (!id || !user || !text || !status) {
        console.log(!status);
        return res.status(400).json({ message: "All fields are required" });
    }

    const appeal = await Appeal.findById(id).exec();

    if (!appeal) {
        return res.status(400).json({ message: "Appeal not found" });
    }

    appeal.text = text;
    appeal.status = status;

    await appeal.save();

    res.json({ message: `Appeal was update` });
};

// @desc Delete a appeal
// @route DELETE /appeals
// @access Private
const deleteAppeals = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "Appeal ID Required" });
    }

    const appeal = await Appeal.findById(id).exec();

    if (!appeal) {
        return res.status(400).json({ message: "Appeal not found" });
    }

    const result = await appeal.deleteOne();

    const reply = `Appeal with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllAppeals,
    createNewAppeal,
    updateAppeals,
    deleteAppeals,
};
