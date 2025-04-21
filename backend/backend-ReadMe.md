# 📚 Learning Management System (LMS) Backend Documentation

## 📄 Overview
This backend application is a simple Learning Management System built with Spring Boot and PostgreSQL. It supports operations for managing students, courses, sessions, and assignments.

---

## 🔍 API Endpoints

### 👩‍🎓 Student Endpoints

| Method | Endpoint                                | Description                                  | Request Params/Body             |
|--------|------------------------------------------|----------------------------------------------|----------------------------------|
| GET    | `/api/student/get-all-students`          | Fetch all students                           | -                                |
| GET    | `/api/student/get-by-id`                 | Fetch student by ID                          | `id` as request parameter        |
| POST   | `/api/student/add`                       | Add a new student                            | Student object in request body   |
| PUT    | `/api/student/update`                    | Update an existing student                   | `id` as request parameter + body |
| DELETE | `/api/student/delete-student/{id}`       | Delete student by ID                         | `id` as path variable            |

### 📚 Course Endpoints

| Method | Endpoint                                | Description                                  | Request Params/Body             |
|--------|------------------------------------------|----------------------------------------------|----------------------------------|
| GET    | `/api/courses/get-all-courses`           | Fetch all courses                            | -                                |
| GET    | `/api/courses/get-by-id/{id}`            | Fetch course by ID                           | `id` as path variable            |
| POST   | `/api/courses/add`                       | Add a new course                             | Course object in request body    |
| PUT    | `/api/courses/update/{id}`               | Update a course                              | `id` as path variable + body     |
| DELETE | `/api/student/delete/{id}`               | Delete student by ID (duplicate endpoint)    | `id` as path variable            |

> Note: The endpoint `/api/student/delete/{id}` seems to be a duplicate of `/api/student/delete-student/{id}`. Consider consolidating.

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


