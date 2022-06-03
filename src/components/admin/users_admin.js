import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { SyncOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
const { Column } = Table;

function Users_admin() {
    const { user, setUser } = useContext(UserContext)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (!loading && !loading1) fetchUsers()
    }, [])

    let navigate = useNavigate()
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const token = JSON.parse(window.localStorage.getItem('token'))
            const { data } = await axios.get(`${API}/admin/total-users`, {
                headers: {
                    'Authorization': token
                }
            });

            if (!data.ok) throw Error(data.message)
            const totalUsers = data.users
            for (let i = 0; i < totalUsers.length; i++) {
                totalUsers[i] = { ...totalUsers[i], key: i + 1 }
            }
            console.log(totalUsers)

            setUsers(totalUsers)
            toast.success(data.message)
        }
        catch (error) {
            setLoading(false)
            // navigate('/')
            toast.error(error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading1(true)
            const { data } = await axios.post(`${API}/register`, { name, password });

            if (!data.ok) throw Error(data.message)
            console.log(data)
            setLoading1(false)
            toast.success(data.message)
            setName('')
            setPassword('')
            fetchUsers()
        }
        catch (error) {
            setLoading1(false)
            console.log(error)
            toast.error(error.message)
        }
    }
    return (
        <div>
            <div className='m-2 p-2'>
                <h3 style={{ fontWeight: 'bolder' }}>Users:</h3>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Create User
                </button>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Create New User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    className="form-control mb-4 p-4"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Name"
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control mb-4 p-4"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    placeholder="Enter Password"
                                    required
                                />

                                <button
                                    type="submit"
                                    className="btn btn-block btn-primary form-control width100 p-2 getting-started"
                                    disabled={!name || !password || loading1}
                                    style={{
                                        backgroundColor: "#0066FF",
                                        borderColor: "#2E47FF",
                                        color: "white",
                                    }}
                                    data-bs-dismiss="modal"
                                >
                                    {loading1 ? <SyncOutlined spin /> : "Create User"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' d-flex justify-content-center align-items-center' >

                <Table dataSource={users} style={{ overflowX: 'auto' }}>
                    <Column title="No." dataIndex="key" key="key" />

                    {/* <Column title="Type" dataIndex="type" key="type" /> */}
                    <Column
                        title="Type"
                        dataIndex="role"
                        key="role"
                        render={(role) => (
                            <>
                                {
                                    <Tag color={role.includes('Admin') ? "purple" : 'blue'} key={role}>
                                        {role.includes('Admin') ? 'Admin' : 'User'}
                                    </Tag>
                                }
                            </>
                        )
                        }
                    />
                    < Column title="Name" dataIndex="name" key="name" />
                    <Column title="Account Number" dataIndex="accountNumber" key="accountNumber" />
                    <Column title="Balance" dataIndex="balance" key="balance" />

                </Table >
            </div >
        </div>
    )
}

export default Users_admin