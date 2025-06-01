import "./admin.css"
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";



export default function Admin(){

    const [users, setUsers] = useState([])
  const { user } = useContext(Context);
  const [deletedUser,setDeletedUser]=useState();



  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/users" );
      setUsers(res.data);
    };
    fetchPosts();
  }, [deletedUser]);

  const handleDelete = async (uid, username)=>{
try{
await axiosInstance.delete(`/users/${uid}`, )

setDeletedUser(username);
}catch (err) { }

  }

    return(
        <div className="admin">
            <div className="adminWrapper">
                <div className="adminTitle">
                    <span className="adminUpdateTitle">Acount admin</span>
                </div>
                <span className="adminListTitle">Users:</span>
                <ul>
                {users.map((u)=>(
                    <li key={u._id} className="adminUserList">{u.username} - {u.email}   
                <i
                  className="adminIcon adminIconDelete far fa-trash-alt"
                  onClick={()=>{handleDelete(u._id,u.username)}}
                ></i>
                {user._id===u._id&&<Link className="link" to={`/settings`}>
                <i
                  className="adminIcon adminIconEdit far fa-edit"
                ></i>
                </Link>}
              <hr /></li>
                    
                ))}
                </ul>

                {deletedUser&&<p>User {deletedUser} is succesvol verwijderd.</p>}
                 <span className="adminTitle adminUpdateTitle">Register new user</span>
 <Link className="link" to={`/register`}>
                <i
                  className="adminIcon adminIconNew far fa-edit fa-2x"
                ></i>
                </Link>
            </div>
        </div>
    )
}