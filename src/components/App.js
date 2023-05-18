import "../styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "../Pages/Navigation/nav";
import LoginPage from "../Pages/Login/loginPage";
import RegistrationPage from "../Pages/Registration/registerPage";
import ContactPage from "../Pages/Contact/contactPage";
import AboutUsPage from "../Pages/AboutUs/aboutUsPage";
import FooterSection from "../Pages/Footer/footer";
import HomePage from "../Pages/Home/homePage";
import AddBookPage from "../Pages/Book/addBookPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </Router>
      <FooterSection />
    </div>
  );
}

export default App;
