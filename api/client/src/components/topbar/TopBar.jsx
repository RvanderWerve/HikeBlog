import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              ETAPPES
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/hike">
              COAST TO COAST
            </Link>
          </li>
          
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <ul className="topList">
            <li className="topListItem">
              <a href="/write">NIEUW</a>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
         {user.admin&& <li className="topListItem" >
          <Link className="link" to="/admin">
                ADM
              </Link>
          </li>}
         
          </ul>
           
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        )}
       {user&& <ul className="topList">
         <li className="topListItem">
          <Link to="/settings">
            {user.profilePic&&<img className="topImg" src={PF+user.profilePic} alt="" />}
            <span className="userInitial ">{!user.profilePic&&user.username.charAt(0).toUpperCase()}</span>
          </Link>
          </li>
          </ul>
          }
      </div>
    </div>
  );
}
