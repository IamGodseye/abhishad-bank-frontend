import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { SyncOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

function Transfer_admin() {
    const { user, setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [send, setSend] = useState('')
    const [receive, setReceive] = useState('')
    const [amount, setAmount] = useState('')

    const handleCredit = async (e) => {
        e.preventDefault()
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            console.log(token)
            setLoading1(true)
            const { data } = await axios.post(`${API}/admin/credit`, {
                send,
                receive,
                amount
            }, {
                headers: {
                    'Authorization': token
                },
            });
            if (!data.ok) throw Error(data.message)
            toast.success(data.message)
            setLoading1(false)
        }
        catch (error) {
            console.log(error)
            var s = error.message || 'Something went wrong...Try again...';
            toast.error(` ${s}`);
            setLoading1(false);
        }
    }

    const handleDebit = async (e) => {
        e.preventDefault()
        try {

            const token = JSON.parse(localStorage.getItem('token'))
            console.log(token)
            setLoading(true)
            const { data } = await axios.post(`${API}/admin/debit`, {
                send,
                receive,
                amount
            }, {
                headers: {
                    'Authorization': token
                },
            });
            if (!data.ok) throw Error(data.message)
            toast.success(data.message)
            setLoading(false)
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
                >
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={send}
                        onChange={(e) => setSend(e.target.value)}
                        placeholder="Enter Sender's Account Number"
                        required
                    />

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
                    <div>
                        <button
                            type="submit"
                            className="btn mb-2 mt-2 btn-block btn-primary form-control width100 p-2 getting-started"
                            disabled={!receive || !amount || !send || loading || loading1}
                            style={{
                                backgroundColor: "#0066FF",
                                borderColor: "#2E47FF",
                                color: "white",
                            }}
                            onClick={handleCredit}
                        >
                            {loading1 ? <SyncOutlined spin /> : "Credit"}
                        </button>
                        <button
                            type="submit"
                            className="btn mb-2 mt-2 btn-block btn-primary form-control width100 p-2 getting-started"
                            disabled={!receive || !amount || !send || loading || loading1}
                            style={{
                                backgroundColor: "#0066FF",
                                borderColor: "#2E47FF",
                                color: "white",
                            }}
                            onClick={handleDebit}
                        >
                            {loading ? <SyncOutlined spin /> : "Debit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Transfer_admin