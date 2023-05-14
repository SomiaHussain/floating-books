import "../styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/loginPage";
import Nav from "../Pages/Navigation/nav";
import RegistrationPage from "../Pages/Registration/registerPage";
import FooterSection from "../Pages/Footer/footer";
import HomePage from "../Pages/Home/homePage";
import AddBookPage from "../Pages/Book/addBookPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
