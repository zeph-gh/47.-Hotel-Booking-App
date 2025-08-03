# Hotel Booking App

A full-featured hotel booking application built with React, Redux Toolkit, Firebase (Firestore, Storage, Auth), and Bootstrap.

## Features

- User authentication (Firebase Auth)
- Browse and book hotel rooms
- Room image upload (Firebase Storage)
- Booking confirmation emails (via backend or Firebase Functions)
- Responsive UI with React Bootstrap

## Admin Features

- Add, edit, and delete rooms
- Upload and manage room images
- View, confirm, cancel, and delete bookings
- Filter bookings by status
- Access admin-only management pages

## Tech Stack

- React + Vite
- Redux Toolkit
- Firebase (Firestore, Storage, Auth)
- React Bootstrap
- Toast notifications

## Setup Instructions

1. **Clone the repository**

   ```
   git clone https://github.com/zeph-gh/Hotel-Booking-App.git
   cd Hotel-Booking-App
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project.
   - Enable Firestore, Storage, and Authentication.
   - Copy your Firebase config to `src/firebase.js`.
   - Set Firestore and Storage security rules for authentication.

4. **Run the app**
   ```
   npm run dev
   ```

## Usage

- Register and log in as a user.
- Browse available rooms and make bookings.
- Admins can add, edit, or delete rooms and manage bookings.
- Upload up to 5 images per room.
- Receive booking confirmation emails.

## License

MIT License
