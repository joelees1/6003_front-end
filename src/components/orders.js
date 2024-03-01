import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Table, Space, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import OrderEdit from './order-edit';

/* 
 generates a table with the orders from the database
 the table allows for searching orders by id, product id, total price, user id, address id, or status

 search functionality inspired by code in the antd documentation available at:
 https://ant.design/components/table
*/

function Orders() {
    const [data, setData] = useState([]); // Start with an empty array
    const [api, contextHolder] = notification.useNotification();
    const [refetchTrigger, setRefetchTrigger] = useState(false); //  State to trigger the re-fetch

    // getAll orders from the db
    useEffect(() => {
        fetch('http://localhost:3030/api/v1/orders')
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
            // format created_at and updated_at dates
            data.forEach(order => {
                order.created_at = order.created_at ? new Date(order.created_at).toLocaleString() : null;
                order.updated_at = order.updated_at ? new Date(order.updated_at).toLocaleString() : null;
            });
            setData(data);
        })
        .catch(error => { // unsuccessful response, with error from server
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
            console.error(error);
        });
    }, [refetchTrigger]);

    // delete an order from the db
    const handleDelete = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/orders/${orderId}`, {
                method: "DELETE"
            });
    
            if (!response.ok) { 
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete order');
            }
    
            const updatedData = data.filter(order => order.id !== orderId);
            setData(updatedData);
            api.open({ message: 'Order Deleted', description: `Order ${orderId} has been deleted`, duration: 5, type: 'success' });

        } catch (error) {
            console.error(error);
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
        }
    };

    // search functionality
    const searchInput = useRef(null); // search input
    const handleSearch = (confirm) => {
        confirm(); // close the search dropdown
    };

    // reset button resets the table
    const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
        clearFilters();
        handleSearch(confirm); // resets the table
    };

    // handle order edit by re-fetching the orders
    const handleOrderEdit = () => {
        api.open({ message: 'Order Updated', description: 'Order has been updated', duration: 5, type: 'success' });
        setRefetchTrigger(!refetchTrigger); // Toggle the state to trigger re-fetch
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

    // order table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            ...getColumnSearchProps('id'),
            render: (id) => <a href={`/orders/${id}`}>{id}</a>,
        },
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            ...getColumnSearchProps('product_id'),
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            ...getColumnSearchProps('user_id'),
        },
        {
            title: 'Address ID',
            dataIndex: 'address_id',
            ...getColumnSearchProps('address_id'),
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            ...getColumnSearchProps('total_price'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            ...getColumnSearchProps('status'),
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
                    <OrderEdit order={record} onChange={handleOrderEdit} />
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    // return table
    return (
        <div style={{padding: '0 50px'}}>
            {contextHolder}
            <Table dataSource={data} columns={columns} />;
        </div>
    );
}

export default Orders;
