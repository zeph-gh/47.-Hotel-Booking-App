import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./components/AuthProvider";
import TopBottonBar from "./components/TopBottonBar";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import RequireAuth from "./components/RequireAuth";
import RoomPage from "./pages/RoomPage";
import BookingPage from "./pages/BookingPage";
import TripPage from "./pages/TripPage";
import AdminPage from "./pages/AdminPage";
import RequireAdminAuth from "./components/RequireAdminAuth";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopBottonBar />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="*" element={<ErrorPage />} />

              <Route path="/room/:room_id" element={<RoomPage />} />

              <Route
                path="/booking/:room_id"
                element={
                  <RequireAuth>
                    <BookingPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/trips"
                element={
                  <RequireAuth>
                    <TripPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />

              <Route
                path="/admin"
                element={
                  <RequireAdminAuth>
                    <AdminPage />
                  </RequireAdminAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}
