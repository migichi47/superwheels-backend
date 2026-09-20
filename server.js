import express from "express";
import cors from "cors";
import products from "./data/products.js";

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("This is the root route");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

export default app;
