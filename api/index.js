const express = require("express");
const path = require("path");

const app = express();

// Debug logging
console.log("API server starting...");
console.log("__dirname:", __dirname);
console.log("Static files path:", path.join(__dirname, "../dist/public"));

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

// Basic API routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

app.get("/api/system-status", (req, res) => {
  res.json({
    connectionStatus: "connected",
    lastUpdate: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.get("/api/sensor-readings", (req, res) => {
  res.json([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      temperature: 24.5,
      ph: 6.2,
      tdsLevel: 350,
    },
  ]);
});

app.get("/api/sensor-readings/latest", (req, res) => {
  res.json({
    id: 1,
    timestamp: new Date().toISOString(),
    temperature: 24.5,
    ph: 6.2,
    tdsLevel: 350,
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, "../dist/public")));

// Handle root path
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../dist/public/index.html");
  console.log("Serving index.html from:", indexPath);

  // Check if file exists
  const fs = require("fs");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("index.html not found at:", indexPath);
    res.status(404).send(`
      <html>
        <body>
          <h1>404 - Application Not Found</h1>
          <p>index.html not found at: ${indexPath}</p>
          <p>Please check if the build completed successfully.</p>
        </body>
      </html>
    `);
  }
});

// Handle all other routes - serve the React app (for client-side routing)
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../dist/public/index.html");
  console.log("Serving index.html for route:", req.path);

  // Check if file exists
  const fs = require("fs");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error("index.html not found at:", indexPath);
    res.status(404).send(`
      <html>
        <body>
          <h1>404 - Application Not Found</h1>
          <p>index.html not found at: ${indexPath}</p>
          <p>Please check if the build completed successfully.</p>
        </body>
      </html>
    `);
  }
});

module.exports = app;
