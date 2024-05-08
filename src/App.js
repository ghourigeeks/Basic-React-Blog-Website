// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Post from "./Components/Post";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<><Header title="Basim Ghouri" img="home-bg.jpg" /><Home /></>} />
          <Route path="/about" element={<><Header title="About Us" img="about-bg.jpg" /><About /></>} />
          <Route path="/contact" element={<><Header title="Contact Us" img="contact-bg.jpg" /><Contact /></>} />
          <Route
            path="/post/*"
            element={
              <ProtectedRoute>
                <>
                  <Header title="Blog Post" img="post-bg.jpg" />
                  <Post />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<><Header title="404 Not Found" img="contact-bg.jpg" /></>}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
