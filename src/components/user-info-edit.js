import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space, notification, Select } from 'antd';

/* 
generate a modal to edit user information, used in user.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const UserInfoEdit = (props) => {
    const { user, onChange } = props;
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        document.querySelector('form').reset(); // reset/clear the form
        setOpen(false);
    };

    // gets the values from the form and puts them to the database
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/users/${user.id}`, {
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
            document.querySelector('form').reset(); // clear the form so password is not remembered
            setOpen(false);
        } 
        catch (error) {
            console.error(error);
            api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
        }
    };


    return (
        <>
            {contextHolder}
            <Button onClick={showModal}>
                Edit
            </Button>

            <Modal title="Edit User Information" okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
				<Form variant='filled' initialValues={user} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please choose a role' }]}
                    >
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Username is required' },
                            { max: 18, message: 'keep between 4 and 19 characters' },
                            { pattern: /^[a-zA-Z0-9_*]+$/, message: 'invalid character' }]}
                    >
                        <Input placeholder='Username' />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="First Name"
                        name="first_name"
                        rules={[
                            { required: true, message: 'First Name is required' },
                            { pattern: /^[a-zA-Z]+$/, message: 'Only one word allowed' }]}
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Last Name"
                        name="last_name"
                        rules={[
                            { required: true, message: 'Last Name is required'},
                            { pattern: /^[a-zA-Z]+$/, message: 'Only one word allowed' }]}
                    >
                        <Input placeholder='Last Name' />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Email is required' },
                            { type: 'email', message: 'Invalid email format' }
                        ]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Update Password"
                        name="password"
                        rules={[
                            { min: 7, message: 'Password must be at least 7 characters long' }
                        ]}
                    >
                        <Input.Password placeholder='Password' autoComplete='new-password' />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Phone Number"
                        name="phone_number"
                        rules={[
                            { required: true, message: 'Phone Number is required' },
                            {/* regex from https://regexlib.com */ },
                            { pattern: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, message: 'Invalid phone number format' }]}
                    >
                        <Input placeholder='Phone Number' />
                    </Form.Item>

                    <Form.Item style={{display: 'flex', justifyContent: 'end', margin: '0', padding: '0'}}>
                        <Space size={'large'}>
                            <Button danger onClick={handleCancel}>Cancel</Button>
                            <Button style={{backgroundColor: 'black', color: 'white'}} htmlType="submit">Submit</Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal >
        </>
    );
};

export default UserInfoEdit;