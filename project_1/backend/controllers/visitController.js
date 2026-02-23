const Visit = require("../models/Visit");

// GET total visits
exports.getVisits = async (req, res) => {
  try {
    const visit = await Visit.findByPk(1); // id=1 ধরে নিচ্ছি
    if (!visit) return res.status(404).json({ error: "Visit not found" });
    res.json({ count: visit.total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch visits" });
  }
};

// ADD visit (increment)
exports.addVisit = async (req, res) => {
  try {
    let visit = await Visit.findByPk(1);

    // যদি প্রথমবার DB তে entry না থাকে, create করবে
    if (!visit) {
      visit = await Visit.create({ total: 1 });
      return res.json({ count: visit.total });
    }

    visit.total += 1;
    await visit.save();

    res.json({ count: visit.total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add visit" });
  }
};
