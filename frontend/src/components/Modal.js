import React from 'react'
import './Modal.css'
import { RiCloseLine } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

export default function Modal({ setModalOpen }) {

    const navigate = useNavigate();

    return (
        <div className="darkBg" onClick={() => setModalOpen(false)}>
            <div className="centered">
                <div className='modal'>
                    <div className="modalHeader">
                        {/* modal header */}
                        <h5 className='heading'>Confirm</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setModalOpen(false)}>
                        <RiCloseLine></RiCloseLine>
                    </button>

                    {/* modal content  */}
                    <div className="moadlContent" style={{color : "black"}}>
                        Are you really want to Logout?
                    </div>
                    <div className="modalAction">
                        <div className="actionContainer">
                            <button className='logOutBtn' onClick={() => {
                                setModalOpen(false);
                                localStorage.clear()
                                navigate("./signin")
                            }}>Log Out</button>
                            <button className='cancelBtn' onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
