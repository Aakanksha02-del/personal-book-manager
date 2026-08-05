import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add/Edit Modal
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTag, setFilterTag] = useState("All");

  // Book Form
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want to Read",
    coverImage: "",
  });

  const token = localStorage.getItem("token");

 
  // FETCH BOOKS

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/books",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBooks(data.books || data);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE

  const handleBookChange = (e) => {
    setBookForm({
      ...bookForm,
      [e.target.name]: e.target.value,
    });
  };

  // OPEN ADD BOOK MODAL

  const openAddBookModal = () => {
    setEditingBookId(null);

    setBookForm({
      title: "",
      author: "",
      tags: "",
      status: "Want to Read",
      coverImage: "",
    });

    setShowBookModal(true);
  };

  // OPEN EDIT BOOK MODAL

  const openEditBookModal = (book) => {
    setEditingBookId(book._id);

    setBookForm({
      title: book.title || "",
      author: book.author || "",
      tags: Array.isArray(book.tags)
        ? book.tags.join(", ")
        : book.tags || "",
      status: book.status || "Want to Read",
      coverImage: book.coverImage || "",
    });

    setShowBookModal(true);
  };

  // ADD / UPDATE BOOK

  const handleBookSubmit = async (e) => {
    e.preventDefault();

    if (!bookForm.title || !bookForm.author) {
      alert("Please enter book title and author.");
      return;
    }

    const bookData = {
      title: bookForm.title,
      author: bookForm.author,
      coverImage: bookForm.coverImage,

      tags: bookForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),

      status: bookForm.status,
    };

    try {
      // UPDATE BOOK

      if (editingBookId) {
        const response = await fetch(
          `http://localhost:5000/api/books/${editingBookId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(bookData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Book updated successfully! ✨");

          setShowBookModal(false);

          setEditingBookId(null);

          setBookForm({
            title: "",
            author: "",
            tags: "",
            status: "Want to Read",
            coverImage: "",
          });

          fetchBooks();
        } else {
          alert(data.message || "Failed to update book.");
        }

        return;
      }

      // ADD NEW BOOK

      const response = await fetch(
        "http://localhost:5000/api/books",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(bookData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Book added successfully! 📚");

        setShowBookModal(false);

        setBookForm({
          title: "",
          author: "",
          tags: "",
          status: "Want to Read",
          coverImage: "",
        });

        fetchBooks();
      } else {
        alert(data.message || "Failed to add book.");
      }
    } catch (error) {
      console.log("Error saving book:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // DELETE BOOK

  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Book deleted successfully! 🗑️");

        setBooks((prevBooks) =>
          prevBooks.filter(
            (book) => book._id !== bookId
          )
        );
      } else {
        alert(data.message || "Failed to delete book.");
      }
    } catch (error) {
      console.log("Error deleting book:", error);
      alert("Something went wrong.");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // STATS

  const totalBooks = books.length;

  const readingBooks = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const completedBooks = books.filter(
    (book) => book.status === "Completed"
  ).length;

  // SEARCH + FILTER

  const filteredBooks = books.filter((book) => {
    const title = book.title || "";
    const author = book.author || "";

    const matchesSearch =
      title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      author
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      book.status === filterStatus;

    const matchesTag = filterTag === "All" ||
    (book.tags || []).includes(filterTag);
      return matchesSearch && matchesStatus && matchesTag;
  });

  return (
    <div className="dashboard-page">

      {/* NAVBAR */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          📚 BookNest
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/*MAIN CONTENT*/}

      <main className="dashboard-container">

        {/* WELCOME HEADER */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              YOUR PERSONAL LIBRARY
            </p>

            <h1>
              Welcome back! 👋
            </h1>

            <p>
              Keep track of your reading journey and
              discover your next favorite story.
            </p>

          </div>


          {/* ADD NEW BOOK */}

          <button
            className="add-book-button"
            onClick={openAddBookModal}
          >
            + Add New Book
          </button>

        </div>


        {/*STATES*/}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              📚
            </div>

            <div>
              <p>Total Books</p>
              <h2>{totalBooks}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📖
            </div>

            <div>
              <p>Currently Reading</p>
              <h2>{readingBooks}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✨
            </div>

            <div>
              <p> Completed Books</p>
              <h2>{completedBooks}</h2>
            </div>

          </div>

        </div>


        {/*BOOKS SECTION */}

        <section className="books-section">

          <div className="section-heading">

            <div>
              <h2>
                My Books
              </h2>

              <p>
                Your personal book collection
              </p>
            </div>

          </div>


          {/*SEARCH + FILTER*/}

          <div className="books-controls">

            <input
              type="text"
              placeholder="🔍 Search books or authors..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="search-books"
            />


            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value)
              }
              className="filter-books"
            >

              <option value="All">
                All Books
              </option>

              <option value="Want to Read">
                Want to Read
              </option>

              <option value="Reading">
                Reading
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
             className="filter-books"
                 >
            <option value="All">
               All Tags
               </option>

            {[...new Set(
             books.flatMap((book) => book.tags || [])
            )].map((tag) => (
              <option key={tag} value={tag}>
              {tag}
             </option>
                  ))}
             </select>
               </div>


          {/* LOADING */}

          {loading ? (

            <div className="empty-books">

              <div className="loading-icon">
                📚
              </div>

              <h3>
                Loading your books...
              </h3>

            </div>


          ) : books.length === 0 ? (

            <div className="empty-books">

              <div className="empty-icon">
                📖
              </div>

              <h3>
                Your library is empty
              </h3>

              <p>
                Start building your personal collection
                by adding your first book.
              </p>

              <button
                className="add-book-button"
                onClick={openAddBookModal}
              >
                + Add Your First Book
              </button>

            </div>


          ) : filteredBooks.length === 0 ? (

            <div className="empty-books">

              <div className="empty-icon">
                🔍
              </div>

              <h3>
                No books found
              </h3>

              <p>
                Try searching with a different
                title or author.
              </p>

            </div>


          ) : (

            <div className="books-grid">

              {filteredBooks.map((book) => (

                <div
                  className="book-card-dashboard"
                  key={book._id}
                >

                 <div className="book-cover">
                 { book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="book-cover-image"
                    />
                  ) : (
                 "📖"
                 )} 
                  </div>
                  <div className="book-info">

                    <h3>
                      {book.title}
                    </h3>

                    <p>
                      {book.author}
                    </p>

                    <span className="book-status">
                      {book.status}
                    </span>


                    {/* EDIT + DELETE BUTTONS */}

                    <div className="book-actions">

                      <button
                        className="edit-book-button"
                        onClick={() =>
                          openEditBookModal(book)
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="delete-book-button"
                        onClick={() =>
                          handleDeleteBook(book._id)
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/*  ADD / EDIT BOOK MODAL*/}

      {showBookModal && (

        <div className="modal-overlay">

          <div className="add-book-modal">

            {/* CLOSE */}

            <button
              className="close-modal"
              onClick={() => {
                setShowBookModal(false);
                setEditingBookId(null);
              }}
            >
              ×
            </button>


            <div className="modal-icon">
              {editingBookId ? "✏️" : "📚"}
            </div>


            <h2>
              {editingBookId
                ? "Edit Book"
                : "Add New Book"}
            </h2>


            <p>
              {editingBookId
                ? "Update your book details."
                : "Add a new book to your personal library."}
            </p>


            {/* FORM */}

            <form onSubmit={handleBookSubmit}>

              {/* TITLE */}

              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={bookForm.title}
                onChange={handleBookChange}
                required
              />


              {/* AUTHOR */}

              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={bookForm.author}
                onChange={handleBookChange}
                required
              />


              {/* TAGS */}

              <input
                type="text"
                name="tags"
                placeholder="Tags (e.g. Fiction, Motivation)"
                value={bookForm.tags}
                onChange={handleBookChange}
              />

            {/* COVER IMAGE */}

            <input
              type="text"
              name="coverImage"
              placeholder="Book Cover Image URL"
              value={bookForm.coverImage}
              onChange={handleBookChange}
            />


              {/* STATUS */}

              <select
                name="status"
                value={bookForm.status}
                onChange={handleBookChange}
              >

                <option value="Want to Read">
                  Want to Read
                </option>

                <option value="Reading">
                  Reading
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>


              {/* SAVE */}

              <button
                type="submit"
                className="save-book-button"
              >
                {editingBookId
                  ? "Update Book"
                  : "Add Book"}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;