import React from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';
import UserContext from '../contexts/user';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;


function Login() {
    const [api, contextHolder] = notification.useNotification();
    const authContext = React.useContext(UserContext);
    const navigate = useNavigate();

    const onFinish = (values) => {

        const { username, password } = values;

        // Send a POST request to the server with the form data
		fetch('http://localhost:3030/api/v1/login', {
			method: "POST",
			headers: {
                "Authorization": "Bearer " + btoa(`${username}:${password}`)
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
		.then(user => { // successful response
            sessionStorage.setItem('token', user.token); // store the token in the session storage
            authContext.login({loggedIn: true, ...user});
            api.open({ message: 'Login Successful', description: `Welcome ${user.username}`, duration: 5, type: 'success' });
            // redirect to the home page
            navigate('/');
		})
		.catch(error => { // unsuccessful response, with error from server
			console.error(error);
			api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
		});
	};

    return (
        <div className='auth-layout-container'>
            {contextHolder}
            <Layout className='auth auth-page'>
                <Header className='auth auth-header'>
                    <h1 style={{ fontWeight: "bold" }}>Sign In</h1>
                </Header>

                <Content className='auth-form'>
                    <Form onFinish={onFinish} variant='filled' requiredMark={false}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input placeholder='username' autoComplete='username'/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Password is required' }]}
                        >
                            <Input.Password placeholder='password' autoComplete='current-password'/>
                        </Form.Item>

                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }} className='form-item'>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'black' }}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                
                <Footer className='auth auth-footer'>
                    Don't have an account? <a href="/register">Sign up</a>
                </Footer>
            </Layout>
        </div>
    );
}

export default Login;
