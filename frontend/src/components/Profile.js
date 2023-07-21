import React, { useEffect, useState } from 'react'
import './Profile.css'
import PostDetail from './PostDetail';


export default function Profile() {

  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState([]);


  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPosts(posts)
      
    }
  }

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },

    })
      .then((res)=> res.json())
      .then((result) => {
        setPic(result)
        // setPosts(result)
        console.log(pic)
      });



      fetch("/profiledata", {
      headers: {
        Authorization : "Bearer " + localStorage.getItem("jwt")
      },

    })
      .then((res)=> res.json())
      .then((result) => {
        setUser(result)
        console.log("user==>", result);
      });




      
  }, []);
  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" />
        </div>

        {/* profile data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{user?.post?.length} posts</p>
            <p>{user?.user?.followers ? (user?.user?.followers?.length)- Math.floor((user?.user?.followers?.length)/2) : "0"} follwers</p>
            <p>{user?.user?.following ? (user?.user?.following?.length)- Math.floor((user?.user?.following?.length)/2)  : "0"} following</p>
          </div>
        </div>
      </div>


      {/* Gallery */}

      <div className="gallery">
        {
          pic.map((pics) => {
            return <img key={pics._id} src={pics.photo} className='item'
            onClick={() => {toggleDetails(pics)}}></img>
          })
        }
      </div>
        {show && 
      <PostDetail item={posts} toggleDetails = {toggleDetails}/>
      
      
        }
    </div>
  )
}
