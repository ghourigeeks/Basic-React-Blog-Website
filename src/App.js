// App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Post from "./Components/Post";
import Create from "./Components/Create";
import PostPreview from "./Components/PostPreview";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthContext";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      posts: [],
      loading: true, // Added loading state
    };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {
    axios.get("posts")
      .then(response => {
        this.setState({ posts: response.data, loading: false }); // Update posts and loading state
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false }); // Update loading state in case of error
      });
  }

  toggleDarkMode() {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode
    }), () => {
      document.body.style.backgroundColor = this.state.isDarkMode ? "#000" : "#fff";
    });
  }

  deleteHandler = (id) => {
    axios.delete("posts/" + id)
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log(e);
    });
  };

  render() {
    const { isDarkMode, posts, loading } = this.state;

    const postPreviews = loading ? (
      <p>Loading...</p>
    ) : (
      posts.map(post => <PostPreview delete={() => this.deleteHandler(post.id)} 
      key={post.id} 
      title={post.title} 
      body={post.body} 
      />)
    );

    return (
      <AuthProvider>
        <div className={isDarkMode ? "dark-mode" : "light-mode"}>
          <Router>
            <NavBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header title="Basim Ghouri" img="home-bg.jpg" />
                    <Home>{postPreviews}</Home>
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Header title="About Us" img="about-bg.jpg" />
                    <About />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Header title="Contact Us" img="contact-bg.jpg" />
                    <Contact />
                  </>
                }
              />
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
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <>
                      <Header title="Blog Post" img="post-bg.jpg" />
                      <Create />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={<Header title="404 Not Found" img="contact-bg.jpg" />}
              />
            </Routes>
            <Footer />
          </Router>
          <button onClick={this.toggleDarkMode}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
