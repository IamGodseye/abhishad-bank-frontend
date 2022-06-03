import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Home_admin() {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [totalUser, setTotalUser] = useState('')
    const [totalTransaction, setTotalTransaction] = useState('')
    const [totalTransactionAmount, setTotalTransactionAmount] = useState('')
    useEffect(() => {
        if (!loading) fetchData()
    }, [])

    let navigate = useNavigate()
    const fetchData = async () => {
        try {
            setLoading(true)
            const token = JSON.parse(window.localStorage.getItem('token'))
            const { data } = await axios.get(`${API}/admin/total-data`, {
                headers: {
                    'Authorization': token
                }
            });

            if (!data.ok) throw Error(data.message)
            setTotalUser(data.totalUsers)
            setTotalTransaction(data.totalTransaction)
            setTotalTransactionAmount(data.totalTransactionAmount)
            console.log(data)

        }
        catch (error) {
            setLoading(false)
            navigate('/')
        }
    }
    return (
        <div className=' d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>

            <div class="card">
                <div class="card-header">
                    Bank Detail
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        Total Users: {totalUser}
                        <br></br>
                        Total Transaction: {totalTransaction}
                        <br></br>
                        Total Transaction Amount: {totalTransactionAmount}
                        {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                    </blockquote>
                </div>
            </div>

        </div >
    )
}

export default Home_admin