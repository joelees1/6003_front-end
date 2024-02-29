import React, { useRef } from 'react';
import { Button, Input, Table, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import OrderEdit from './order-edit';

/* 
 generates a table with the orders from the database
 the table allows for searching orders by id, product id, total price, user id, address id, or status

 search functionality inspired by code in the antd documentation available at:
 https://ant.design/components/table
*/

function Orders(props) {

    // sample order data
    let data = [
        {
            id: 1,
            product_id: 1,
            total_price: 100,
            user_id: 1,
            address_id: 1,
            status: 'pending',
            created_at: '2021-10-10',
            updated_at: '2021-10-10'
        },
        {
            id: 2,
            product_id: 2,
            total_price: 200,
            user_id: 2,
            address_id: 2,
            status: 'completed',
            created_at: '2021-10-10',
            updated_at: '2021-10-10'
        },
        {
            id: 3,
            product_id: 3,
            total_price: 300,
            user_id: 3,
            address_id: 3,
            status: 'pending',
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
        handleSearch(confirm); // resets the table
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
            title: 'Total Price',
            dataIndex: 'total_price',
            ...getColumnSearchProps('total_price'),
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
                    <OrderEdit order={record} onChange={(order) => {
                        console.log(order);
                    }} />
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

export default Orders;
