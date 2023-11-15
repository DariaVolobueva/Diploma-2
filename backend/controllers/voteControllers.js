const Vote = require("../models/Vote");
const { ObjectId } = require("mongodb");

// @desc Get all votes
// @route GET /votes
// @access Public
const getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.find().lean();
        if (!votes?.length) {
            return res.status(400).json({ message: "No votes found" });
        }
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create new vote
// @route POST /votes
// @access Private
const createVote = async (req, res) => {
    const { question, options } = req.body;

    if (!question || !Array.isArray(options) || !options.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await Vote.findOne({ question }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate voting" });
    }

    // Create and store new vote
    const savedVote = await Vote.create({ question, options });
    console.log(savedVote);

    if (!savedVote) {
        res.status(400).json({ message: "Invalid vote data reseived" });
    } else {
        res.status(201).json(savedVote);
    }
};

// @desc Delete a vote
// @route DELETE /votes
// @access Private
const deleteVote = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "Vote ID Required" });
    }

    const vote = await Vote.findById(id).exec();

    if (!vote) {
        return res.status(400).json({ message: "Vote not found" });
    }

    const result = await vote.deleteOne();

    const reply = `Vote with ID ${result._id} deleted`;

    res.json(reply);
};

// @desc Update a vote (just add a resident id in the array of voters)
// @route PATCH /votes
// @access Private
const updateVote = async (req, res) => {
    const { id, residentIds, optionNum } = req.body;

    // Confirm data
    if (!id || !residentIds || !optionNum) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const vote = await Vote.findById(id).exec();

    const isIdPresent = vote.voters.some((item) =>
        item._id.equals(new ObjectId(residentIds))
    );
    console.log(isIdPresent);

    if (isIdPresent) {
        console.log("Resident already voted");
        return res.status(400).json({ message: "Resident already voted" });
    }

    const optionIndex = vote.options.findIndex(
        (option) => option._id == optionNum
    );
    vote.options[optionIndex].votes += 1;

    if (!vote) {
        return res.status(400).json({ message: "Vote not found" });
    }
    vote.voters.push(residentIds);

    await vote.save();

    res.json({ message: `Vote was update` });
};

module.exports = {
    getAllVotes,
    createVote,
    deleteVote,
    updateVote,
};
