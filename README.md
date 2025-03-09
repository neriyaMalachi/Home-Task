# 🛍️ E-Commerce Product Review App

## 📌 Overview
This project is a simple e-commerce app where users can browse products, view details of a specific product, and leave reviews. The backend is powered by **Node.js, Express, and MongoDB**, while the frontend is built with **Next and Tailwind CSS**.

## 🚀 Features
- **Homepage with product listings** 📌
- **Individual product pages** 🛒
- **User reviews with ratings and comments** ⭐
- **MongoDB database integration** 🗄️
- **RESTful API for handling products and reviews** 🔄
- **Modern UI with Tailwind CSS** 🎨

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the repository:
```sh
git clone https://github.com/neriyaMalachi/Home-Task
cd your-repo
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Set up environment variables:
Create a `.env` file in the root directory and add your **MongoDB URI**:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4️⃣ Start the development server:
```sh
npm run dev
```
By default, the backend will run on `http://localhost:3000`.


## 📡 API Routes
### 🛍️ Products
- **GET** `/api/products` → Fetch all products
- **GET** `/api/products/:id` → Fetch a single product

### ⭐ Reviews
- **POST** `/api/products/:id/review` → Add a review to a product (requires `reviewer`, `rating`, and `comment`)

---

## 🏗️ Built With
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** Next, Tailwind CSS
- **Tools:** Axios, dotenv

---

## 📝 Notes
- Make sure MongoDB is running before starting the server.
- You can deploy the backend on **Vercel, Render, or Heroku**.
- Frontend can be deployed on **Vercel or Netlify**.

---

## 🤝 Contributing
Pull requests are welcome! Open an issue if you find a bug or have a feature request. 😊

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🔗 Contact
For any questions, feel free to reach out!
📧 Email: your-email@example.com
📌 GitHub: [neriyaMalachi](https://github.com/neriyaMalachi)

