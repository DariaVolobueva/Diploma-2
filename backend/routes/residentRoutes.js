const express = require("express");
const router = express.Router();
const residentsController = require("../controllers/residentsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
    .route("/")
    .get(residentsController.getAllResidents)
    .post(residentsController.createNewResidents)
    .patch(residentsController.updateResidents)
    .delete(residentsController.deleteResidents);

module.exports = router;
