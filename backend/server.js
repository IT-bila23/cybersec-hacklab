const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// -- In-memory "database" for demo
let logs = [];
let score = 0;

// Utility: push log
function pushLog(type, status, meta = {}) {
  logs.unshift({ type, status, time: new Date().toISOString(), ...meta });
  if (logs.length > 200) logs.pop();
}

// XSS Challenge Endpoint
app.post("/api/xss", (req, res) => {
  const { input } = req.body || {};
  if (typeof input !== "string") {
    pushLog("XSS", "FAILED", { reason: "No input" });
    return res.json({ success: false, message: "Provide input string." });
  }

  // Extremely simplified "detection" of reflected XSS attempt for demo purposes.
  if (input.toLowerCase().includes("<script>")) {
    score += 50;
    pushLog("XSS", "SUCCESS", { payload: input });
    return res.json({
      success: true,
      message: "XSS attack successful!",
      flag: "FLAG{XSS_123}"
    });
  } else {
    pushLog("XSS", "FAILED", { payload: input });
    return res.json({ success: false, message: "No vulnerability exploited." });
  }
});

// Placeholder endpoints for future challenges
app.post("/api/sqli", (req, res) => {
  pushLog("SQLi", "PENDING");
  res.json({ success: false, message: "SQLi challenge coming soon." });
});

app.post("/api/login", (req, res) => {
  pushLog("LOGIN", "PENDING");
  res.json({ success: false, message: "Login exploit challenge coming soon." });
});

app.post("/api/password", (req, res) => {
  pushLog("PASSWORD", "PENDING");
  res.json({ success: false, message: "Password strength test coming soon." });
});

// Logs + Score
app.get("/api/logs", (req, res) => {
  res.json({ logs, score });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
