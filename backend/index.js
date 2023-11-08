require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/residents", require("./routes/residentRoutes"));
app.use("/appeals", require("./routes/appealRoutes"));
app.use("/news", require("./routes/newsRoutes"));

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, `${__dirname}/uploads`);
        cb(null, `../frontend/frontend/src/assets/images`);
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file);
    console.log(req.body.title);
    console.log(req.body.text);
});

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        "mongoErrLog.log"
    );
});
