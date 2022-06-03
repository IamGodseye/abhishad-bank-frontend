import React, { useContext, useEffect } from 'react'
import AdminRoutes from '../components/adminRoutes'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import UserRoutes from '../components/userRoutes'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'
function User() {
    const { user, setUser } = useContext(UserContext)
    let navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (user === null) navigate('/')
    }, [])

    return (
        <div>
            <Navbar />
            {
                user.role.includes('Admin') ? < AdminRoutes /> : <UserRoutes />
            }
            <Footer />

        </div>
    )
}

export default User