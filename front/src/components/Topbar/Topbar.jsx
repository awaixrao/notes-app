import { useContext } from "react";

import { Search } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const ctx = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="user-info">
        <div className="photo">
          {
        ctx.user?.photo &&  <img src={ctx.user.photo} width="60px" />
          }
        </div>
        <div className="info">
          <h5>{ctx.user?.name}</h5>
          <p>{ctx.user?.email}</p>
        </div>
      </div>
      <div className="search-input">
        <Search color="#707070" className="searchIcon" />
        <input type="search" className="search" />
      </div>
    </div>
  );
};

export default Topbar;
