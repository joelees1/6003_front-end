import React, { useState } from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';

const { Header, Content } = Layout;

function Register() {
    const [api, contextHolder] = notification.useNotification();

	const onFinish = (values) => {

		const { confirm, ...data } = values;  // ignore the 'confirm' value

		// Send a POST request to the server with the form data
		fetch('http://localhost:3030/api/v1/users', {
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
			api.open({ message: 'User Created', description: `User has been created`, duration: 5, type: 'success' });
			document.querySelector('form').reset(); // clear the form

			// Redirect to the login page
			setTimeout(() => {
				window.location.href = '/login';
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
					<h1 style={{ fontWeight: "bold" }}>Register</h1>
				</Header>

				<Content className='auth-form'>
					<Form onFinish={onFinish} variant='filled'>

						<Form.Item
							hasFeedback 
							label="Username"
							name="username"
                            rules = {[
								{ required: true, message: 'username is required' },
								{ max: 18, message: 'keep between 4 and 19 characters' },
								{ pattern: /^[a-zA-Z0-9_*]+$/, message: 'invalid character' }]}
						>
							<Input placeholder='Username'/>
						</Form.Item>

						<Form.Item
							hasFeedback
							label="First Name"
							name="first_name"
							rules={[
								{ required: true, message: 'First Name is required' },
								{ pattern: /^[a-zA-Z]+$/, message: 'Only one word allowed' }]}
						>
							<Input placeholder='First Name'/>
						</Form.Item>

						<Form.Item
							hasFeedback
							label="Last Name"
							name="last_name"
							rules={[
								{ required: true, message: 'Last Name is required' },
								{ pattern: /^[a-zA-Z]+$/, message: 'Only one word allowed' }]}
						>
							<Input placeholder='Last Name'/>
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
							label="Password"
							name="password"
							rules={[
								{ required: true, message: 'Password is required' },
								{ min: 7, message: 'Password must be at least 7 characters long' }
							]}
						>
							<Input.Password placeholder='Password' autoComplete='new-password'/>
						</Form.Item>

						<Form.Item
							hasFeedback
							label="Phone Number"
							name="phone_number"
							rules={[
								{ required: true, message: 'Phone Number is required' },
								{/* regex from https://regexlib.com */},
								{ pattern: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/, message: 'Invalid phone number format' }]}
						>
							<Input placeholder='Phone Number' />
						</Form.Item>

						<Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
							<Button type="primary" htmlType="submit" style={{ backgroundColor: 'black' }}>
								Register
							</Button>
						</Form.Item>
						
					</Form>
				</Content>
			</Layout>
		</div>
	);
}

export default Register;
