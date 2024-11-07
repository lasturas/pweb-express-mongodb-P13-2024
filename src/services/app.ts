import express from "express";
import connectDB from "../config/db-connection";
import authRoutes from "../routes/auth.route";
import bookRoutes from "../routes/book.route";
import mechanismRoutes from "../routes/mechanism.route"; // Import mekanisme route

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Route utama untuk Health Check
app.get("/", (req, res) => {
  const currentDate = new Date().toDateString();
  res.status(200).json({
    status: "success",
    message: "PWeb Kelompok P-13!",
    date: currentDate,
  });
});

// Route untuk autentikasi
app.use("/auth", authRoutes);

// Route untuk buku
app.use("/book", bookRoutes);

// Route untuk mekanisme peminjaman buku
app.use("/mechanism", mechanismRoutes);

// Koneksi ke database
connectDB();

export default app;
