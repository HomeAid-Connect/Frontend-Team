import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import OtpScreen from "./Components/OtpScreen";
import LandingPage from "./Components/LandingPage";
import HomeLayout from "./shared/HomeLayout";
import Dashboard from "./Components/Dashboard";
import BookingsPage from "./Pages/BookingsPage";
import MessageArtisan from "./Pages/Messages/MessageArtisan";
import MessagesPage from "./Pages/Messages/MessagesPage";
import ServicesPage from "./Pages/ServicesPage";
import SOSPage from "./Pages/SOSPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage"

import { Routes, Route } from "react-router";

// Add Zod for validation
// use Action() to collect formData

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="register">
          <Route path="customer" element={<RegisterPage role={"customer"} />} />
          <Route path="*" element={<RegisterPage role={"customer"} />} />
          <Route path="artisan" element={<RegisterPage role={"artisan"} />} />
          <Route path="otp" element={<OtpScreen />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Services" element={<ServicesPage />} />
          <Route path="Bookings" element={<BookingsPage />} />
          <Route path="SOS" element={<SOSPage />} />

          <Route path="Messages">
          <Route index element={<MessagesPage />} />
            <Route path="artisan/:artisanId" element={<MessageArtisan/>} />
          </Route>

          <Route path="Settings">
            <Route index element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
