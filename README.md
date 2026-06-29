# 🛒 CartFlow — Full Stack E-Commerce App

> A full stack MERN application where users can browse products, manage a persistent shopping cart, and have their data survive page refreshes — powered by MongoDB.

---

## 🚀 Live Demo

> https://arhams-e-commerce-react.vercel.app/

---

## ✨ What Makes This Different

Most beginner React projects use `localStorage` for cart persistence. This one doesn't.

CartFlow connects a **React frontend** to a **real Express + MongoDB backend** — every cart action (add, remove, quantity change) is saved to a database in real time. Refresh the page. Your cart is still there.

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

---

## 📂 Project Structure

```
CartFlow/
│
├── 📁 Backend/
│   ├── 📁 controller/
│   │   └── Usercontroller.js     # CRUD logic for cart
│   ├── 📁 models/
│   │   └── cartModel.js          # Mongoose schema
│   ├── 📁 Routes/
│   │   └── CartRouter.js         # Express routes
│   ├── .env                      # Environment variables
│   └── server.js                 # Entry point
│
└── 📁 Frontend/
    └── 📁 src/
        ├── 📁 Components/
        │   ├── Home.jsx           # Product grid + Add to Cart
        │   ├── Cart.jsx           # Cart page with quantity controls
        │   └── Navbar.jsx
        ├── App.jsx                # Root component + cart state
        └── main.jsx
```

---

## ⚙️ How It Works

```
User clicks "Add to Cart"
        ↓
axios.post → Express API → MongoDB saves item
        ↓
React state updates with DB response (includes MongoDB _id)
        ↓
User refreshes page → axios.get → cart restored from DB ✅
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Fetch all cart items |
| `POST` | `/api/cart` | Add item (or increase quantity if exists) |
| `PUT` | `/api/cart/increase/:id` | Increase item quantity |
| `PUT` | `/api/cart/decrease/:id` | Decrease quantity (deletes if reaches 0) |
| `DELETE` | `/api/cart/:id` | Remove item from cart |

---

## 🏃 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/ArhamNotSheikh/E-commerce-react-
cd CartFlow
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file:
```
PORT=5002
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/Cart
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

### 4. Open the app
```
Frontend → http://localhost:5173
Backend  → http://localhost:5002
```

---

## 🧠 Key Concepts Practiced

- **REST API design** — proper HTTP methods and route naming
- **MVC architecture** — routes → controllers → models separation
- **Mongoose ODM** — schema design, CRUD operations, `$inc` operator
- **Async/Await** — with try/catch error handling on every route
- **CORS** — enabling cross-origin requests between frontend and backend
- **Axios** — HTTP requests from React with proper error handling
- **State management** — keeping React state in sync with MongoDB
- **Environment variables** — securing sensitive config with dotenv

---

## 🔮 Roadmap

- [ ] User authentication with JWT
- [ ] Individual cart per user
- [ ] Product search and category filters
- [ ] Product detail pages
- [ ] Checkout flow
- [ ] Order history
- [ ] Deploy frontend (Vercel) + backend (Render)

---

## 👨‍💻 Author

**Arham Shaikh**

Built while learning full stack development — from a React-only app to a complete MERN stack application with real database persistence.

[![GitHub](https://img.shields.io/badge/GitHub-ArhamNotSheikh-181717?style=for-the-badge&logo=github)](https://github.com/ArhamNotSheikh)

---

> *"Started with a semicolon bug in `.env`. Ended with a full stack app."* 🚀
