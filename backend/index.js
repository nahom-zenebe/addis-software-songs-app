const express = require("express");
const cors = require("cors");
require("dotenv").config();
const songRoutes = require("./routes/songRoutes");

const app = express();
const PORT = process.env.PORT || 5002;

const corsOptions = {
    origin: ["http://localhost:3001","http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  app.use(cors(corsOptions));
app.use(express.json());

app.use("/songs", songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
