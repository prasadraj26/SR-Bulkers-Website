<h1 align="center">🚛 SR Bulkers</h1>
<p align="center">Modern Bulker Trailer Website built with React & Firebase</p>

<p align="center">
  <a href="https://sr-bulkers.vercel.app">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#system-architecture">🏗 Architecture</a> •
  <a href="#project-structure">📂 Structure</a>
</p>

---

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-purple?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

---

## 🌟 Project Overview

SR Bulkers is a modern and responsive web application designed for showcasing **bulker trailers, company services, and customer interactions**.

The platform provides a seamless experience for users to explore products, view detailed specifications, and request quotations, while also offering an **admin panel for managing content, products, and customer inquiries**.

Built using **React (Vite) and Firebase**, the application ensures fast performance, scalability, and secure data handling.

---

## ✨ Features

### 🌐 User Side
- 🏠 Home page with responsive UI
- 🏭 About company section
- 🚛 Products listing
- 📄 Product details page
- 🛠 Services page
- 🖼 Gallery section
- 📩 Contact form
- 💬 Quote request system

### 🔐 Admin Side
- 🔑 Admin login (Firebase Auth)
- 📊 Dashboard
- 🖼 Gallery management
- 📨 Customer inquiries handling

---

## 🛠️ Tech Stack

| Category        | Technology Used |
|----------------|----------------|
| ⚛️ Frontend     | React.js (Vite) |
| 🎨 Styling      | CSS |
| 🔥 Backend      | Firebase (Auth, Firestore / Realtime DB) |
| ☁️ Hosting      | Vercel |
| 🗂️ Version Control | Git & GitHub |

---

## 🏗️ System Architecture

### 🔄 Architecture Flow

User Browser  
     ↓  
Frontend (React + Vite)  
     ↓  
Firebase Services (Auth + Firestore + Storage)  
     ↓  
Business Logic (Client + Cloud Functions)  
     ↓  
Database (Firestore)  
     ↓  
External Services & Storage  

---

### 🧩 Architecture Layers

#### 1️⃣ Client Layer
- Public Website (Home, Products, Services, Gallery, Contact)
- Admin Panel (Dashboard, Management)

#### 2️⃣ Firebase Backend
- Authentication
- Firestore Database
- Storage
- Cloud Functions

#### 3️⃣ Business Logic
- Quote handling
- Customer inquiries

#### 4️⃣ Deployment
- Vercel + Firebase

---

## 📂 Project Structure
-SR-Bulkers/
-│
-├── public/
- │ ├── _redirects
- │ └── videos/
- │
- ├── src/
- │ ├── components/
- │ │ ├── Navbar.jsx
- │ │ ├── Hero.jsx
- │ │ ├── Products.jsx
- │ │ ├── Gallery.jsx
- │ │ └── Footer.jsx
- │ │
- │ ├── pages/
- │ │ ├── Home.jsx
- │ │ ├── AboutPage.jsx
- │ │ ├── ProductsPage.jsx
- │ │ └── ServicesPage.jsx
- │ │
- │ ├── admin/
- │ │ ├── AdminLogin.jsx
- │ │ ├── AdminDashboard.jsx
- │ │ ├── ManageGallery.jsx
- │ │ ├── ManageQuote.jsx
- │ │ └── ManageServices.jsx
- │ │
- │ ├── ai/
- │ │ ├── ChatBot.jsx
- │ │ └── chatService.js
- │ │
- │ ├── utils/
- │ │ ├── quoteService.js
- │ │ └── uploadGalleryImage.js
- │ │
- │ ├── firebase.js
- │ ├── App.jsx
- │ └── main.jsx
- │
- ├── functions/
- │ ├── index.js
- │ ├── quotes/
- │ │ ├── createQuote.js
- │ │ ├── getQuote.js
- │ │ ├── updateQuote.js
- │ │ └── deleteQuote.js
- │ │
- │ └── chatbot/
- │ └── ruleChatbot.js
- │
- ├── index.html
- ├── package.json
- ├── firebase.json
- ├── vite.config.js
- └── README.md
