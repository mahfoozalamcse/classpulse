const express = require("express");
const router = express.Router();

let leaderboard = [
    { name: "Alice", score: 90 },
    { name: "Bob", score: 80 }
];

// Fetch Leaderboard
router.get("/", (req, res) => {
    res.json(leaderboard);
});

module.exports = router;
