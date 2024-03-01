import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Table, Space, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/*
 generates a table with the users of the website
 the table allows for searching orders by id, product id, total price, user id, address id, or status

 search functionality inspired by code in the antd documentation available at:
 https://ant.design/components/table
*/

function Users () {
    const [showAlertMessage, setShowAlertMessage] = useState('');
	const [showAlertType, setShowAlertType] = useState('');
    const [data, setData] = useState([]); // Start with an empty array

    // getAll the users from the db
    useEffect(() => {
        fetch('http://localhost:3030/api/v1/users')
        .then(response => {
            if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                return response.json()
                    .then(err => {
                        throw new Error(err.error || 'Something went wrong');
                    });
            }
            return response.json(); // If the response is OK, proceed.
        })
        .then(data => { // successful response
            setShowAlertMessage("Users loaded successfully");
            setShowAlertType('success');
            setData(data);
        })
        .catch(error => { // unsuccessful response, with error from server
            setShowAlertMessage(error.message);
            setShowAlertType('error');
            console.error(error);
        });
    }, []);

    // delete a user from the db
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/users/${userId}`, {
                method: "DELETE"
            });
    
            if (!response.ok) { 
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user');
            }
    
            const updatedData = data.filter(user => user.id !== userId);
            setData(updatedData);
            setShowAlertMessage('User deleted successfully');
            setShowAlertType('success');
    
        } catch (error) {
            console.error(error);
            setShowAlertMessage('An error occurred during deletion');
            setShowAlertType('error');
        }
    };

	const showAlert = (type, message) => {
		return ( <Alert message={message} type={type} showIcon closable style={{ marginBottom: '10px' }} /> );
	}

    const searchInput = useRef(null); // search input

    // search functionality
    const handleSearch = (confirm) => {
        confirm(); // close the search dropdown
    };

    // reset button resets the table
    const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
        clearFilters();
        handleSearch(confirm);
    };

    // search functionality for each column, generates the search field and buttons
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(confirm)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>

                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),

        // search icon
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),

        onFilter: (value, record) =>
            // finds a matching record based on lowercase search text
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) setTimeout(() => searchInput.current?.select(), 100);
        }
    });

    // user table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            ...getColumnSearchProps('id'),
            render: (id) => <a href={`/users/${id}`}>{id}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            ...getColumnSearchProps('username'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            ...getColumnSearchProps('role'),
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            ...getColumnSearchProps('last_name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            ...getColumnSearchProps('phone_number'),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleDelete(record.id)}>Delete</a>
                </Space>
            ),
        },
    ];

    // return table
    return (
        <div style={{padding: '0 50px'}}>
            {showAlertMessage && showAlert(showAlertType, showAlertMessage)}
            <Table dataSource={data} columns={columns} />;
        </div>
    );
}

export default Users;
