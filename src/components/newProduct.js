import React from 'react';
import { Form, Input, Button, Layout, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function NewProduct() {
    const [api, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        console.log('New product details:', values);

        // Construct FormData object
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('creator', values.creator);
        formData.append('category_id', values.category_id);
        formData.append('price', values.price);
        formData.append('image_url', values.image_url.fileList[0].originFileObj);
        console.log('Form data:', formData);

        // Send a POST request to the server with the form data
		fetch('http://localhost:3030/api/v1/products', {
			method: "POST",
			body: formData
		})
		.then(response => {
			if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
				return response.json().then(err => {
					throw new Error(err.error || 'Something went wrong');
				});
			}
			return response.json(); // If the response is OK, proceed.
		})
		.then(data => { // successful response
			api.open({ message: 'Product Created', description: `Product has been created, redirecting...`, duration: 5, type: 'success' });
			document.querySelector('form').reset(); // clear the form

			// Redirect to the home page
			setTimeout(() => {
				window.location.href = '/';
			}, 1500);
		})
		.catch(error => { // unsuccessful response, with error from server
			console.error(error);
			api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
		});
    };


    return (
        <div className='auth-layout-container'>
            <Layout className='auth auth-page'>
                {contextHolder}
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
                            <Upload accept="image/png, image/jpeg" maxCount={1} beforeUpload={() => false}>
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
