import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../UserContext'
import { API } from '../api';

function Navbar() {
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()
    const handleLogout = async (e) => {
        try {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("token")
            setUser(null)

            toast.success('Logout successful');

            navigate('/');
        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
        }
    }
    return (
        <div >
            <nav class="navbar navbar-expand-lg navbar-dark" style={{ background: '#333232' }}>
                <div class="container-fluid p-2">
                    <a class="navbar-brand d-flex justify-content-center align-items-center" href="/">
                        {/* <img src="salt-logo.png" alt="" style={{ height: '10vh' }} class="d-inline-block align-text-top p-2" /> */}
                        <h3 style={{ color: 'white' }}> अभिषद् - 💰</h3>
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon" style={{ color: 'white' }}></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <div class="me-auto navbar-nav"></div>
                        <div class="navbar-nav">
                            {user ? (
                                <>
                                    < button class="nav-link btn btn-primary" onClick={handleLogout} style={{ color: 'white' }}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <button class="nav-link btn btn-primary m-2" onClick={() => navigate('/signup')} style={{ color: 'white' }}>Signup</button>
                                    <button class="btn btn-primary nav-link m-2" onClick={() => navigate('/login')} style={{ color: 'white' }}>Login</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar