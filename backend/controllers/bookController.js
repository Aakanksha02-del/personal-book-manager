import Book from "../models/Book.js";

// Add Book
export const addBook = async (req, res) => {
  try {
    const { title, author, tags, status, coverImage } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

    const book = await Book.create({
      userId: req.userId,
      title,
      author,
      tags: tags || [],
      status: status || "Want to Read",
      coverImage: coverImage || "",
    });

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add book",
      error: error.message,
    });
  }
};

// Get My Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, tags, status, coverImage } = req.body;

    const book = await Book.findOneAndUpdate(
      {
        _id: id,
        userId: req.userId,
      },
      {
        title,
        author,
        tags,
        status,
        coverImage: coverImage || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};