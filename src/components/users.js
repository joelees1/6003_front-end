import React, { useRef, useState } from 'react';
import { Button, Input, Table, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/* 
 generates a table with the users of the website
 the table allows for searching orders by id, product id, total price, user id, address id, or status

 search functionality inspired by code in the antd documentation available at:
 https://ant.design/components/table
*/

function Users (props) {

    // sample user data
    let data = [
        {
            id: 1,
            username: 'admin',
            role: 'admin',
            first_name: 'Admin',
            last_name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin',
            phone_number: '123456789', 
            created_at: '2021-10-10',
            updated_at: '2021-10-10'
        },
        {
            id: 2,
            username: 'user',
            role: 'user',
            first_name: 'User',
            last_name: 'User',
            email: 'user@gmail.com',
            password: 'user',
            phone_number: '987654321',
            created_at: '2021-10-10',
            updated_at: '2021-10-10'
        }
    ]

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
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    // return table
    return (
        <div style={{padding: '0 50px'}}>
            <Table dataSource={data} columns={columns} />;
        </div>
    );
}

export default Users;
