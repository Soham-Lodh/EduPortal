import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Configure axios to always include credentials
  axios.defaults.withCredentials = true;

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL||"https://eduportal-efyw.onrender.com"}/api/auth/protected`);
        if (res.data.user || res.data.userId) {
          const userData = res.data.user || { id: res.data.userId };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ---------------- Authentication Functions ----------------

  // Signup
  const signup = async (fullName, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        { fullName, email, password }
      );
      
      if (res.data.userId) {
        // Update auth state after successful signup
        setUser({ id: res.data.userId });
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify({ id: res.data.userId }));
      }
      
      return { 
        success: true, 
        message: res.data.message || "Signup successful",
        userId: res.data.userId
      };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Signup failed";
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (emailOrFullName, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { emailOrFullName, password }
      );
      
      if (res.data.userId) {
        // Update auth state after successful login
        setUser({ id: res.data.userId });
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify({ id: res.data.userId }));
      }
      
      return { 
        success: true, 
        message: res.data.message || "Login successful",
        userId: res.data.userId
      };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      return { success: true, message: "Logged out successfully!" };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Logout failed";
      return { success: false, error: errorMessage };
    }
  };

  // Send OTP for password reset
  const sendResetOtp = async (email) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/send-reset-otp`,
        { email }
      );
      return { 
        success: true, 
        message: res.data.message || "OTP sent successfully" 
      };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to send OTP";
      return { success: false, error: errorMessage };
    }
  };

  // Reset password with OTP
  const resetPassword = async ({ email, otp, newPassword }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      return { 
        success: true, 
        message: res.data.message || "Password reset successful" 
      };
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to reset password";
      return { success: false, error: errorMessage };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        sendResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
