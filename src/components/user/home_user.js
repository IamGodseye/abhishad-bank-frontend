import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
function Home_user() {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {

        fetchUser()
    }, [])


    let navigate = useNavigate()
    const fetchUser = async () => {
        try {
            const token = JSON.parse(window.localStorage.getItem('token'))
            const { data } = await axios.get(`${API}/current-user`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(data.user);
            setUser(data.user)
            if (!data.ok) throw Error('User not found')
        }
        catch (error) {
            navigate('/')
        }
    }
    return (
        <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>

            <div class="card">
                <div class="card-header">
                    User Detail
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        User Account Number: {user.accountNumber}
                        <br></br>
                        Balance: {user.balance}
                        {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                    </blockquote>
                </div>
            </div>

        </div >
    )
}

export default Home_user