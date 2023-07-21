import React, { useEffect, useState } from 'react'
import './Follow.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Follow() {
    const [user, setUser] = useState([]);


    useEffect(() => {


        // axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=3e74780dfaa4491d82047bfb708f9abe")
        //   .then((res) => {
        //     console.log(res.data.articles)
        //     // setNews(res.data.articles)
        //   })
    
        const display = () => {
          allusers();
        }
        display();
      }, []);

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
        <div>
            <div className="container11">

                <div className="users">
                    <h4 style={{ borderBottom: "1px solid rgb(173, 173, 173)" }}>All users</h4>
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
        </div>
    )
}
