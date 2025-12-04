// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// --- CORS Configuration ---
const corsOptions = {
  // Allow requests from your specific frontend URL
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS middleware to ALL routes
app.use(cors(corsOptions));

// --- Mock User Data ---
const mockUsers = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice.s@example.com",
    role: "Administrator",
  },
  { id: 2, name: "Bob Johnson", email: "bob.j@example.com", role: "Editor" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    role: "Viewer",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.p@example.com",
    role: "Administrator",
  },
];

// --- API Endpoint: GET /api/users ---
app.get("/api/users", (req, res) => {
  // Send the mockUsers array as a JSON response
  res.json({
    message: "Successfully retrieved user list",
    users: mockUsers,
  });
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`✅ User list API listening at http://localhost:${port}`);
  console.log(`Endpoint URL: http://localhost:${port}/api/users`);
});
