const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dd-wallet-frontend.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// Routes
const influencerRoutes = require("./routes/influencerRoutes");
app.use("/api/influencers", influencerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));