import React from 'react';
import { Layout, Result } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './styles/App.css';
import './styles/home.css';
import './styles/login_register.css';
import './styles/product.css';

import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';

import Home from './components/home'; // home page (getAllProducts)
import Product from './components/product'; // product page (getProductById)
import NewProduct from './components/newProduct'; // new product page (createProduct)
import Categories from './components/categories';
import Users from './components/users'; // users page (getAllUsers)
import User from './components/user'; // user page (getUserById)
import Orders from './components/orders'; // orders page (getAllOrders)
import Order from './components/order';	// order page (getOrderById)

import image1 from './images/art1.png';
import image2 from './images/art2.png';
import image3 from './images/art3.png';
import image4 from './images/art4.png';
import image5 from './images/art5.png';
import image6 from './images/art6.png';


const { Header, Content, Footer } = Layout;

const artData = [
	{id: 1, name: 'art 1', description: 'description 1', creator: 'creator 1', price: 100, sold: 0, image_url: image1, category_id: 1},
	{id: 2, name: 'art 2', description: 'description 2', creator: 'creator 2', price: 200, sold: 1, image_url: image2, category_id: 1},
	{id: 3, name: 'art 3', description: 'description 3', creator: 'creator 3', price: 300, sold: 0, image_url: image3, category_id: 1},
	{id: 4, name: 'art 4', description: 'description 4', creator: 'creator 4', price: 400, sold: 1, image_url: image4, category_id: 1},
	{id: 5, name: 'Color blinds study #22', 
	description: 'Color Blinds Study is a series of moving pieces, exploring the sensation of light moving through a striped material. As a child, I loved the patterns you would see through venetian blinds, and this project is based loosely on that sense of wonder – how materials can abstract and transform light. The work explores color, light, sunsets, gradients and graphical forms. With these moving works, I’m particularly interested in transformation and memory, how simple elements change and new combinations emerge based on what you’ve just seen, and the kind of electrical, kinetic energy that can come from change.',
	creator: 'Zach Lieberman', price: 500, sold: 0, image_url: image5, category_id: 1},
	{id: 6, name: 'art 6', description: 'description 6', creator: 'creator 6', price: 600, sold: 1, image_url: image6, category_id: 1},
	{id: 7, name: 'art 7', description: 'description 7', creator: 'creator 7', price: 700, sold: 0, image_url: image2, category_id: 1},
	{id: 8, name: 'art 8', description: 'description 8', creator: 'creator 8', price: 800, sold: 1, image_url: image3, category_id: 2},
	{id: 9, name: 'art 9', description: 'description 9', creator: 'creator 9', price: 900, sold: 0, image_url: image4, category_id: 2},
	{id: 10, name: 'art 10', description: 'description 10', creator: 'creator 10', price: 1000, sold: 1, image_url: image5, category_id: 2},
	{id: 11, name: 'art 11', description: 'description 11', creator: 'creator 11', price: 1100, sold: 0, image_url: image6, category_id: 2},
	{id: 12, name: 'art 12', description: 'description 12', creator: 'creator 12', price: 1200, sold: 1, image_url: image2, category_id: 2},
	{id: 13, name: 'art 13', description: 'description 13', creator: 'creator 13', price: 1300, sold: 0, image_url: image3, category_id: 2},
];

function NotFound() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
		/>
	);
}

function App() {

	return (
		<Router>
			<Layout className='layout'>
				<Header className='header'>
					<Navbar />
				</Header>

				<Content style={{ padding: '0 50px' }}>
					<Routes>
						<Route path="/" element={<Home artData={artData} />} />
						<Route path="/newproduct" element={<NewProduct />} />
						<Route path="/products/:id" element={<Product artData={artData}/>} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/users/:id" element={<User />} />
						<Route path="/users" element={<Users />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/orders/:id" element={<Order />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Content>

				<Footer className='Footer'>Coventry Art Gallery 2024 Created by Joseph Lees</Footer>
			</Layout>
		</Router>
	);
}

export default App;
