const Resident = require("../models/Resident");
const bcrypt = require("bcrypt");

// @desc Get all residents
// @route GET /residents
// @access Private
const getAllResidents = async (req, res) => {
    const residents = await Resident.find().select("-password").lean();
    if (!residents?.length) {
        return res.status(400).json({ message: "No residents found" });
    }
    res.json(residents);
};

// @desc Create new resident
// @route POST /residents
// @access Private
const createNewResidents = async (req, res) => {
    const {
        username,
        password,
        roles,
        residentName,
        residentSurname,
        currentDebt,
    } = req.body;

    // Confirm data
    if (
        !username ||
        !password ||
        !Array.isArray(roles) ||
        !roles.length ||
        !residentName ||
        !residentSurname ||
        !currentDebt
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate
    const duplicate = await Resident.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate residents" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const residentObject = {
        username,
        password: hashedPwd,
        roles,
        residentName,
        residentSurname,
        currentDebt,
    };

    // Create and store new resident
    const resident = await Resident.create(residentObject);

    if (resident) {
        // created
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: "Invalid resident data reseived" });
    }
};

// @desc Update a resident
// @route PATCH /residents
// @access Private
const updateResidents = async (req, res) => {
    const { id, username, residentName, residentSurname, currentDebt } =
        req.body;

    // Confirm data
    if (!id || !username || !residentName || !residentSurname || !currentDebt) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const resident = await Resident.findById(id).exec();

    if (!resident) {
        return res.status(400).json({ message: "Resident not found" });
    }

    // Check for duplicate
    const duplicate = await Resident.findOne({ username }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate residents" });
    }

    resident.username = username;
    resident.residentName = residentName;
    resident.residentSurname = residentSurname;
    resident.currentDebt = currentDebt;

    const updatedResident = await resident.save();

    res.json({ message: `${updatedResident.username} updated` });
};

// @desc Delete a resident
// @route DELETE /residents
// @access Private
const deleteResidents = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "User ID Required" });
    }

    const resident = await Resident.findById(id).exec();

    if (!resident) {
        return res.status(400).json({ message: "Resident not found" });
    }

    const result = await resident.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllResidents,
    createNewResidents,
    updateResidents,
    deleteResidents,
};
