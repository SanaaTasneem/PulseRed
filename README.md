# PulseRed – AI-Driven Blood Donation & Transfusion System

PulseRed is a full-stack web application designed to improve blood donation and transfusion workflows using intelligent donor matching and real-time notifications.

The system focuses on reducing response time during critical blood requests while supporting informed decision-making for hospital administrators.

---

## 🔧 Tech Stack

**Frontend**
- React
- CSS (custom UI components)

**Backend**
- Spring Boot (Java)
- RESTful APIs

**Database**
- PostgreSQL

**AI / Logic**
- Rule-based blood compatibility
- Donor prioritization using availability, history, and response behavior

---

## ✨ Key Features

- Donor registration and management  
- Blood request handling  
- AI-based donor matching and prioritization  
- Admin notification and response tracking  
- Real-time dashboards and filters  
- Secure and scalable architecture  

---

## ▶️ How to Run the Project

### 1. Database Setup
- Install PostgreSQL
- Create a database (example: `pulsered_db`)
- Run SQL scripts from the `database/` folder

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
├── backend/        # Spring Boot backend
├── frontend/       # React frontend
├── database/       # SQL schema and sample data
├── docs/           # Diagrams and documentation
└── README.md
```

---

## 📌 Notes

- Database credentials are not included in the repository for security reasons.
- Sample schema and seed data are provided in the `database/` directory.
- This project was developed as part of a Master’s-level Computer Science capstone.

---

## 👩‍💻 Author

**Sanaa Tasneem**  
Master’s Student, Computer Science  
Northeastern Illinois University
