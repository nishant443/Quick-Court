const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes/index");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   process.env.LOCAL_VITE_URL,
//   process.env.LOCAL_REACT_URL,
// ].filter(Boolean);
const allowedOrigins = [
  "https://quick-court-mx6r.onrender.com",  // your deployed frontend
  "http://localhost:5173",                  // local dev
];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);     // allow mobile / curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
