import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/db.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import hospitalRouter from "./routes/hospitals.js";
import rootRouter from "./routes/root.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

dotenv.config();

// Connect to database
connectDB();

// Init Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("public"))
app.use("/", express.static("public/views"));

// Routes
app.use("/", rootRouter)
app.use("/api/hospitals", hospitalRouter);

// 404
app.all("*", (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "public", "views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" })
  } else {
    res.type("txt").send("404 Not Found")
  }
})

app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb")
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
});


// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.VITE_dbURI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// const start = async () => {
//   try {
//     await connectDB();
//     app.listen(process.env.PORT, () => {
//       console.log(`Server started on port ${process.env.PORT}`);
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// start();
