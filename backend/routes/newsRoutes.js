const express = require("express");
const router = express.Router();
const newsControllers = require("../controllers/newsControllers");
const verifyJWT = require("../middleware/verifyJWT");
// const upload = require("../middleware/uploadFile");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("first");
        cb(null, "../frontend/frontend/src/assets/images");
    },

    filename: (req, file, cb) => {
        console.log("second");
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer().single("image");

router.use(verifyJWT);

router
    .route("/")
    .get(newsControllers.getAllNews)
    .post(newsControllers.createNewNews)
    .patch(newsControllers.updateNews)
    .delete(newsControllers.deleteNews);

module.exports = router;
