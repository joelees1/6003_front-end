import React from 'react';
import { Form, Input, Button, Layout } from 'antd';


const { Header, Content, Footer } = Layout;

function Login() {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    return (
        <div className='auth-layout-container'>
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
                            <Input placeholder='username'/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Password is required' }]}
                        >
                            <Input.Password placeholder='password'/>
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
