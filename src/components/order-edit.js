import React, { useState } from 'react';
import { Button, Modal, Form, Space, Select, notification, InputNumber } from 'antd';

/* 
generate a modal to edit order information, used in order.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const OrderEdit = (props) => {
    const { order, onChange } = props;
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification(); // notification hook

    const showModal = () => {
        setOpen(true);
    }

    // gets the values from the form and puts them to the database
    const handleSubmit = async (values) => {
        //console.log('Received values:', values);
        try {
            const response = await fetch(`http://localhost:3030/api/v1/orders/${order.id}`, {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            onChange(); // refresh the table
            setOpen(false);
        } 
        catch (error) {
            console.error(error);
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>
                Edit
            </Button>

            <Modal title={`Edit Order ${order.id}`} okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
                <Form variant='filled' initialValues={order} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Product ID"
                        name="product_id"
                        type="number"
                        rules={[{ required: true, message: 'Please input a product id' },
                        { pattern: /^\d+$/, message: 'Product ID must be a whole number' }]}
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Total Price"
                        name="total_price"
                        type="number"
                        rules={[
                            { required: true, message: 'Please input a total price' },
                            { pattern: /^\d+(\.\d{1,2})?$/, message: 'Total Price must be a number with up to 2 decimal places' }
                        ]}
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please input a status' }]}
                    >
                        <Select>
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="shipped">Shipped</Select.Option>
                            <Select.Option value="delivered">Delivered</Select.Option>
                            <Select.Option value="cancelled">Cancelled</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Address ID"
                        name="address_id"
                        type="number"
                        rules={[{ required: true, message: 'Please input an address id' },
                        { pattern: /^\d+$/, message: 'Address ID must be a whole number' }]}
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

export default OrderEdit;