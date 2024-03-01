import React, { useState } from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function NewCategory() {
    const [api, contextHolder] = notification.useNotification();

	const onFinish = (values) => {
        console.log('New Category details:', values);

		const { confirm, ...data } = values;

		// Send a POST request to the server with the form data
		fetch('http://localhost:3030/api/v1/categories', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
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
			api.open({ message: 'Category Created', description: `Category has been created, redirecting...`, duration: 5, type: 'success' });
			document.querySelector('form').reset(); // clear the form

			// Redirect to the login page
			setTimeout(() => {
				window.location.href = '/categories';
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
                    <h1 style={{ fontWeight: "bold" }}>New Category</h1>
                </Header>

                <Content className='auth-form'>
                    <Form onFinish={onFinish} variant='filled'>
                        <Form.Item
                            hasFeedback
                            label="Category Name"
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

export default NewCategory;
