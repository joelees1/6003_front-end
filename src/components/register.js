import React from 'react';
import { Form, Input, Button, Layout } from 'antd';

const { Header, Content } = Layout;

function Register() {
	const onFinish = (values) => {
		console.log('Received values:', values);
	};

	return (
		<div className='auth-layout-container'>
			<Layout className='auth auth-page'>
				<Header className='auth auth-header'>
					<h1 style={{ fontWeight: "bold" }}>Register</h1>
				</Header>

				<Content className='auth-form'>
					<Form onFinish={onFinish} variant='filled'>

						{/* add username validation */}
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
