import React from 'react';
import { Menu, Input } from 'antd';
import { Link } from "react-router-dom";

const { Search } = Input;

const navbar_items = [
    { key: "1", link: "/", label: "Home" },
    { key: "2", link: "/newproduct", label: "Add Product" },
    { key: "3", link: "/user", label: "User" },
    { key: "4", link: "/users", label: "Users" },
    { key: "5", link: "/orders", label: "Orders" },
    { key: "6", link: "/categories", label: "Categories" },
    { key: "7", link: "/login", label: "Login" },
    { key: "8", link: "/register", label: "Register" }
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Navbar = (props) => {
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
            
            <Search placeholder="Search works, artists" allowClear onSearch={onSearch} style={{ width: 250 }} />
        </>
    );
};

export default Navbar;