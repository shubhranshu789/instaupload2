import React, { useEffect, useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function MyFollwingPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const [user, setUser] = useState([]);
  const [news, setNews] = useState();


  useEffect(() => {

    axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=3e74780dfaa4491d82047bfb708f9abe")
    .then((res) => {
      console.log(res.data.articles)
      setNews(res.data.articles)
    })

    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup")
    }

    //  Fetching all the posts
    fetch("/myfollwingpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")

      },
    }).then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err))

    const display = () => {
      allusers();
    }
    display();
  }, []);

  //for like
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
  }

  //for Unlike
  const UnlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
  }

  //Function for making a comment
  const makeComment = (text, id) => {
    // console.log(comment)
    fetch("/comment", {
      method: "put",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        setComment("")
        console.log(result)
      })
  }

  //TO show and hide comment section
  const toggleComment = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setItem(posts)
      console.log(item)
    }
  }

  const allusers = async () => {
    try {
      const response = await fetch("/currentuser", {
        method: "get",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const result = await response.json();
      setUser(result);
      // setRefresh((pre) => pre + 1);
      console.log(user);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='home'>


      
<div className="container2">
        <h1>News Feed</h1>
        {
          news?.map((val) => {
            return (
              <div className="card" style={{ width: "18rem", float: "left", marginLeft: "10px", marginRight: "10px" }}>
                <img src={val.urlToImage} className="card-img-top" alt="..."></img>
                <div className="card-body">
                  <h5 className="card-title" style={{padding:"5px"}}>{val.title}</h5>
                  <p className="card-text" style={{padding:"5px"}}>{val.description}</p>
                  
                </div>
              </div>
            )
          })
        }

      </div>
      



      <div className="container1">

        <div className="users">
          <h4 style={{ borderBottom: "1px solid rgb(173, 173, 173)" }}>Recomendations</h4>
          {user && (
            user.map((users) => (
              <div className="card-header">
                <div className="card-pic">
                  {/* <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" /> */}
                  <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="" />
                </div>
                <h5>
                  <Link to={`/profile/${users?._id}`}>
                    {users?.name}
                  </Link>
                </h5>
              </div>
            ))
          )
          }
        </div>
      </div>






      {/* card */}

      {/* displaying all the fetched posts */}
      {
        data.map((posts) => {
          // console.log(posts)
          return (
            <div className="card">
              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  {/* <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" /> */}
                  <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="" />
                </div>
                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
                    {posts.postedBy.name}
                  </Link>
                </h5>
              </div>
              {/* card image */}
              <div className="card-image">
                <img src={posts.photo} alt="" />
              </div>

              {/* card content */}
              <div className="card-content">
                {
                  posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                    ?
                    (<span className="material-symbols-outlined material-symbols-outlined-red"
                      onClick={() => { UnlikePost(posts._id) }}>favorite</span>)
                    :
                    (<span className="material-symbols-outlined"
                      onClick={() => { likePost(posts._id) }}>favorite</span>)
                }




                <p>{posts.likes.length} Likes</p>
                <p>{posts.body}</p>
                <p style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => { toggleComment(posts) }}>View all comments</p>
              </div>

              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">
                  sentiment_satisfied</span>
                <input type="text" placeholder='Add a comment' value={comment}
                  onChange={(e) => { setComment(e.target.value) }} />
                <button className='comment'
                  onClick={() => { makeComment(comment, posts._id) }}>Post</button>

              </div>
            </div>
          )
        })
      }

      {/* show Comments */}

      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">

              {/* card header */}
              <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                <div className="card-pic">
                  <img src="https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              {/* commentSection */}
              <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>

                {
                  item.comments.map((comment) => {
                    return (
                      <p className='comm'>
                        <span className="commenter" style={{ fontWeight: "bolder" }}>{comment.postedBy.name}{" "} </span>
                        <span className="commentText">{comment.comment}</span>
                      </p>
                    )
                  })
                }



              </div>


              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>

              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">
                  sentiment_satisfied</span>
                <input type="text" placeholder='Add a comment' value={comment}
                  onChange={(e) => { setComment(e.target.value) }} />
                <button className='comment'
                  onClick={() => { makeComment(comment, item._id); toggleComment() }}
                >Post</button>

              </div>

            </div>
          </div>
          <div className="close-comment" onClick={() => { toggleComment() }}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>)
      }


    </div>
  )
}
