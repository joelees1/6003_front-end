import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space, notification, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

/* 
generate a modal to edit product information, used in product.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const ProductEdit = (props) => {
    const { product, onChange } = props;
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification(); // notification hook

    const showModal = () => {
        setOpen(true);
    }

    // gets the values from the form and puts them to the database
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/products/${product.id}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            onChange(); // refresh the table
            api.open({ message: 'Success', description: 'Product updated successfully', duration: 5, type: 'success' });
            setOpen(false);
        }
        catch (error) {
            console.error(error);
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
        }
    };

    const handleCancel = () => {
        document.querySelector('form').reset();
        setOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>
                Edit
            </Button>

            <Modal title={`Edit Product ${product.id}`} okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
                <Form variant='filled' initialValues={product} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the product name' },
                        { max: 250, message: 'Product name must be at most 250 characters' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Product Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the product description' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Creator"
                        name="creator"
                        rules={[{ required: true, message: 'Please input the product creator' },
                        { max: 250, message: 'Product creator must be at most 250 characters' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Product Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the product price' },
                        { type: 'number', message: 'Price must be a number' }]}
                    >
                        <InputNumber style={{width: '100%'}} />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Sold"
                        name="sold"
                        rules={[{ required: true, message: 'Please input sold status' }]}
                    >
                        <Select>
                            <Select.Option value={0}>Not Sold</Select.Option>
                            <Select.Option value={1}>Sold</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Category Id"
                        name="category_id"
                        rules={[{ required: true, message: 'Please input the category id' },
                        { type: 'number', message: 'Category id must be a number' }]}
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item style={{ display: 'flex', justifyContent: 'end', margin: '0', padding: '0' }}>
                        <Space size={'large'}>
                        <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={handleCancel}>Cancel</Button>
                            <Button danger htmlType="submit">Submit</Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal >
        </>
    );
};

export default ProductEdit;