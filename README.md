# Hotel Booking App

A modern, full-featured hotel booking platform built with React, Redux Toolkit, Firebase, and Bootstrap. This app enables users to browse, book, and manage hotel rooms, while providing robust admin tools for room and booking management.

---

## 🚀 Features

### User

- **Authentication:** Secure login/register via Firebase Auth
- **Browse Rooms:** View all available rooms with images, details, and location map
- **Booking:** Reserve rooms, select dates/guests, and receive instant confirmation
- **Trip Management:** View, filter, and cancel your trips
- **Profile:** Upload and update your profile image
- **Responsive UI:** Optimized for desktop and mobile

### Admin

- **Room Management:** Add, edit, delete rooms; upload up to 5 images per room
- **Booking Management:** View, confirm, cancel, delete bookings; filter by status
- **Admin Pages:** Access management dashboards with advanced controls

### Other Highlights

- **Image Uploads:** Firebase Storage for room and profile images
- **Email Notifications:** Booking confirmation emails sent automatically
- **Interactive Maps:** Room location displayed via Leaflet
- **Toast Notifications:** Real-time feedback for all actions

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** React (Vite), React Bootstrap, Redux Toolkit
- **State Management:** Redux Toolkit (bookings, rooms, trips, profile)
- **Backend:** Firebase Firestore (rooms, bookings, users, trips), Firebase Storage (images), Firebase Auth
- **Routing:** React Router
- **UI Components:** Modular, reusable components for cards, tables, modals, forms, navigation, and more
- **Map Integration:** Leaflet for room location
- **Notifications:** react-toastify

---

## 📁 Folder Structure

```
src/
  components/      # Reusable UI components (AddRoom, EditMode, HomePostCard, etc.)
  features/        # Redux slices (bookings)
  pages/           # Main app pages (Home, Room, Booking, Trip, Profile, Admin)
  assets/          # Images, logos, default profile, room images
  store.js         # Redux store setup
  firebase.js      # Firebase config
  App.jsx          # Main app component
  main.jsx         # Entry point
```

---

## ⚡ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zeph-gh/Hotel-Booking-App.git
   cd Hotel-Booking-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project
   - Enable Firestore, Storage, and Authentication
   - Copy your Firebase config to firebase.js
   - Set Firestore and Storage security rules for authentication

4. **Run the app locally**
   ```bash
   npm run dev
   ```

---

## 📝 Usage Guide

### As a User

- Register or log in
- Browse rooms with images, details, and location
- Book a room: select dates, guests, and confirm
- Manage your trips: view, filter, cancel bookings
- Update your profile image

### As an Admin

- Access admin dashboard
- Add, edit, or delete rooms
- Upload/manage room images (up to 5 per room)
- View, confirm, cancel, or delete bookings
- Filter bookings by status

---

## 🔒 Security & Best Practices

- All sensitive actions require authentication
- Admin-only pages protected by role-based access
- Firestore and Storage rules must be set for data protection
