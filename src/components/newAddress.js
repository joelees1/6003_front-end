import React, { useState } from 'react';
import { Button, Modal, Form, Space, notification, Input } from 'antd';

/* 
generate a modal to edit order information, used in order.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const NewAddress = (props) => {
    const { onChange, user_id } = props;
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification(); // notification hook

    const showModal = () => {
        setOpen(true);
    }

    // gets the values from the address form and puts them to the database
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/users/${user_id}/address`, {
                method: "POST",
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
            setOpen(false);
        } 
        catch (error) {
            console.error(error);
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
        }
    };

    const handleCancel = () => {
        document.querySelector('form').reset(); // clear the form
        setOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal}>Add Address</Button>

            <Modal title="New Address" okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
                <Form variant='filled' onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Address Line 1"
                        name="address_line1"
                        rules={[{required: true, message: 'Address is required'},
                                {min: 3, message: 'Address must be at least 3 characters long'}, 
                                {max: 100, message: 'Address must be at most 100 characters long'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Address Line 2"
                        name="address_line2"
                        rules={[{max: 100, message: 'Address must be at most 100 characters long'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="City"
                        name="city"
                        rules={[{required: true, message: 'City is required'},
                                {min: 2, message: 'City must be at least 2 characters long'}, 
                                {max: 50, message: 'City must be at most 50 characters long'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Postcode"
                        name="postcode"
                            rules={[{required: true, message: 'Postcode is required'}]}
                        >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Country"
                        name="country"
                        rules={[{required: true, message: 'Country is required'},
                                {min: 2, message: 'Country must be at least 2 characters long'}, 
                                {max: 50, message: 'Country must be at most 50 characters long'}]}
                    >
                        <Input/>
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

export default NewAddress;