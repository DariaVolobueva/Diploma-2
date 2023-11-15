const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
    .route("/")
    .get(voteController.getAllVotes)
    .post(voteController.createVote)
    .delete(voteController.deleteVote)
    .patch(voteController.updateVote);

module.exports = router;
