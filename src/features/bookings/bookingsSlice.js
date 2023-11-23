import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for adding a new booking
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData) => {
    const response = await axios.post("/bookings", bookingData);
    return response.data;
  }
);

// Async thunk for deleting a booking
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId) => {
    await axios.delete(`/bookings/${bookingId}`);
    return bookingId;
  }
);

// Async thunk for getting bookings for a user
export const fetchBookingsByUser = createAsyncThunk(
  "bookings/fetchBookingsByUser",
  async (userId) => {
    const response = await axios.get(`/bookings/user/${userId}`);
    return response.data;
  }
);

// Async thunk for adding a new user
export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  const response = await axios.post("/users", userData);
  return response.data;
});

// Async thunk for getting all rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await axios.get("/rooms");
  return response.data;
});

// Async thunk for adding a new room
export const addRoom = createAsyncThunk("rooms/addRoom", async (roomData) => {
  const response = await axios.post("/rooms", roomData);
  return response.data;
});

// Async thunk for deleting a room
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (roomId) => {
    await axios.delete(`/rooms/${roomId}`);
    return roomId;
  }
);

// Async thunk for updating a room's availability
export const updateRoomAvailability = createAsyncThunk(
  "rooms/updateRoomAvailability",
  async ({ roomId, availability }) => {
    const response = await axios.put(`/rooms/${roomId}`, { availability });
    return response.data;
  }
);

// Async thunk for getting a room's booking count
export const fetchRoomBookingCount = createAsyncThunk(
  "rooms/fetchRoomBookingCount",
  async (roomId) => {
    const response = await axios.get(`/roomBookingCounts/${roomId}`);
    return response.data;
  }
);

// Async thunk for getting the count of available rooms by type
export const fetchAvailableRoomsByType = createAsyncThunk(
  "rooms/fetchAvailableRoomsByType",
  async () => {
    const response = await axios.get("/rooms/available");
    return response.data;
  }
);

// Async thunk for getting the total count of available rooms
export const fetchTotalAvailableRooms = createAsyncThunk(
  "rooms/fetchTotalAvailableRooms",
  async () => {
    const response = await axios.get("/rooms/available/total");
    return response.data;
  }
);

// Slice
const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    rooms: [],
    loading: true,
    roomBookingCounts: {},
    availableRoomsByType: [],
    totalAvailableRooms: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.loading = false;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.booking_id !== action.payload
        );
      })
      .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(
          (room) => room.room_id !== action.payload
        );
      })
      .addCase(updateRoomAvailability.fulfilled, (state, action) => {
        const updatedRoom = action.payload;
        const roomIndex = state.rooms.findIndex(
          (room) => room.room_id === updatedRoom.room_id
        );
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = updatedRoom;
        }
      })
      .addCase(fetchRoomBookingCount.fulfilled, (state, action) => {
        const roomBookingCount = action.payload;
        state.roomBookingCounts[roomBookingCount.room_id] =
          roomBookingCount.booking_count;
      })
      .addCase(fetchAvailableRoomsByType.fulfilled, (state, action) => {
        state.availableRoomsByType = action.payload;
      })
      .addCase(fetchTotalAvailableRooms.fulfilled, (state, action) => {
        state.totalAvailableRooms = action.payload.total;
      });
  },
});

export default bookingsSlice.reducer;
