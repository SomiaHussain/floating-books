import "../styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/loginPage";
import Nav from "../Pages/Navigation/nav";
import RegistrationPage from "../Pages/Register/registerPage";
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
        </Routes>
      </Router>
      <FooterSection />
    </div>
  );
}

export default App;
