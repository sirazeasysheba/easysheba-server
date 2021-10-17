const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//Config
const app = express();
app.use(express.json());
env.config();
app.use(cors());

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
//Database Connection

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzfwj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

//API
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
