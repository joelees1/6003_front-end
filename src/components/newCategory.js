import React from 'react';
import { Form, Input, Button, Layout, notification, Result } from 'antd';
import UserContext from '../contexts/user';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

function NewCategory() {
    const { user } = React.useContext(UserContext);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

	const onFinish = (values) => {
		// Send a POST request to the server with the form data
		fetch('http://localhost:3030/api/v1/categories', {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
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
            navigate('/categories'); // redirect to the categories page
		})
		.catch(error => { // unsuccessful response, with error from server
			console.error(error);
			api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
		});
	};

    return (
        <>
            {contextHolder}
            {user.role === "admin" ? (
                <div className='auth-layout-container'>
                    <Layout className='auth auth-page'>
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
            ) : (
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                />
            )}
        </>
    );
}

export default NewCategory;
