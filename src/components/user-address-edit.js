import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';

/* 
generate a modal to edit address information, used in user.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const AddressInfoEdit = (props) => {
    const { address, onChange } = props;
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

            <Modal title="Edit address Information" okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
				<Form variant='filled' initialValues={address} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Address Line 1"
                        name="address_line1"
                        rules={[{required: true, message: 'Address is required'},
                                {min: 3, message: 'Address must be at least 3 characters long'}, {max: 100, message: 'Address must be at most 100 characters long'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Address Line 2"
                        name="address_line2"
                        rules={[{max: 100, message: 'Address must be at most 100 characters long'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="City"
                        name="city"
                        rules={[{required: true, message: 'City is required'},
                                {min: 2, message: 'City must be at least 2 characters long'}, 
                                {max: 50, message: 'City must be at most 50 characters long'}]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Postcode"
                        name="postcode"
                            rules={[{required: true, message: 'Postcode is required'}]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Country"
                        name="country"
                        rules={[{required: true, message: 'Country is required'},
                                {max: 50, message: 'Country must be at most 50 characters long'}]}
                    >
                        <Input />
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

export default AddressInfoEdit;