import React from 'react'
import './PostDetail.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function PostDetail({ item, toggleDetails }) {


    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);
    const [item1, setItem] = useState([]);
    const navigate = useNavigate()

    //function for delting a post
    const removePost = (postId) => {
        if (window.confirm("Do you really want to delete this post")) {
            console.log(postId)
            fetch(`/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")

                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result)
                    toggleDetails()
                    navigate('/')
                })
        }

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


    return (
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
                        <div className="deletePost" onClick={() => { removePost(item._id) }}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </div>
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
                        <input type="text" placeholder='Add a comment'
                        value={comment}
                          onChange={(e) => { setComment(e.target.value) }} 
                        />
                        <button className='comment'
                        onClick={() => { makeComment(comment, item._id); toggleComment()}}
                        >Post</button>

                    </div>

                </div>
            </div>
            <div className="close-comment"
                onClick={() => { toggleDetails() }}
            >
                <span className="material-symbols-outlined material-symbols-outlined-comment">
                    close
                </span>
            </div>
        </div>
    )
}
