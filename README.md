# PulseRed – AI-Driven Blood Donation & Transfusion System

PulseRed is a full-stack web application developed as a Master’s-level Computer Science capstone project.  
It is designed to improve blood donation and transfusion workflows by combining intelligent donor matching, real-time notifications, and data-driven dashboards to support hospital decision-making during time-critical situations.

---

## 🎯 Problem Statement

Hospitals often face critical delays during blood shortages due to manual donor outreach, lack of donor prioritization, and limited real-time visibility into donor availability and response behavior.  
Existing systems primarily focus on record-keeping rather than intelligent coordination, resulting in slower response times and increased operational burden during emergencies.

---

## 💡 Proposed Solution

PulseRed addresses these challenges by providing an integrated platform that:
- Matches donors based on blood compatibility and availability
- Prioritizes donors using historical response and donation data
- Sends real-time notifications and tracks donor responses
- Presents actionable insights through an administrative dashboard

The system emphasizes decision support, automation, and responsiveness rather than simple data storage.

---

## 🔧 Tech Stack

### Frontend
- React
- Custom CSS for responsive UI components

### Backend
- Spring Boot (Java)
- RESTful APIs

### Database
- PostgreSQL

### AI / Decision Logic
- Rule-based blood compatibility enforcement
- Donor prioritization using availability, donation history, and response behavior
- Matchability scoring to support informed administrative decisions

---

## ✨ Key Features

- Donor registration and profile management  
- Blood request creation and tracking  
- Intelligent donor matching and prioritization  
- Real-time donor notifications and response tracking  
- Administrative dashboards with filtering and progress indicators  
- Secure, modular, and scalable system design  

---

## 🧠 AI & Intelligent Components

While PulseRed does not rely on black-box machine learning models, it incorporates intelligent decision logic by:
- Encoding real-world blood transfusion rules
- Scoring and ranking donors based on multiple dynamic factors
- Supporting data-driven prioritization and response optimization

This approach ensures transparency, explainability, and clinical relevance.

---

## ▶️ How to Run the Project

### 1. Database Setup
- Install PostgreSQL
- Create a database (e.g., `pulsered_db`)
- Execute SQL scripts from the `database/` directory

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📁 Project Structure

```
MastersProject/
├── backend/        # Spring Boot backend services
├── frontend/       # React frontend application
├── database/       # SQL schema and sample data
├── docs/           # Diagrams and documentation
└── README.md
```

---

## 🔐 Notes on Security & Data

- Database credentials are intentionally excluded from the repository
- Sample schema and seed data are provided for evaluation purposes
- The system is designed for educational and demonstration use

---

## 🎓 Academic Context

This project was developed as part of a Master’s-level Computer Science capstone at  
**Northeastern Illinois University**

---

## 👩‍💻 Author

**Sanaa Tasneem**  
Master’s Student, Computer Science  
Northeastern Illinois University
