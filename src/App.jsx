import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import OtpScreen from "./Pages/Auth/OtpScreen";
import LandingPage from "./Pages/LandingPage";
import HomeLayout from "./shared/HomeLayout";
import Dashboard from "./Pages/Customer/Dashboard";
import BookingsPage from "./Pages/Customer/BookingsPage";
import MessageArtisan from "./Pages/Messages/MessageArtisan";
import MessagesPage from "./Pages/Messages/MessagesPage";
import ServicesPage from "./Pages/Customer/ServicesPage";
import SOSPage from "./Pages/Shared/SOSPage";
import SettingsPage from "./Pages/Shared/SettingsPage";
import ProfilePage from "./Pages/Shared/ProfilePage"
import ForgotPassword from "./Pages/Auth/ForgotPassword";

import { Routes, Route } from "react-router";
import Professionals from "./Pages/Customer/Professionals/Professionals";

// Add Zod for validation
// use Action() to collect formData

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="register">
          <Route path="customer" element={<RegisterPage role={"customer"} />} />
          <Route path="*" element={<RegisterPage role={"customer"} />} />
          <Route path="artisan" element={<RegisterPage role={"artisan"} />} />
          <Route path="otp" element={<OtpScreen />} />
        </Route>

        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<HomeLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Services" element={<ServicesPage />} />
          <Route path="Bookings" element={<BookingsPage />} />
          <Route path="SOS" element={<SOSPage />} />

          <Route path="Professionals">
          <Route index element={<Professionals/>}/>
          <Route path=":service/:id" element={<Professionals/>}/>
          </Route>
          
          <Route path="Messages">
          <Route index element={<MessagesPage />} />
            <Route path="artisan/:artisanId" element={<MessageArtisan/>} />
          </Route>

          <Route path="Settings">
            <Route index element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage/>} />
          </Route>

          </Route>
        {/* </Route> */}

      </Routes>
    </>

  

  );
}

export default App;
