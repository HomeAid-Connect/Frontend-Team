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
          <Route path="*" element={<RegisterPage role={"customer"} />} />
          <Route path="artisan" element={<RegisterPage role={"artisan"} />} />
        <Route path="otp" element={<OtpScreen />} />

        </Route>

        <Route element={""}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
