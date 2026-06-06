const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const eventRoutes = require("./routes/event.routes");
const registrationRoutes = require("./routes/registration.routes");
 
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Innovaxel Event Registration API",
  });
});

app.use("/api/events", eventRoutes);
app.use(
  "/api/registrations",
  registrationRoutes
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

module.exports = app;