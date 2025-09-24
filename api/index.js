const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import and register routes
try {
  const { registerRoutes } = require("../server/routes");
  registerRoutes(app);
} catch (error) {
  console.error("Error loading routes:", error);
}

// Serve static files
app.use(express.static(path.join(__dirname, "../dist/public")));

// Handle root path - serve the React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

// Handle all other routes - serve the React app (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

module.exports = app;
