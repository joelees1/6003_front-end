import React from 'react';
import { useParams } from 'react-router-dom';

function Account(props) {
    let { id } = useParams();  
    return (
        <>
            <h1>Account ID: {id}</h1>
            <p>add address information + update functionality for user and address</p>
        </>
    );
}
export default Account;
