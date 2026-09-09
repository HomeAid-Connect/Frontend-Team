import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import OtpScreen from "./Components/OtpScreen";
import LandingPage from "./Components/LandingPage";
import Dashboard from "./Components/Dashboard";
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
          <Route path="artisan" element={<RegisterPage role={"artisan"} />} />
        </Route>

        <Route element={""}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/register/otp" element={<OtpScreen />} />
      </Routes>
    </>
  );
}

export default App;
