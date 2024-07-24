import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utilis";
import { httpClient } from "../lib/httpClient";

// create context
export const AuthContext = createContext(null);

//context provider

export const AuthProvider = ({ children }) => {
  const [islogin, setIslogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Notes, setNotes] = useState([]);
  const navigate = useNavigate();

  //login user

  const loginUser = async (credentials) => {
    setLoading(true);
    const res = await httpClient.post("/user/login", credentials);
    if (res.data.error == true) {
      setError(res.data.message);
    } else if (res.data.error == false) {
      console.log("error false");
      setLoading(false);

      localStorage.setItem("accessToken", res.data.accessToken);

      setIslogin(true);
      navigate("/");
    }
  };

  //getting users notes

  const getUserNotes = async () => {
    const token = getToken();
    if (token) {
      const res = await httpClient.get("/notes/me");

      if (res.data.errors == true) {
        setError(res.data.message);
      } else {
        setNotes(res.data.Notes);
      }

      console.log(res);
    } else {
      navigate("/login");
    }
  };



  const logout = () => {
    setNotes([]);
    removeToken();
    setIslogin(false);
  };


  
  useEffect(() => {
    const verifyToken = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await httpClient.post("/user/verify", { token: token });
          if (res.data.error == false) {
            setIslogin(true);
            navigate("/");
          }
        } catch (error) {
          removeToken();
          setIslogin(false);
          navigate("/login");
        }
      } else {
        setIslogin(false);
        navigate("/login");
      }
    };
    verifyToken();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        islogin,
        setIslogin,
        logout,
        loading,
        Notes,
        loginUser,
        error,
        getUserNotes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
