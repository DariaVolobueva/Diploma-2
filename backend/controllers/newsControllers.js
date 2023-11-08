const News = require("../models/News");

// @desc Get all news
// @route GET /news
// @access Private
const getAllNews = async (req, res) => {
    const news = await News.find().lean();
    if (!news?.length) {
        return res.status(400).json({ message: "No news found" });
    }
    res.json(news);
};

// @desc Create new news
// @route POST /news
// @access Private
const createNewNews = async (req, res) => {
    const { title, text, img } = req.body;
    console.log(req.file.path);

    // Confirm data
    if (!title || !text || !img) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newObject = { title, text, img };

    // Create and store new resident
    const news = await News.create(newObject);
    console.log(news);

    if (news) {
        // created
        res.status(201).json({ message: `New news created` });
    } else {
        res.status(400).json({ message: "Invalid news data reseived" });
    }
};

// @desc Update a news
// @route PATCH /news
// @access Private
const updateNews = async (req, res) => {
    const { id, title, text, img } = req.body;
    console.log(req.file, req.body);
    console.log(req.body.title);
    // console.log(id, title, text, img);

    // Confirm data
    if (!id || !title || !text || !img) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const news = await News.findById(id).exec();

    if (!news) {
        return res.status(400).json({ message: "News not found" });
    }

    news.title = title;
    news.text = text;
    news.img = img;

    await news.save();

    res.json({ message: `News was update` });
};

// @desc Delete a news
// @route DELETE /news
// @access Private
const deleteNews = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ message: "News ID Required" });
    }

    const news = await News.findById(id).exec();

    if (!news) {
        return res.status(400).json({ message: "News not found" });
    }

    const result = await news.deleteOne();

    const reply = `New with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllNews,
    createNewNews,
    updateNews,
    deleteNews,
};
