import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

export default function Single() {
  return (
    <div className="single">
      <SinglePost/>
      {window.innerWidth > 640&&<Sidebar/>}    </div>
  );
}
