import React from 'react';
import { Layout, Result } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContext from './contexts/user';

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
import Categories from './components/categories'; // categories page (getAllCategories)
import NewCategory from './components/newCategory'; // new category page (createCategory)
import Users from './components/users'; // users page (getAllUsers)
import User from './components/user'; // user page (getUserById)
import Orders from './components/orders'; // orders page (getAllOrders)

const { Header, Content, Footer } = Layout;

function NotFound() {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
		/>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: { loggedIn: false },
			token: localStorage.getItem('token') || null
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	login(user) {
		console.log("User is now being set on the context");
		user.loggedIn = true;
		this.setState({ user: user });
	}

	logout() {
		console.log("Removing user from the app context");
		// Remove the token from the session storage
		sessionStorage.removeItem('token');
		this.setState({ user: { loggedIn: false } });
	}

	render() {
		const context = {
			user: this.state.user,
			login: this.login,
			logout: this.logout
		  };
		  
		return (
			<UserContext.Provider value={context}>
				<Router>
					<Layout className='layout'>
						<Header className='header'>
							<Navbar />
						</Header>

						<Content style={{ padding: '0 50px' }}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/newproduct" element={<NewProduct />} />
								<Route path="/products/:id" element={<Product />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route path="/users/:id" element={<User />} />
								<Route path="/users" element={<Users />} />
								<Route path="/orders" element={<Orders />} />
								<Route path="/newcategory" element={<NewCategory />} />
								<Route path="/categories" element={<Categories />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</Content>

						<Footer className='Footer'>Coventry Art Gallery 2024 Created by Joseph Lees</Footer>
					</Layout>
				</Router>
			</UserContext.Provider>
		);
	}
}

export default App;
