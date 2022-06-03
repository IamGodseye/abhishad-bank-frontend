import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { SyncOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

function Transfer_user() {
    const { user, setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    const [receive, setReceive] = useState('')
    const [amount, setAmount] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            console.log(token)
            const { data } = await axios.post(`${API}/transfer`, {
                receive,
                amount
            }, {
                headers: {
                    'Authorization': token
                },
            });
            toast.success(data.message)
            console.log(data);

        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading(false);
        }
    }
    return (
        <>
            <h1 className="text-center square mb-3 mt-3">Transfer Money</h1>

            <div className='col-md-10 offset-md-1 d-flex justify-content-center align-items-center'>

                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={receive}
                        onChange={(e) => setReceive(e.target.value)}
                        placeholder="Enter Receiver's Account Number"
                        required
                    />
                    <input
                        type="number"
                        className="form-control mb-4 p-4"
                        value={amount}
                        onChange={(e) => {
                            console.log(e.target.value)
                            console.log(e.target.value.toString())
                            setAmount(e.target.value.toString())
                        }}
                        placeholder="Enter Amount"
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-block btn-primary form-control width100 p-2 getting-started"
                        disabled={!receive || !amount || loading}
                        style={{
                            backgroundColor: "#0066FF",
                            borderColor: "#2E47FF",
                            color: "white",
                        }}
                    >
                        {loading ? <SyncOutlined spin /> : "Send Money"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Transfer_user