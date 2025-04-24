
# 📈 LevelUp Life – Track Your Goals Like a Hunter

A productivity app inspired by Solo Leveling — log your goals, track your time like XP, and level up your life in a stylish, immersive RPG-style interface.

---

## 🚀 Tech Stack

- **Frontend**: React.js (Hooks, Components)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Compass or Atlas)
- **Security**: JWT (JSON Web Tokens)
- **Theme**: Custom Solo Leveling Dark Neon UI

---

## 🔧 Installation

### Clone the Repository

```bash
git clone https://github.com/jake00o/LevelUp-Life
cd LevelUp-Life
```

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

---

## 🛠️ Running the App

### Start MongoDB

Ensure MongoDB is running locally or connect with Atlas.

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd ../frontend
npm start
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 📁 MongoDB Details

- **Database**: leveluplife
- **Collection**: goals

### Sample Data

You can use `backend/sample-data/sampleGoals.json` to seed your DB.

---

## 🧪 .env Example

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/leveluplife
JWT_SECRET=LevelUpSecret
```

Make sure to create this `.env` file inside the `/backend` folder.

---

## 👥 Team Members

- **Manjot Singh** – Frontend (UI/UX, React logic, Solo Leveling theme) 
- **Lakshay Rana** – Backend (Express API, JWT, Server)
- **Mohammad Faraz kamil** – MongoDB (Connection, sample data, schema)
- **Poorva Arora** - Documentation, version control, debugging 

---

## ✨ Features

- Add goals with title, date & progress using slider
- Toggle full goal history
- Total time tracked (in minutes/hours/month format)
- Dark Solo Leveling inspired UI with glowing effects
- Fully responsive

---

## 📜 License

Project built for educational purposes as part of Full Stack JS course (CPRO2101).

---

## 🙏 Thank You

We hope you enjoy using LevelUp Life as much as we enjoyed building it!
