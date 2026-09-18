# MediFlow AI — Hospital Management System

A modern, production-structured clinical and patient management application with Doctor and Patient portals.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) + Tailwind CSS | MediFlow design system, Lucide icons, responsive layouts |
| **Backend** | Node.js + Express.js | Modular RESTful API and WebSocket engine |
| **Authentication** | Clerk Authentication | Seamless role-based authentication (Patient, Doctor, Staff, Admin) |
| **State & Navigation** | React Router DOM | Declarative client-side routing |

---

## 📁 Project Structure

```
MEDIFLOW/
├── frontend/                     # Frontend Application
│   ├── src/
│   │   ├── components/          # Doctor and Patient components
│   │   ├── layouts/             # DoctorLayout, PatientLayout
│   │   ├── pages/               # Doctor and Patient pages
│   │   ├── data/                # Mock clinical data
│   │   └── App.jsx              # Router & Route declarations
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                      # Backend Service (Phase 2)
│   ├── src/
│   ├── package.json
│   └── server.js
│
├── src/                          # Root Source Directory
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Quick Start Guide

### Start Development Server:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```
