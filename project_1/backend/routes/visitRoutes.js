const express = require("express");
const router = express.Router();
const { getVisits, addVisit } = require("../controllers/visitController");

router.get("/", getVisits);      // ভিজিট সংখ্যা দেখার জন্য
router.post("/", addVisit);      // নতুন ভিজিট এড করার জন্য

module.exports = router;
