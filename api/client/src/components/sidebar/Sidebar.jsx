import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import "./sidebar.css";
import { axiosInstance } from "../../config";

export default function Sidebar() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();


    useEffect(() => {
      const fetchPosts = async () => {
        const res = await axiosInstance.get("/posts" + search);
        res.data.sort((a,b)=>(a.day-b.day));
        setPosts(res.data);
      };
      fetchPosts();
    }, [search]);


  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ETAPPES</span>
        <ul className="sidebarList">
          {posts&&posts.map((p) =>(
             <Link to={`/post/${p._id}`} className="link" key={p._id}>      
            <li className="sidebarListItem" >dag {p.day}</li>
            </Link>
          ))}
        </ul>
      </div>
   
      <div className="sidebarItem">
        <span className="sidebarTitle">VOLG</span>
        <div className="sidebarSocial">
          <a href="http://www.youtube.com/@TheOutdoorType-v6m"><i className="sidebarIcon fab fa-youtube"></i></a>
          <a href="https://www.instagram.com/the.outdoortype?igsh=cmEzd28wbm9wbzVk"><i className="sidebarIcon fab fa-instagram-square"></i></a>
        </div>
      </div>
    </div>
  );
}
