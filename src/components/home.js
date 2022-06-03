import React, { useContext, useState, useEffect } from 'react'
import { API } from '../api';
import { UserContext } from '../UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home_user from './user/home_user';
import Transaction_user from './user/transaction_user';
import Transfer_user from './user/transfer_user';
function Home() {
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()
    const handleClick = () => {
        console.log(user)
        if (user === null) navigate('/login')
        else navigate('/user')
    }
    return (
        <div className='d-flex justify-content-center align-items-center p-2' style={{ minHeight: '80vh' }}>
            <div style={{ fontWeight: '700', fontSize: '2rem', textAlign: 'center' }}>
                Welcome to अभिषद्
                <br></br>
                Art of managing finance
                <br></br>
                🔥 the banking solution for genZ 🔥
                <br></br>
                <br></br>
                <img src="valut.svg" width={"50%"} className="p-2 m-2" />
                <br></br>
                <button className='btn btn-primary' onClick={handleClick}>Start Now</button>
            </div>

        </div>
    )
}

export default Home