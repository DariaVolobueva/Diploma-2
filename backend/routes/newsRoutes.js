const express = require("express");
const router = express.Router();
const newsControllers = require("../controllers/newsControllers");
const verifyJWT = require("../middleware/verifyJWT");
const upload = require("../middleware/uploadFile");

router.route("/").get(newsControllers.getAllNews);
router.use(verifyJWT);
router
    .route("/")
    .post(upload, newsControllers.createNewNews)
    .patch(upload, newsControllers.updateNews)
    .delete(newsControllers.deleteNews);
module.exports = router;
