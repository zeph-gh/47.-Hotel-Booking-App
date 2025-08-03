import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { storage, db } from '../../firebase'

//RoomMidBody.jsx
export const fetchRooms = createAsyncThunk('bookings/fetchRooms', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rooms'))
    const rooms = []
    querySnapshot.forEach((doc) => {
      rooms.push({ room_id: doc.id, ...doc.data() })
    })
    return rooms
  } catch (error) {
    console.error(error)
    throw error
  }
})

//RoomPage.jsx
export const fetchRoomByRoomId = createAsyncThunk(
  'bookings/fetchRoomByRoomId',
  async (room_id) => {
    try {
      const roomRef = doc(db, `rooms/${room_id}`)
      const roomSnap = await getDoc(roomRef)
      if (roomSnap.exists()) {
        return { room_id: roomSnap.id, ...roomSnap.data() }
      } else {
        throw new Error('Room not found')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//BookingPage.jsx
export const confirmBooking = createAsyncThunk(
  'bookings/confirmBooking',
  async (bookingData) => {
    try {
      const bookingRef = doc(collection(db, 'bookings'))
      await setDoc(bookingRef, bookingData)
      const bookingSnap = await getDoc(bookingRef)
      return { booking_id: bookingSnap.id, ...bookingSnap.data() }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//BookingPage.jsx
export const sendConfirmationEmail = createAsyncThunk(
  'bookings/sendConfirmationEmail',
  async (emailData) => {}
)

//AdminBookingManagementPage.jsx
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'))
      const bookings = []
      querySnapshot.forEach((doc) => {
        bookings.push({ booking_id: doc.id, ...doc.data() })
      })
      return bookings
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//AdminBookingManagementPage.jsx
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (booking_id) => {
    try {
      const bookingRef = doc(db, `bookings/${booking_id}`)
      await setDoc(bookingRef, { status: 'cancelled' }, { merge: true })
      return { booking_id }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//AdminBookingManagementPage.jsx
export const reconfirmBooking = createAsyncThunk(
  'bookings/reconfirmBooking',
  async (booking_id) => {
    try {
      const bookingRef = doc(db, `bookings/${booking_id}`)
      await setDoc(bookingRef, { status: 'confirmed' }, { merge: true })
      return { booking_id }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//AdminBookingManagementPage.jsx
export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (booking_id) => {
    try {
      const bookingRef = doc(db, `bookings/${booking_id}`)
      await deleteDoc(bookingRef)
      return { booking_id }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//TripPage.jsx
export const fetchTrips = createAsyncThunk(
  'bookings/fetchTrips',
  async (user_id) => {
    try {
      const tripsRef = collection(db, 'trips')
      const querySnapshot = await getDocs(tripsRef)
      const trips = []
      querySnapshot.forEach((doc) => {
        const trip = doc.data()
        if (trip.user_id === user_id) {
          trips.push({ trip_id: doc.id, ...trip })
        }
      })
      return trips
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//TripPage.jsx
export const cancelTrip = createAsyncThunk(
  'bookings/cancelTrip',
  async (trip_id) => {
    try {
      const tripRef = doc(db, `trips/${trip_id}`)
      await setDoc(tripRef, { status: 'cancelled' }, { merge: true })
      return trip_id
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//ProfilePage.jsx
export const fetchProfileImage = createAsyncThunk(
  'bookings/fetchProfileImage',
  async (user_id) => {
    try {
      // Reference to the user's document in Firestore
      const userRef = doc(db, `users/${user_id}`)

      // Fetch the user document
      const userSnap = await getDoc(userRef)

      // Extract the user data
      const user = userSnap.data()

      // Return the profileImage
      return user.profileImage
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//ProfilePage.jsx
export const updateProfileImage = createAsyncThunk(
  'bookings/updateProfileImage',
  async ({ user_id, file }) => {
    try {
      let imageUrl = ''
      if (file) {
        const imageRef = ref(storage, `users/${file.name}`) //where to store
        const response = await uploadBytes(imageRef, file) //receive uploaded file data
        imageUrl = await getDownloadURL(response.ref) //receive uploaded file url

        // Reference to the user's document in Firestore
        const userRef = doc(db, `users/${user_id}`)
        // Update the user's profile with the image URL
        await setDoc(userRef, { profileImage: imageUrl }, { merge: true })

        // Get the updated user data
        const userSnap = await getDoc(userRef)
        const user = {
          id: userSnap.id,
          ...userSnap.data(),
        }

        return user
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

// HomePage.jsx
export const fetchRoomImages = createAsyncThunk(
  'rooms/fetchRoomImages',
  async (room_id) => {
    try {
      // Reference to the room's document in Firestore
      const roomRef = doc(db, `rooms/${room_id}`)

      // Fetch the room document
      const roomSnap = await getDoc(roomRef)

      // Extract the room data
      const room = roomSnap.data()

      if (room && room.roomImages) {
        // Return an object where the room ID is the key and the roomImages is the value
        return { [roomSnap.id]: room.roomImages }
      } else {
        return []
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

// HomePage.jsx
export const updateRoomImages = createAsyncThunk(
  'bookings/updateRoomImages',
  async ({ room_id, files }) => {
    try {
      let imageUrls = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const imageRef = ref(storage, `rooms/${file.name}`) //where to store
        const response = await uploadBytes(imageRef, file) //receive uploaded file data
        const imageUrl = await getDownloadURL(response.ref) //receive uploaded file url
        imageUrls.push(imageUrl)
      }

      // Reference to the room's document in Firestore
      const roomRef = doc(db, `rooms/${room_id}`)
      // Update the room's profile with the image URLs
      await setDoc(roomRef, { roomImages: imageUrls }, { merge: true })

      // Get the updated room data
      const roomSnap = await getDoc(roomRef)
      const roomImage = {
        room_id: roomSnap.id,
        ...roomSnap.data(),
      }
      return roomImage
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//HomePage.jsx
export const editRoom = createAsyncThunk(
  'bookings/editRoom',
  async ({ room_id, roomDetails }) => {
    try {
      const roomRef = doc(db, `rooms/${room_id}`)
      await setDoc(roomRef, roomDetails, { merge: true })
      const roomSnap = await getDoc(roomRef)
      return { room_id: roomSnap.id, ...roomSnap.data() }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//HomePage.jsx
export const deleteRoom = createAsyncThunk(
  'bookings/deleteRoom',
  async (room_id) => {
    try {
      const roomRef = doc(db, `rooms/${room_id}`)
      await deleteDoc(roomRef)
      return { room_id }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//HomePage.jsx
export const addRoom = createAsyncThunk(
  'bookings/addRoom',
  async (roomDetails) => {
    try {
      const roomRef = doc(collection(db, 'rooms'))
      await setDoc(roomRef, roomDetails)
      const roomSnap = await getDoc(roomRef)
      return { room_id: roomSnap.id, ...roomSnap.data() }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

//Slice
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    rooms: [],
    loading: true,
    room: [],
    booking: [],
    email: [],
    bookings: [],
    trips: [],
    user: null,
    profileImage: null,
    roomImages: {},
  },
  reducers: {
    resetProfileImage: (state) => {
      state.profileImage = null
    },
  },

  extraReducers: (builder) => {
    //fetchRooms
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload
      state.loading = false
    })

    //fetchRoomByRoomId
    builder.addCase(fetchRoomByRoomId.fulfilled, (state, action) => {
      state.room = action.payload
      state.loading = false
    })

    //confirmBooking
    builder.addCase(confirmBooking.fulfilled, (state, action) => {
      state.booking = action.payload
    })

    //sendConfirmationEmail
    builder.addCase(sendConfirmationEmail.fulfilled, (state, action) => {
      state.email = action.payload
    })

    //fetchBookings
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.bookings = action.payload
    })

    //cancelBooking
    builder.addCase(cancelBooking.fulfilled, (state, action) => {
      // Find the booking with the same id as the cancelled booking
      const index = state.bookings.findIndex(
        (booking) => booking.booking_id === action.payload.booking_id
      )
      // Update the booking status to 'cancelled'
      if (index !== -1) {
        state.bookings[index].status = 'cancelled'
      }
    })

    //reconfirmBooking
    builder.addCase(reconfirmBooking.fulfilled, (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.booking_id === action.payload.booking_id
      )
      if (index !== -1) {
        state.bookings[index].status = 'confirmed'
      }
    })

    //deleteBooking
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.booking_id !== action.payload.booking_id
      )
    })

    //fetchTrips
    builder.addCase(fetchTrips.fulfilled, (state, action) => {
      state.trips = action.payload
    })

    //cancelTrip
    builder.addCase(cancelTrip.fulfilled, (state, action) => {
      // Find the trip with the same id as the cancelled trip
      const index = state.trips.findIndex(
        (trip) => trip.trip_id === action.payload
      )
      // Update the trip status to 'cancelled'
      if (index !== -1) {
        state.trips[index].status = 'cancelled'
      }
    })

    // fetchProfileImage
    builder.addCase(fetchProfileImage.fulfilled, (state, action) => {
      state.profileImage = action.payload
    })

    //updateProfileImage
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.user = action.payload
      state.profileImage = action.payload.profileImage
    })

    // fetchRoomsImages
    builder.addCase(fetchRoomImages.fulfilled, (state, action) => {
      state.roomImages = { ...state.roomImages, ...action.payload }
    })

    //updateRoomImages
    builder.addCase(updateRoomImages.fulfilled, (state, action) => {
      state.roomImages = { ...state.roomImages, ...action.payload }
    })

    // editRoom
    builder.addCase(editRoom.fulfilled, (state, action) => {
      const index = state.rooms.findIndex(
        (room) => room.room_id === action.payload.room_id
      )
      if (index !== -1) {
        state.rooms[index] = action.payload
      }
    })

    // deleteRoom
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.rooms = state.rooms.filter(
        (room) => room.room_id !== action.payload.room_id
      )
    })

    // addRoom
    builder.addCase(addRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload)
    })
  },
})

export default bookingsSlice.reducer
export const { resetProfileImage } = bookingsSlice.actions
