import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useLocation } from "react-router";
import { axiosInstance } from "../../config";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  //fetch postsand sort them from new to old to show in Posts component and get length for header image
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      res.data.sort((a,b)=>(b.day-a.day));
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header postsLength={posts.length} />
      <div className="home">
        <Posts posts={posts} />
        {window.innerWidth > 640&&<Sidebar/>}
      </div>
    </>
  );
}
