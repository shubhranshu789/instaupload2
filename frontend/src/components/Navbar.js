import React, { useContext } from 'react'
import logo from "../img/logo.png";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

export default function Navbar({ login }) {
    const { setModalOpen } = useContext(LoginContext);

    const loginStatus = () => {
        const token = localStorage.getItem("jwt")
        // console.log(token)
        if (login || token) {
            return [
                <>
                    <Link to='/profile'>
                        <li>Profile</li>
                    </Link>
                    <Link to="/createPost">
                        Create Post
                    </Link>

                    {/* <Link to="/followingpost" style={{ marginLeft: "20px" }}>  My Following </Link> */}

                    <Link to={""}>
                        <button className='primaryBtn' onClick={() => { setModalOpen(true) }}>Log Out</button>
                    </Link>

                </>
            ]
        } else {
            return [
                <>
                    <Link to='/signup'>
                        <li>SignUp</li>
                    </Link>
                    <Link to='/signin'>
                        <li>SignIn</li>
                    </Link>

                </>
            ]
        }
    }


    const loginStatusMobile = () => {
        const token = localStorage.getItem("jwt")
        // console.log(token)
        if (login || token) {
            return [
                <>
                    <Link to='/'>
                        <li><span class="material-symbols-outlined">
                            home
                        </span></li>
                    </Link>

                    <Link to='/profile'>
                        <li><span class="material-symbols-outlined">
                            account_circle
                        </span></li>
                    </Link>
                    <Link to="/createPost">
                        <li>
                            <span class="material-symbols-outlined">
                                post_add
                            </span>
                        </li>
                    </Link>
                    <Link to='/follow'>
                        <li>
                            <span class="material-symbols-outlined">
                                group_add
                            </span>
                        </li>
                    </Link>

                    <Link to='/news'>
                        <li>
                            <span class="material-symbols-outlined">
                                newspaper
                            </span>
                        </li>
                    </Link>

                    {/* <li>
                        <Link to="/followingpost" style={{ marginLeft: "20px" }}>
                            <span class="material-symbols-outlined">
                                diversity_4
                            </span>
                        </Link>
                    </li> */}

                    <Link to={""}>
                        <li className='primaryBtn' onClick={() => { setModalOpen(true) }}>
                            <span class="material-symbols-outlined">
                                logout
                            </span>
                        </li>
                    </Link>

                </>
            ]
        } 
    }

    // loginStatus();




    return (
        <div className='navbar'>
            <Link to='/' style={{cursor : "pointer"}}>
            <img className='insta-logo' id='insta-logo' src={logo} alt='' />
            </Link>
            <ul className='nav-menu'>
                {loginStatus()}
            </ul>
            <ul className='nav-mobile'>
                {loginStatusMobile()}
            </ul>
            
        </div>
    )
}
