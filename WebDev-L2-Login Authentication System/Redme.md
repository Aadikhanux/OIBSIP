# 🔐 Login Authentication System

A simple client-side authentication system that allows users to register an account, securely validate login credentials, access a protected dashboard, and log out of the application.

This project was created as part of my web development internship to practice form validation, password hashing, localStorage, session management, DOM manipulation, and client-side authentication concepts.

---

## 📌 Project Overview

The Login Authentication System provides a basic authentication flow consisting of:

- User registration
- Password validation
- Duplicate account checking
- User login
- Credential verification
- Protected dashboard
- Session management
- Logout functionality

The project uses **Vanilla JavaScript** and browser `localStorage` to store registered user data and maintain the login session.

Passwords are processed using the browser's **Web Crypto API with SHA-256 hashing** before being stored.

> **Note:** This project is intended for educational and internship purposes. Client-side authentication using `localStorage` is not suitable for production applications. Production authentication should be handled by a secure backend with appropriate password hashing and session management.

---

## 🎯 Objective

The main objective of this project is to understand the basic concepts involved in an authentication system while developing practical skills in:

- HTML5 forms
- CSS3 styling
- JavaScript
- Form validation
- Password hashing
- localStorage
- Session management
- DOM manipulation
- Event listeners
- Conditional logic
- Protected pages
- Responsive web design

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and forms |
| CSS3 | Styling and responsive layout |
| JavaScript | Authentication logic and validation |
| Web Crypto API | SHA-256 password hashing |
| localStorage | User data and session storage |
| Google Fonts | Typography |

The application uses **Vanilla JavaScript** without any external JavaScript framework.

---

# ✨ Features

## 1. User Registration

New users can create an account using:

- Username
- Email
- Password
- Confirm Password

The registration form validates the submitted information before creating the account.

---

## 2. Password Validation

The registration system requires passwords to satisfy the following conditions:

- Minimum 8 characters
- At least 1 number

For example:

```text
Valid:
hello123

Invalid:
hello