import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utilis";

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
    const res = await axios.post(
      "http://localhost:3002/user/login",
      credentials
    );
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
        const res = await axios.get("http://localhost:3002/notes/me", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(res.data.errors == true) {
            setError(res.data.message)
        } else {
            setNotes(res.data.Notes);
        }

        console.log(res);

    } else {
        navigate('/login');
    }

}


const logout =  () => {
  //localStorage.removeItem("accessToken");
  console.log('isL1 ', islogin);
  setIslogin(false);
  console.log('isL2 ', islogin);

}


  return (
    <AuthContext.Provider
      value={{ islogin, setIslogin, logout, loading, Notes , loginUser, error, getUserNotes }}
    >
      {children}
    </AuthContext.Provider>
  );
};
