const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
//Config
const app = express();
app.use(express.json());
env.config();
const corsConfig = {
  origin: "*",
  method: "GET, PUT, PATCH, DELETE, HEAD, POST",
  credentials: true,
  exposeHeader: ["x-auth-token"],
};
app.use(cors(corsConfig));

const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const initialDataRoutes = require("./src/routes/admin/initialData");
const cartRoutes = require("./src/routes/cart");
const subProductRoutes = require("./src/routes/sub-product");
const serviceRoutes = require("./src/routes/service");
const addressRoutes = require("./src/routes/address");
const orderRoutes = require("./src/routes/order");
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
app.use("/public", express.static(path.join(__dirname, "src/uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", cartRoutes);
app.use("/api", subProductRoutes);
app.use("/api", serviceRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
