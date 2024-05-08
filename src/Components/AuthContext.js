import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Components/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create the Auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the subscription on unmount to prevent memory leaks
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully logged in!");
    } catch (error) {
      // Provide more detailed error handling
      switch (error.code) {
        case "auth/cancelled-popup-request":
          toast.error("Login popup was closed. Please try again.");
          break;
        case "auth/popup-closed-by-user":
          toast.error("Login popup was closed prematurely. Please try again.");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Check your connection and try again.");
          break;
        default:
          toast.error(`Login failed: ${error.message}`);
          break;
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      toast.success("Successfully logged out!");
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  if (loading) {
    // You can show a loading indicator here while auth status is being checked
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
