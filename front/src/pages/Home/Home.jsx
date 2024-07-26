import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Main from "../../components/Main/Main";
import NewNote from "../../components/NewNote/NewNote";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isL", ctx.islogin);
    if (ctx.islogin == false) {
      return navigate("/login");
    }
  });

  useEffect(() => {
    ctx.getUserNotes();
  }, []);

  if (ctx.islogin == true)
    return (
      <div className="home">
        <Sidebar />
        <Main />
        <NewNote />
      </div>
    );
};

export default Home;
