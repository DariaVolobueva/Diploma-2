const Resident = require("../models/Resident");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const foundResident = await Resident.findOne({ username });

    if (!foundResident) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, foundResident.password);

    if (!match) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
        {
            ResidentInfo: {
                username: foundResident.username,
                roles: foundResident.roles,
                id: foundResident.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { username: foundResident.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: false, //https
        sameSite: "Lax", //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles
    res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }

            const foundResident = await Resident.findOne({
                username: decoded.username,
            });

            if (!foundResident) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const accessToken = jwt.sign(
                {
                    ResidentInfo: {
                        username: foundResident.username,
                        roles: foundResident.roles,
                        id: foundResident.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            res.json({ accessToken });
        }
    );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: false });
    res.json({ message: "Cookie cleared" });
};

module.exports = { login, refresh, logout };
