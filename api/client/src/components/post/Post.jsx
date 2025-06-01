import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <div >
        <Link to={`/post/${post._id}`} className="link">
      {post.headPhoto && <img className="postImg" src={PF + post.headPhoto} alt="" />}
        
          <span className="postTitle postInfo">Dag {post.day} van {post.leaveFrom} naar {post.arriveAt}</span>
        </Link>
        <hr />
      </div>
      <p className="postArea">{post.area}  {new Date(post.hikeDate).toLocaleDateString()}</p>
        <span className="postDesc">
          {post.story1}
        </span>
    </div>
  );
}
