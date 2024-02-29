import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';

/* 
generate a modal to edit user information, used in user.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const UserInfoEdit = (props) => {
    const { user, onChange } = props;
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    }

    const handleSubmit = (values) => {
        console.log('Received values:', values);
        // post, add id to param
        //onChange(values); // logs it again
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>
                Edit
            </Button>

            <Modal title="Edit User Information" okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
				<Form variant='filled' initialValues={user} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Role"
                        name="role"
                        rules={[
                            { required: true, message: 'Role is required' },
                            { pattern: /^(admin|user)$/, message: 'Role must be either admin or user' }
                        ]}
                    >
                        <Input />
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