import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      console.log(res);
      const token = res.data.token;
      const user = res.data.results;
      localStorage.setItem("token", token);
      setAuth({ token });
      const name = { firstName: user.first_name, lastName: user.last_name };
      localStorage.setItem("name", JSON.stringify(name));
      navigate("/");
    } catch (err) {
      console.log(err);
      return err.response.data.message;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setAuth({});
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
