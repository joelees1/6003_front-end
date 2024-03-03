import React from 'react';
import { Form, Input, Button, Layout, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function NewProduct() {
    const onFinish = (values) => {
        console.log('New product details:', values);
        // Submit the new product details to the server
    };

    // image upload validation
    const props = {
        beforeUpload: (file) => {
            const isAllowed = file.type === 'image/png';
            if (!isAllowed) {
                message.error(`${file.name} is not a PNG file`, 5); // Display message for 5 seconds
            }
            return (isAllowed) || Upload.LIST_IGNORE;
        },

        onChange: (info) => {
            console.log(info.fileList);
        },
    };

    return (
        <div className='auth-layout-container'>
            <Layout className='auth auth-page'>
                <Header className='auth auth-header'>
                    <h1 style={{ fontWeight: "bold" }}>New Product</h1>
                </Header>

                <Content className='auth-form'>
                    <Form onFinish={onFinish} variant='filled'>
                        <Form.Item
                            hasFeedback
                            label="Product Name"
                            name="name"
                            rules={[{ required: true, message: 'Product name is required' }]}
                        >
                            <Input placeholder='Enter product name'/>
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Description is required' }]}
                        >
                            <Input.TextArea placeholder='Enter description'/>
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Creator"
                            name="creator"
                            rules={[{ required: true, message: 'Creator is required' }]}
                        >
                            <Input placeholder='Enter creator'/>
                        </Form.Item>

                        {/* add category_id validation */}
                        <Form.Item
                            hasFeedback
                            label="Category ID"
                            name="category_id"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Category ID is required' 
                                },
                                {
                                    pattern: /^\d+$/, 
                                    message: 'Category ID must be an integer'
                                }
                            ]}
                        >
                            <Input placeholder='Enter category ID' type='number'/>
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Image Upload"
                            name="image_url"
                            rules={[{ required: true, message: 'Image upload is required' }]}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Upload image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Price (£)"
                            name="price"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Price is required' 
                                },
                                {
                                    pattern: /^\d+(\.\d{1,2})?$/, 
                                    message: 'Price must only have 2 decimal places'
                                }
                            ]}
                        >
                            <Input placeholder='Enter price' type='number'/>
                        </Form.Item>

                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }} className='form-item'>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'black' }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </div>
    );
}

export default NewProduct;
