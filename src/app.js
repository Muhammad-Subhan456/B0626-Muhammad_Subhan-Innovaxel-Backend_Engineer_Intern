const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const eventRoutes = require("./routes/event.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Innovaxel Event Registration API",
  });
});

app.use("/api/events", eventRoutes);

module.exports = app;