import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import LoaderAnimation from '../components/LoaderAnimation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);

  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    userRole: localStorage.getItem("userRole") || null,
  });

  const [ userId, setUserId ] = useState(null);

  const isTokenExpired = (token) => {
    try {
      if (!token) return true;
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return true;
    }
  };

  const getTokenExpirationTime = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000;
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setAuth({ accessToken: null, refreshToken: null, userRole: null});

    navigate("/");

  }, [navigate]);

  const refreshToken = useCallback(async () => {
    try {
      const { refreshToken } = auth;
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(
        `http://localhost:8080/api/lumina/auth/refresh`,
        { refreshToken }
      );

      const { accessToken } = response.data;
  
      localStorage.setItem("accessToken", accessToken);
      setAuth((prev) => ({
        ...prev,
        accessToken,
      }));

      console.log("Token refreshed successfully");
      return accessToken; 
    } catch (error) {
      console.error("Failed to refresh token:", error.response?.data || error.message);
      logout();
      throw new Error("Token refresh failed");
    }
  }, [auth, logout]);

  const signin = async (email, password) => {
    setLoader(true);
    try {
      const response = await axios.post("http://localhost:8080/api/lumina/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decodedToken = jwtDecode(accessToken);
      const userEmail = decodedToken.sub;

      const userDetails = await fetchUserDetails(userEmail, accessToken);

      localStorage.setItem("userRole", userDetails.userRole);

      setAuth({
        accessToken,
        refreshToken,
        userRole: userDetails.userRole,
      });
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Login error:", error.response?.data || error.message);
      throw new Error("Login failed");
      
      
    }
  };

  const fetchUserDetails = async (userEmail, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/lumina/user/email?userEmail=${userEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error.response?.data || error.message);
      throw new Error("Failed to fetch user details");
    }
  };

  const getAuthHeader = async () => {
    let token = auth.accessToken;
    if (!token || isTokenExpired(token)) {
      try {
        token = await refreshToken();
      } catch {
        logout();
        throw new Error("User is logged out");
      }
    }
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const token = auth.accessToken;
  
    // Validate token on mount
    if (!token || isTokenExpired(token)) {
      // Only log out if we detect an issue with the token
      logout();
      return;
    }
  
    const expirationTime = getTokenExpirationTime(token);
    const refreshBeforeExpiry = expirationTime - Date.now() - 1 * 60 * 1000;
  
    const intervalId = setInterval(() => {
      if (!isTokenExpired(token)) {
        refreshToken().catch(() => logout());
      }
    }, refreshBeforeExpiry);
  
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [auth.accessToken]); // Remove logout and refreshToken from dependencies

  return (
    <>
    <AuthContext.Provider value={{ auth, signin, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
      {loader && 
            <LoaderAnimation type={"heart-rate"}/>
        }
    </>
    
    
  );

  
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

