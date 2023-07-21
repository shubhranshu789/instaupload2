import React,{useState} from 'react'
import logo from "../img/logo.png";
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function SignUp() {

    // creating variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
     

    //Toast functions
    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    const postData = () => {
        //checking Email
        if(!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }


        //Sending data to server
        fetch("/signup" , {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name : name ,
                 email : email,
                 password : password,
                 userName : userName
            })
            //data goes to api
        }).then(res=>res.json())
        .then(data => {
            if(data.error){        // show any error on console if present
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate("/signin");
            }
            console.group(data)
        })
    }

    return (
        <div className='signUp'>
            <div className='form-container'>

                <div className='form'>
                    <img className='signUpLogo' src={logo} alt='' />
                    <p className='loginPara'>
                        Sign up to see photos
                    </p>
                    <div>
                        <input type='email' value={email} name='email'  placeholder='Email' 
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='text' value={name} name='name'  placeholder='Username' 
                        onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='text' value={userName} name='username'  placeholder='Full Name' 
                        onChange={(e)=>{setUserName(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='password' value={password} name='password' placeholder='Password' 
                        onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div>
                        <input type='submit' id='submit-btn' value="Sign Up"
                        onClick={() => {postData()}} />
                    </div>
                </div>

                <div className='form2'>
                    Already have an account ?
                    <Link to="/signin">
                        <span style={{ color: 'blue', cursor: "pointer" }}>Sign In</span>
                    </Link>
                </div>

           


            </div>
        </div>
    )
}
