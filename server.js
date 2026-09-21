import express from "express";
import cors from "cors";
import products from "./data/products.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the root route");
});

app.get("/api/products/all", (req, res) => {
  if (!products) return res.sendStatus(404);
  console.log(products);

  res.status(200).json(products);
});

app.get("/api/products/recommended", (req, res) => {
  const recommendedProducts = products.splice(0, 10);
  res.send(recommendedProducts);
});

// gets product with id using params
app.get("/api/product/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  try {
    const findProduct = products.find((product) => product.id === parsedId);
    if (!findProduct) res.status(404).json({ msg: "Product not found" });
    res.status(200).send(findProduct);
  } catch (error) {
    res.status(400).json({ msg: "Bad request" });
  }
});

// filters products with category
app.get("/api/products/category", (req, res) => {
  const searchQuery = req.query.category
    .split(" ")
    .join("")
    .trim()
    .toLowerCase();

  const queryProducts = products.filter(
    (product) => product.category.toLowerCase() === searchQuery,
  );
  res.status(200).send(queryProducts);
});

export default app;
