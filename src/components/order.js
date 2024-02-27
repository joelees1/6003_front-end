import React from 'react';
import { useParams } from 'react-router-dom';


function Order(props) {
    let { id } = useParams();

    return (
        <>
            <h1>a single order id: {id}</h1>
        </>
    );
}
export default Order;
