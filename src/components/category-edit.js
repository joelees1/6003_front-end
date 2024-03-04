import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';

/* 
generate a modal to edit category information, used in categories.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const CategoryEdit = (props) => {
    const { category, onChange } = props;
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification(); // notification hook

    const showModal = () => {
        setOpen(true);
    }

    // gets the values from the form and puts them to the database
    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:3030/api/v1/categories/${category.id}`, {
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

            <Modal title={`Edit Category ${category.id}`} okText="Submit" open={open} onOk={handleSubmit} onCancel={handleCancel} footer={[]}>
                <Form variant='filled' initialValues={category} onFinish={handleSubmit}>

                    <Form.Item
                        hasFeedback
                        label="Category Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the category name' },
                        { max: 250, message: 'Category name must be at most 250 characters' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Category Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the category description' },
                        { max: 250, message: 'Category description must be at most 250 characters' }]}
                    >
                        <TextArea />
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

export default CategoryEdit;