const express = require("express");
const router = express.Router();
const Influencer = require("../models/Influencer");

// ✅ Admin Secret
const ADMIN_SECRET = "12345";

// helper to generate slug
const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000);
};

// ✅ Protected Route (ONLY ADMIN CAN ADD)
router.post("/", async (req, res) => {

  // 🔐 Check admin authorization
  if (req.headers.authorization !== ADMIN_SECRET) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    const slug = generateSlug(req.body.name);

    const influencer = new Influencer({
      ...req.body,
      slug
    });

    await influencer.save();

    res.json(influencer);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// get by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const influencer = await Influencer.findOne({ slug: req.params.slug });
    res.json(influencer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;