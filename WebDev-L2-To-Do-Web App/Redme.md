# ✅ To-Do Web App

A simple and responsive task management web application that allows users to create, edit, complete, and delete tasks while keeping pending and completed tasks organized separately.

This project was created as part of my web development internship to practice JavaScript DOM manipulation, event handling, localStorage, dynamic content creation, and responsive web design.

---

## 📌 Project Overview

The To-Do Web App provides a simple way to manage daily tasks.

Users can add new tasks, mark them as completed, edit existing tasks, and delete tasks when they are no longer needed.

The application separates tasks into two sections:

- Pending Tasks
- Completed Tasks

Tasks are also saved using the browser's `localStorage`, allowing them to remain available even after refreshing or reopening the page.

---

## 🎯 Objective

The main objective of this project is to build an interactive task management application while developing practical knowledge of:

- HTML5 structure
- CSS3 styling
- JavaScript DOM manipulation
- Event listeners
- Dynamic element creation
- Form handling
- Array methods
- Object-based data management
- localStorage
- Responsive web design
- User interaction and validation

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application logic and interactions |
| localStorage | Persistent task storage |
| Google Fonts | Typography |

The application uses **Vanilla JavaScript** without any external JavaScript framework or library.

---

## ✨ Features

### 1. Add New Tasks

Users can enter a task into the input field and click the **Add Task** button.

The newly created task is immediately added to the Pending Tasks list.

Users can also press the **Enter** key to add a task.

---

### 2. Pending Tasks

Newly created tasks are displayed in the Pending Tasks section.

Each pending task contains:

- Task name
- Creation timestamp
- Complete button
- Edit button
- Delete button

---

### 3. Mark Task as Complete

Each pending task has a completion button.

When a task is marked as complete:

```text
Pending Tasks
      ↓
Mark Complete
      ↓
Completed Tasks