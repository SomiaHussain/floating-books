import "../styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/loginPage";
import Nav from "../Pages/Navigation/nav";
import RegistrationPage from "../Pages/Register/registerPage";
import ProfilePage from "../Pages/User/profilePage";
import FooterSection from "../Pages/Footer/footer";
import HomePage from "../Pages/Home/homePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <FooterSection />
    </div>
  );
}

export default App;
