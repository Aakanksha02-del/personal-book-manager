📚 Personal Book Manager

A full-stack MERN application that allows users to create an account, securely log in, and manage their personal book collection.

🚀 Live Demo

Frontend:
https://personal-book-manager-six-coral.vercel.app

Backend API:
https://personal-book-manager-9wk7.onrender.com

✨ Features

- User Registration and Login
- JWT Authentication
- Add new books
- View personal book collection
- Update book details
- Delete books
- Protected routes
- MongoDB database integration
- Responsive user interface

🛠️ Technologies Used

Frontend

- React.js
- React Router
- JavaScript
- HTML5
- CSS3
- Vite

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

📂 Project Structure

```text
personal-book-manager
│
├── frontend
│   ├── src
│   └── package.json
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js
│
└── README.md
```

⚙️ Installation & Setup

Clone Repository

git clone https://github.com/Aakanksha02-del/personal-book-manager.git

Backend Setup

cd backend
npm install

Create ".env" file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start

Frontend Setup

cd frontend
npm install

Run frontend:

npm run dev

🔐 Environment Variables

Backend:

MONGO_URI
JWT_SECRET

Frontend:

VITE_API_URL

📌 API Functionality

- User authentication APIs
- Book CRUD operations
- Protected book management routes

👩‍💻 Author

Aakanksha Solanki

GitHub:
https://github.com/Aakanksha02-del

🚀 Future Improvements

- Search books
- Add book categories
- User profile
- Pagination
- Dark mode