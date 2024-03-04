import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';

const Navbar = () => {
    // Get the user and logout function from the UserContext
    const { user, logout } = React.useContext(UserContext);
    const currentUser = user.id;

    const logoutNavItems = [
        { key: "1", link: "/", label: "Home" },
        { key: "2", link: "/login", label: "Login" },
        { key: "3", link: "/register", label: "Register" }
    ];

    const userNavItems = [
        { key: "1", link: "/", label: "Home" },
        { key: "2", link: `/users/${currentUser}`, label: "My Account" },
        { key: "3", link: "/orders", label: "Orders" },
        { key: "4", link: "/", label: "Logout", onClick: logout}
    ];

    const adminNavItems = [
        { key: "1", link: "/", label: "Home" },
        { key: "2", link: "/newproduct", label: "Add Product" },
        { key: "3", link: `/users/${currentUser}`, label: "My Account" },
        { key: "4", link: "/users", label: "Users" },
        { key: "5", link: "/orders", label: "Orders" },
        { key: "6", link: "/categories", label: "Categories" },
        { key: "7", link: "/newcategory", label: "Add Category" },
        { key: "8", link: "/", label: "Logout", onClick: logout}
    ];

    // Filter the navbar items based on whether the user is logged in
    let filteredNavbarItems = [];
    if (user.loggedIn) {
        if (user.role === "admin") {
            filteredNavbarItems = adminNavItems;
        } else {
            filteredNavbarItems = userNavItems;
        }
    } else {
        filteredNavbarItems = logoutNavItems;
    }

    return (
        <>
            <h2 style={{ padding: "0 16px 0 0", fontWeight: "bold", display: 'flex', marginBottom: '0' }}>Coventry Art Gallery</h2>

            <Menu mode="horizontal" style={{ flex: 1, minWidth: 0, borderBottom: "0" }}>
                {filteredNavbarItems.map(item => (
                    <Menu.Item key={item.key} style={{ color: "#6b6b6b" }} onClick={item.onClick}>
                        <Link to={item.link}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};

export default Navbar;