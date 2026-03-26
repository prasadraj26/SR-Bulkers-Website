<h1 align="center">🚛 SR Bulkers</h1>

<p align="center">
  Modern Bulker Trailer Website built with React & Firebase
</p>

<p align="center">
  <a href="https://sr-bulkers.vercel.app"><b>🌐 Live Demo</b></a> 
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Vite-purple?style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel"/>
</p>

---

## 📑 Table of Contents

* Project Overview
* Features
* Tech Stack
* System Architecture
* Project Structure

---

## 🌟 Project Overview

SR Bulkers is a modern and responsive web application designed to showcase **bulker trailers, company services, and customer interactions**.

It provides a seamless experience for users to explore products, view detailed specifications, and request quotations, along with an **admin panel** for managing content and inquiries.

Built using **React (Vite) and Firebase**, the application ensures **high performance, scalability, and secure data handling**.

---

## ✨ Features

### 🌐 User Side

* 🏠 Home page with responsive UI
* 🏭 About company section
* 🚛 Products listing
* 📄 Product details page
* 🛠 Services page
* 🖼 Gallery section
* 📩 Contact form
* 💬 Quote request system

### 🔐 Admin Side

* 🔑 Admin login (Firebase Auth)
* 📊 Dashboard
* 🖼 Gallery management
* 📨 Customer inquiries handling

---

##  Tech Stack

| Category           | Technology                          |
| ------------------ | ----------------------------------- |
| ⚛️ Frontend        | React.js (Vite)                     |
| 🎨 Styling         | CSS                                 |
| 🔥 Backend         | Firebase (Auth, Firestore, Storage) |
| ☁️ Hosting         | Vercel                              |
| 🗂 Version Control | Git & GitHub                        |

---

##  System Architecture

### 🔄 Flow

```text
User Browser
    ↓
Frontend (React + Vite)
    ↓
Firebase (Auth + Firestore + Storage)
    ↓
Business Logic (Client + Cloud Functions)
    ↓
Database
    ↓
External Services

###  Layers

#### 1️⃣ Client Layer

* Public Website (Home, Products, Services, Gallery, Contact)
* Admin Panel

#### 2️⃣ Backend (Firebase)

* Authentication
* Firestore Database
* Storage
* Cloud Functions

#### 3️⃣ Business Logic

* Quote handling
* Customer inquiries

#### 4️⃣ Deployment

* Vercel + Firebase

---

## 📂 Project Structure

```bash
SR-Bulkers/
├── public/                         # Static assets & redirects
│   ├── _redirects
│   └── videos/
│
├── src/                            # Frontend Source Code
│   ├── components/                 # UI Components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Products.jsx
│   │   ├── Gallery.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/                      # Page Views
│   │   ├── Home.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── ServicesPage.jsx
│   │
│   ├── admin/                      # Admin Panel
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ManageGallery.jsx
│   │   ├── ManageQuote.jsx
│   │   └── ManageServices.jsx
│   │
│   ├── ai/                         # Chatbot Module
│   │   ├── ChatBot.jsx
│   │   └── chatService.js
│   │
│   ├── utils/                      # Utility Functions
│   │   ├── quoteService.js
│   │   └── uploadGalleryImage.js
│   │
│   ├── firebase.js
│   ├── App.jsx
│   └── main.jsx
│
├── functions/                      # Cloud Functions
│   ├── index.js
│   ├── quotes/
│   │   ├── createQuote.js
│   │   ├── getQuote.js
│   │   ├── updateQuote.js
│   │   └── deleteQuote.js
│   │
│   └── chatbot/
│       └── ruleChatbot.js
│
├── index.html
├── package.json
├── firebase.json
├── vite.config.js
└── README.md
```

---

## 🚀 Deployment

* ▲ Frontend: Vercel
* 🔥 Backend: Firebase,cloudinary

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
