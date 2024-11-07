import { Router } from "express";
import { borrowBook, returnBook } from "../controllers/book.controller";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Route untuk meminjam buku berdasarkan ID
router.post("/borrow/:id", authenticateToken, borrowBook);

// Route untuk mengembalikan buku berdasarkan ID
router.post("/return/:id", authenticateToken, returnBook);

export default router;
