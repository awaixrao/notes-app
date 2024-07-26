import { createContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { getToken, getUser,removeUser, removeToken } from "../utilis";
import { httpClient } from "../lib/httpClient";

// create context
export const AuthContext = createContext(null);

//context provider

export const AuthProvider = ({ children }) => {
  const [islogin, setIslogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
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
    removeUser();
    setIslogin(false);
  };

  useEffect(() => {
    const user = getUser();
    const verifyToken = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await httpClient.post("/user/verify", { token: token });
          if (res.data.error == false) 
            {
              setUser(user);
            setIslogin(true);
            setUser(getUser());
            navigate("/");
          }
        } catch (error) {
          removeUser()
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        islogin,
        setIslogin,
        logout,
        user,
        loading,
        Notes,
        loginUser,
        error,
        setUser,
        getUserNotes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
