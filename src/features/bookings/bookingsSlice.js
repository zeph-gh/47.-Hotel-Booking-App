import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";

const BASE_URL = "https://315-hotel-booking-app-api.zeph-goh.repl.co";

//RoomMidBody.jsx
export const fetchRooms = createAsyncThunk("bookings/fetchRooms", async () => {
  const response = await fetch(`${BASE_URL}/rooms`);
  return response.json();
});

//RoomPage.jsx
export const fetchRoomByRoomId = createAsyncThunk(
  "bookings/fetchRoomByRoomId",
  async (room_id) => {
    const response = await fetch(`${BASE_URL}/rooms/${room_id}`);
    return response.json();
  }
);

//BookingPage.jsx
export const confirmBooking = createAsyncThunk(
  "bookings/confirmBooking",
  async (bookingData) => {
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    return response.data;
  }
);

//BookingPage.jsx
export const sendConfirmationEmail = createAsyncThunk(
  "bookings/sendConfirmationEmail",
  async (emailData) => {
    const response = await axios.post(`${BASE_URL}/send-email`, emailData);
    return response.data;
  }
);

//AdminPage.jsx
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const response = await fetch(`${BASE_URL}/bookings`);
    return response.json();
  }
);

//AdminPage.jsx
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (booking_id) => {
    const response = await axios.put(`${BASE_URL}/trips/${booking_id}`, {
      status: "cancelled",
    });
    return response.data;
  }
);

//AdminPage.jsx
export const reconfirmBooking = createAsyncThunk(
  "bookings/reconfirmBooking",
  async (booking_id) => {
    const response = await axios.put(`${BASE_URL}/trips/${booking_id}`, {
      status: "confirmed",
    });
    return response.data;
  }
);

//AdminPage.jsx
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (booking_id) => {
    const response = await axios.delete(`${BASE_URL}/bookings/${booking_id}`);
    return response.data;
  }
);

//ProfilePage.jsx
export const fetchProfileImage = createAsyncThunk(
  "bookings/fetchProfileImage",
  async (user_id) => {
    try {
      // Reference to the user's document in Firestore
      const userRef = doc(db, `users/${user_id}`);

      // Fetch the user document
      const userSnap = await getDoc(userRef);

      // Extract the user data
      const user = userSnap.data();

      // Return the profileImage
      return user.profileImage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//ProfilePage.jsx
export const updateProfileImage = createAsyncThunk(
  "bookings/updateProfileImage",
  async ({ user_id, file }) => {
    try {
      let imageUrl = "";
      if (file) {
        const imageRef = ref(storage, `users/${file.name}`); //where to store
        const response = await uploadBytes(imageRef, file); //receive uploaded file data
        imageUrl = await getDownloadURL(response.ref); //receive uploaded file url

        // Reference to the user's document in Firestore
        const userRef = doc(db, `users/${user_id}`);
        // Update the user's profile with the image URL
        await setDoc(userRef, { profileImage: imageUrl }, { merge: true });

        // Get the updated user data
        const userSnap = await getDoc(userRef);
        const user = {
          id: userSnap.id,
          ...userSnap.data(),
        };

        return user;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Slice
const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    rooms: [],
    loading: true,
    room: [],
    booking: [],
    email: [],
    bookings: [],
    user: null,
    profileImage: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    //fetchRooms
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.loading = false;
    });

    //fetchRoomByRoomId
    builder.addCase(fetchRoomByRoomId.fulfilled, (state, action) => {
      state.room = action.payload;
    });

    //confirmBooking
    builder.addCase(confirmBooking.fulfilled, (state, action) => {
      state.booking = action.payload;
    });

    //sendConfirmationEmail
    builder.addCase(sendConfirmationEmail.fulfilled, (state, action) => {
      state.email = action.payload;
    });

    //fetchBookings
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
    });

    //cancelBooking
    builder.addCase(cancelBooking.fulfilled, (state, action) => {
      // Find the booking with the same id as the cancelled booking
      const index = state.bookings.findIndex(
        (booking) => booking.booking_id === action.payload.booking_id
      );
      // Update the booking status to 'cancelled'
      if (index !== -1) {
        state.bookings[index].status = "cancelled";
      }
    });

    //reconfirmBooking
    builder.addCase(reconfirmBooking.fulfilled, (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.booking_id === action.payload.booking_id
      );
      if (index !== -1) {
        state.bookings[index].status = "confirmed";
      }
    });

    //deleteBooking
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.booking_id !== action.payload.booking_id
      );
    });

    // fetchProfileImage
    builder.addCase(fetchProfileImage.fulfilled, (state, action) => {
      state.profileImage = action.payload;
    });

    //updateProfileImage
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.user = action.payload;
      state.profileImage = action.payload.profileImage;
    });
  },
});

export default bookingsSlice.reducer;
