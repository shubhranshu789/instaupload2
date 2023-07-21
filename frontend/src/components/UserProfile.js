import React, { useEffect, useState } from 'react'
import './Profile.css'
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

export default function UserProfile() {

  const [user, setUser] = useState("");
  
  const [posts, setPosts] = useState([]);

  const [isFollow, setIsFollow] = useState(false);

  const {userid} = useParams();
  console.log(userid);

  

  // to follow user
  const followUser = (userId) => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
  };

  // to unfollow user
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },

    })
      .then((res)=> res.json())
      .then((result) => {
        console.log(result)
        setUser(result.user)
        setPosts(result.post)
        
        if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
          setIsFollow(true)
        }

      });
  }, [isFollow]);

  if (user === null){
    return <div>
        loading
      </div>
  }

  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className="profile-frame" >
        {/* profile pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" />
        </div>

        {/* profile data */}
        <div className="profile-data">
          <div style={{display : "flex" , alignItems : "center", justifyContent : "space-between"}}>
          <h1>{user?.name}</h1>
          <button className='followBtn'
          onClick={() => {
            if(isFollow){
              unfollowUser(user._id)
            }else{
              followUser(user._id)
            }
            followUser(user._id)}}
          >{isFollow ? "Unfollow " : "Follow"}</button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? (user.followers.length) - Math.floor((user.followers.length)/2) : "0"} follwers</p>
            <p>{user.following ? (user.following.length) - Math.floor((user.following.length)/2) : "0"} following</p>
          </div>
        </div>
      </div>


      {/* Gallery */}

      <div className="gallery">
        {
          posts.map((pics) => {
            return <img key={pics._id} src={pics.photo} className='item'
            // onClick={() => {toggleDetails(pics)}}
            >

            </img>
          })
        }
      </div>
        
    </div>
  )
}
