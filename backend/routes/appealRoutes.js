const express = require("express");
const router = express.Router();
const appealControllear = require("../controllers/appealControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
    .route("/")
    .get(appealControllear.getAllAppeals)
    .post(appealControllear.createNewAppeal)
    .patch(appealControllear.updateAppeals)
    .delete(appealControllear.deleteAppeals);

module.exports = router;
