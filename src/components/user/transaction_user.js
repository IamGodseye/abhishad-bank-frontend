import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API } from '../../api'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Table, Tag, Space } from 'antd';
import { toast } from 'react-toastify'
const { Column } = Table;

function Transaction_user() {
    const { user, setUser } = useContext(UserContext)
    const [txn, setTxn] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!loading) fetchTransactions()


    }, [txn])

    let navigate = useNavigate()
    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const token = JSON.parse(window.localStorage.getItem('token'))
            const { data } = await axios.get(`${API}/current-transactions`, {
                headers: {
                    'Authorization': token
                }
            });

            const txns = data.transactions
            console.log(txns)
            for (let i = 0; i < txns.length; i++) {

                const type = txns[i].doneBy.role.includes('Admin') ? 'Admin' : 'User'
                txns[i] = { doneBy: txns[i].doneBy.accountNumber, fromUser: txns[i].fromUser.accountNumber, toUser: txns[i].toUser.accountNumber, amount: txns[i].amount, key: i + 1, type, txnType: user.accountNumber === txns[i].fromUser.accountNumber ? 'Debit' : 'Credit' }
                console.log(txns[i])
            }
            // txns += txns
            console.log(txns)
            setTxn(txns)
            toast.success(data.message)
            // setLoading(false)
        }
        catch (error) {
            setLoading(false)
            toast.error(error.message)
            // navigate('/')
        }
    }
    return (
        <div>
            <h3 style={{ fontWeight: 'bolder' }}>Transactions:</h3>
            <div className=' d-flex justify-content-center align-items-center' >

                <Table dataSource={txn} style={{ overflowX: 'auto' }}>
                    <Column title="No." dataIndex="key" key="key" />

                    {/* <Column title="Type" dataIndex="type" key="type" /> */}
                    <Column
                        title="Done By"
                        dataIndex="type"
                        key="type"
                        render={(type) => (
                            <>
                                {
                                    <Tag color={type === 'Admin' ? "purple" : 'blue'} key={type}>
                                        {type}
                                    </Tag>
                                }
                            </>
                        )
                        }
                    />
                    < Column
                        title="Transaction Type"
                        dataIndex="txnType"
                        key="txnType"
                        render={(txnType) => (
                            <>
                                {
                                    <Tag color={txnType === 'Debit' ? "red" : "green"} key={txnType}>
                                        {txnType}
                                    </Tag>
                                }
                            </>
                        )}
                    />
                    < Column title="Action taken By" dataIndex="doneBy" key="doneBy" />
                    <Column title="From (account number)" dataIndex="fromUser" key="fromUser" />
                    <Column title="To (account number)" dataIndex="toUser" key="toUser" />
                    <Column title="Amount" dataIndex="amount" key="amount" />
                </Table >
            </div >
        </div>
    )
}

export default Transaction_user