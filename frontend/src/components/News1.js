import React, { useEffect, useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function News1() {
    const [news, setNews] = useState();
    useEffect(() => {


        axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=3e74780dfaa4491d82047bfb708f9abe")
          .then((res) => {
            console.log(res.data.articles)
            setNews(res.data.articles)
          })
      }, []);

  return (
    <div>
        
        <div className="container22">
        <h1>News Feed</h1>
        {
          news?.map((val) => {
            return (
              <div className="card" style={{ width: "18rem", marginLeft: "47px", marginRight: "10px" }}>
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
    </div>
  )
}
