const express = require("express");
const cors = require("cors");
require("dotenv").config();
const songRoutes = require("./routers/songRoutes");
const userRoutes=require("./routers/userrouter")
const ReviewRoutes = require("./routers/reviewRoutes");
const AlbumRoutes=require("./routers/albumRoutes")
const app = express();
const PORT = process.env.PORT || 5002;
const connectDB = require("./lib/dbconnect");
const cookieParser = require("cookie-parser");
const corsOptions = {
    origin: [process.env.Frontend_Url], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/songs", songRoutes);
app.use("/auth",  userRoutes);
app.use("/Review", ReviewRoutes);
app.use("/Album", AlbumRoutes);

app.listen(PORT, () => {
  
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
});
