# 📚 Learning Management System (LMS) Backend Documentation

## 📄 Overview
This backend application is a simple Learning Management System built with Spring Boot and PostgreSQL. It supports operations for managing students, courses, sessions, and assignments.

---

## 🔍 API Endpoints

### 👩‍🎓 Student Endpoints

# 📚 Learning Management System API Documentation

## 📘 Student Controller (`/api/student`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/add` | Add a new student |
| `GET` | `/get-all-students` | Get a list of all students |
| `GET` | `/get-by-id?id={id}` | Get student by ID (via query param) |
| `PUT` | `/update?id={id}` | Update student by ID (via query param) |
| `DELETE` | `/delete-student/{id}` | Delete student by ID |
| `GET` | `/get-hw/{id}` | Get all assignments of a student by ID |

## 📘 Enrollment Controller (`/api/enrollments`)

| Method | Endpoint          | Description |
|--------|-------------------|-------------|
| `POST` | `/register`       | Enroll a student in a course |
| `GET` | `/get-by-id/{id}` | Get all enrollments of a student by ID |

## 📘 Course Controller (`/api/courses`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/add` | Add a new course |
| `GET` | `/get-all-courses` | Get a list of all courses |
| `GET` | `/get-by-id/{id}` | Get course by ID |
| `PUT` | `/update/{id}` | Update course by ID |
| `DELETE` | `/delete/{id}` | Delete course by ID |
| `GET` | `/{courseId}/sessions` | Get sessions of a specific course |

---

## 🏛️ Technologies Used
- **Java 21**
- **Spring Boot 3+**
- **PostgreSQL**
- **JPA (Hibernate)**

---

## ✅ Additional Notes
- Use `application.properties` to configure DB and port.
- All data-fetching relations are set to `FetchType.Eager` since database is relatively small.
- DTOs are used for cleaner API data transfer.

---


