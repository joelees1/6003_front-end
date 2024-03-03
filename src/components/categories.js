import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Table, Space, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import CategoryEdit from './category-edit';

/* 
 generates a table with the categories from the database
 the table allows for searching for specific categories by id, name, or description 

 search functionality inspired by code in the antd documentation available at:
 https://ant.design/components/table 
*/

function Categories() {
    const [data, setData] = useState([]); // Start with an empty array
    const [api, contextHolder] = notification.useNotification();
    const [refetchTrigger, setRefetchTrigger] = useState(false); //  State to trigger the re-fetch

    // getAll categories from the db
    useEffect(() => {
        fetch('http://localhost:3030/api/v1/categories')
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
            data.forEach(category => {
                category.created_at = category.created_at ? new Date(category.created_at).toLocaleString() : null;
                category.updated_at = category.updated_at ? new Date(category.updated_at).toLocaleString() : null;
            });
            setData(data);
        })
        .catch(error => { // unsuccessful response, with error from server
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
            console.error(error);
        });
    }, [refetchTrigger, api]);

    // delete a category from the db
    const handleDelete = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/categories/${categoryId}`, {
                method: "DELETE"
            });
    
            if (!response.ok) { 
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete category');
            }
    
            const updatedData = data.filter(category => category.id !== categoryId);
            setData(updatedData);
            api.open({ message: 'Category Deleted', description: `Category ${categoryId} has been deleted`, duration: 5, type: 'success' });

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
        handleSearch(confirm);
    };

    // handle order edit by re-fetching the orders
    const handleCategoryEdit = () => {
        api.open({ message: 'Category Updated', description: 'Category has been updated', duration: 5, type: 'success' });
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

    // table columns
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Category',
            dataIndex: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            ...getColumnSearchProps('description'),
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
                    <CategoryEdit category={record} onChange={handleCategoryEdit} />
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
export default Categories;
