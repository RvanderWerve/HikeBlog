import { useState } from "react";
import sort from "../../images/sort.png"
import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
const [sortedAsc, setSortedAsc]=useState(false);

const sortPosts = ()=>{
  if(!sortedAsc){
  posts.sort((a,b)=>(b.day-a.day));
setSortedAsc(true);
  }
  else{  posts.sort((a,b)=>(a.day-b.day));
    setSortedAsc(false);
  }
}

  return (
    <div>
      <div className="postsHeader"><img className="sortIcon" src={sort} alt="" onClick={sortPosts} /></div>
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
    </div>
  );
}
