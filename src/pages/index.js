import React, { useContext } from 'react'
import Footer from '../components/footer'
import Home from '../components/home'
import Navbar from '../components/navbar'
import { UserContext } from '../UserContext'

function Index() {
    const { user, setUser } = useContext(UserContext)

    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    )
}

export default Index