import express from "express";
import cors from "cors";
import products from "./data/products.js";

const app = express();
app.use(cors());

app.listen("3000", () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("This is the root route");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
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
app.get("/api/products/query", (req, res) => {
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
