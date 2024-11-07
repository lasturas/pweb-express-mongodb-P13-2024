import { Request, Response } from "express";
import Book from "../models/book.model";

// Fungsi untuk membuat buku baru
export const createBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({
      status: "success",
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error creating book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk mendapatkan semua buku
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: "success",
      message: "Successfully get all books",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching books",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk mendapatkan detail buku berdasarkan ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully get book",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk memperbarui buku berdasarkan ID
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully update book",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error updating book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk menghapus buku berdasarkan ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully remove book",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk meminjam buku berdasarkan ID
export const borrowBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    if (book.qty < 1) {
      return res.status(400).json({
        status: "failed",
        message: "Cannot borrow book, not enough quantity",
        data: { currentQty: book.qty },
      });
    }
    book.qty -= 1;
    await book.save();
    res.status(200).json({
      status: "success",
      message: "Successfully borrow book",
      data: { currentQty: book.qty },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error borrowing book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};

// Fungsi untuk mengembalikan buku berdasarkan ID
export const returnBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    book.qty += 1;
    await book.save();
    res.status(200).json({
      status: "success",
      message: "Successfully return book",
      data: { currentQty: book.qty },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error returning book",
      data: error instanceof Error ? { details: error.message } : {},
    });
  }
};
