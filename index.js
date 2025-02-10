const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample products array
let products = [
  { id: 1, name: "Xiaomi Mi 12", brand: "Xiaomi", price: 60000, ram: 6, rom: 256, rating: 4.5, os: "Android", camera: 108 },
  { id: 2, name: "iPhone 13", brand: "Apple", price: 120000, ram: 8, rom: 512, rating: 4.8, os: "iOS", camera: 12 },
  { id: 3, name: "Samsung Galaxy S22", brand: "Samsung", price: 80000, ram: 12, rom: 256, rating: 4.6, os: "Android", camera: 50 },
  { id: 4, name: "OnePlus 10 Pro", brand: "OnePlus", price: 70000, ram: 12, rom: 512, rating: 4.7, os: "Android", camera: 48 },
  { id: 5, name: "Google Pixel 6", brand: "Google", price: 65000, ram: 8, rom: 128, rating: 4.5, os: "Android", camera: 50 }
];

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running! Visit /products to see available products.");
});

// Endpoint 1: Get products sorted by popularity (rating)
app.get("/products/sort/popularity", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
  res.json({ products: sortedProducts });
});

// Endpoint 2: Get products sorted by price (high to low)
app.get("/products/sort/price-high-to-low", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => b.price - a.price);
  res.json({ products: sortedProducts });
});

// Endpoint 3: Get products sorted by price (low to high)
app.get("/products/sort/price-low-to-high", (req, res) => {
  let sortedProducts = [...products].sort((a, b) => a.price - b.price);
  res.json({ products: sortedProducts });
});

// Endpoint 4: Filter products by RAM
app.get("/products/filter/ram", (req, res) => {
  let ram = parseInt(req.query.ram);
  if (isNaN(ram)) return res.status(400).json({ error: "Invalid RAM value" });
  let filteredProducts = products.filter(product => product.ram === ram);
  res.json({ products: filteredProducts });
});

// Endpoint 5: Filter products by ROM
app.get("/products/filter/rom", (req, res) => {
  let rom = parseInt(req.query.rom);
  if (isNaN(rom)) return res.status(400).json({ error: "Invalid ROM value" });
  let filteredProducts = products.filter(product => product.rom === rom);
  res.json({ products: filteredProducts });
});

// Endpoint 6: Filter products by brand (case insensitive)
app.get("/products/filter/brand", (req, res) => {
  let brand = req.query.brand;
  if (!brand) return res.status(400).json({ error: "Brand is required" });
  let filteredProducts = products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
  res.json({ products: filteredProducts });
});

// Endpoint 7: Filter products by OS (case insensitive)
app.get("/products/filter/os", (req, res) => {
  let os = req.query.os;
  if (!os) return res.status(400).json({ error: "OS is required" });
  let filteredProducts = products.filter(product => product.os.toLowerCase() === os.toLowerCase());
  res.json({ products: filteredProducts });
});

// Endpoint 8: Filter products by price (less than or equal to)
app.get("/products/filter/price", (req, res) => {
  let price = parseInt(req.query.price);
  if (isNaN(price)) return res.status(400).json({ error: "Invalid price value" });
  let filteredProducts = products.filter(product => product.price <= price);
  res.json({ products: filteredProducts });
});

// Endpoint 9: Get all products
app.get("/products", (req, res) => {
  res.json({ products });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
