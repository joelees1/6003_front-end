import React, { useState } from 'react';
import { Button, Modal, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

/* 
generate a modal to edit category information, used in categories.js
this code uses structure adapted from antd documentation available at https://ant.design/components/modal/
*/

const CategoryEdit = (props) => {
    const { category, onChange } = props;
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    }

    // gets the values from the form and posts them to the database
    const handleSubmit = (values) => {

        const category_id = category.id;

        // send the id in the param rather than adding to the values
        console.log('Received values:', values);

        // put
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
                            <Button danger onClick={handleCancel}>Cancel</Button>
                            <Button style={{ backgroundColor: 'black', color: 'white' }} htmlType="submit">Submit</Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal >
        </>
    );
};

export default CategoryEdit;