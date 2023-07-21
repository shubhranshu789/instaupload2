import React, { useState, useEffect } from 'react'
import './Createpost.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link , useNavigate} from 'react-router-dom';
import logo from "../img/logo.png";

export default function Createpost() {

    //body = caption
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    //Toast functions
    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);

    useEffect(() => {
        //saving post to mongoDB
        if (url) {
            fetch("/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")

                },
                body: JSON.stringify({
                    body,
                    pic: url
                })
            }).then(res => res.json())
                .then(data => {if(data.error){
                    notifyA(data.error)
                }else{
                    notifyB("Succesfully Posted");
                    navigate("/")
                }})
                .catch(err => console.log(err))
        }

    }, [url]);

    //posting Image to cloudinary
    const postDetails = () => {
        console.log(body, image)
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "shubh1234")
        fetch("https://api.cloudinary.com/v1_1/shubh1234/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            // .then(data => console.log(data.url))
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))




    }

    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
    }

    return (
        <div className='createPost'>
            <div className="post-header">
                {/* header */}
                <h4 style={{ margin: "3px auto" }}>Create new post</h4>
                <button id='post-btn' onClick={() => { postDetails() }}> Share</button>
            </div>

            {/* imagde-preview */}
            <div className="main-div">
                <img id='output' src='https://cdn-icons-png.flaticon.com/512/1160/1160358.png' />
                <input type="file" accept='image/*'
                    onChange={(event) => {
                        loadfile(event);
                        setImage(event.target.files[0])
                    }} />
            </div>

            {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img style={{width : "20%", borderBottom : "1px solid #fff"}} src={logo} alt="" />
                    </div>
                    {/* <h5>Shubh</h5> */}
                </div>
                <textarea value={body} onChange={(e) => {
                    setBody(e.target.value)
                }} name="text" placeholder='Write a caption'></textarea>
            </div>
        </div>
    )
}
