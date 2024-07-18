import axios from "axios";
import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// create context
export const AuthContext = createContext(null);

//context provider

export const AuthProvider = ({ children }) => {
  const [islogin, setIslogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //login user

  const loginUser = async (credentials) => {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:3002/user/login",
      credentials
    );
    if (res.data.error == true) {
      setError(res.data.message);

    } else if (res.data.error == false) {
      console.log("error false");
      setLoading(false);
      setIslogin(true);
      navigate("/");
      
    }
  };

  //getting users notes

  const  getUserNotes = async()=>{
   const token = getToken()
   if(token) 
  }
  return (
    <AuthContext.Provider
      value={{ islogin, setIslogin, loading, loginUser, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
