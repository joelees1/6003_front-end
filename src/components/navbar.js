import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const Navbar = (props) => {
    //const currentUser = getCurrentUserId(); // Replace getCurrentUserId() with the function that retrieves the current user's id
    const currentUser = 1; // Replace 1 with the current user's id

    const navbar_items = [
        { key: "1", link: "/", label: "Home" },
        { key: "2", link: "/newproduct", label: "Add Product" },
        { key: "3", link: `/users/${currentUser}`, label: "My Account" }, // Modify the link to include the current user's id
        { key: "4", link: "/users", label: "Users" },
        { key: "5", link: "/orders", label: "Orders" },
        { key: "6", link: "/categories", label: "Categories" },
        { key: "7", link: "/newcategory", label: "Add Category" },
        { key: "8", link: "/login", label: "Login" },
        { key: "9", link: "/register", label: "Register" }
    ];

    return (
        <>
            <h2 style={{ padding: "0 16px 0 0", fontWeight: "bold", display: 'flex', marginBottom: '0' }}>Coventry Art Gallery</h2>

            <Menu mode="horizontal" style={{ flex: 1, minWidth: 0, borderBottom: "0" }}>
                {navbar_items.map(item => (
                    <Menu.Item key={item.key} style={{ color: "#6b6b6b" }}>
                        <Link to={item.link}>{item.label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};

export default Navbar;