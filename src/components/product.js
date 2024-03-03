import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Row, Col, Button, ConfigProvider, Result, notification } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons'; /* can cause memory overflow in codio */
import errorLoading from '../images/error-loading.png';


function Product() {
    let { id } = useParams();
    const [refetchTrigger, setRefetchTrigger] = useState(false); //  State to trigger the re-fetch
    const [api, contextHolder] = notification.useNotification();
    const [product, setProduct] = useState(null);
    const [productImage, setProductImage] = useState(null);

    useEffect(() => {
        // fetch product data
        fetch(`http://localhost:3030/api/v1/products/${id}`)
            .then(response => {
                if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                    return response.json()
                        .then(err => {
                            throw new Error(err.error || 'Something went wrong');
                        });
                }
                return response.json(); // If the response is OK, proceed.
            })
            .then(data => { // successful response
                setProduct(data);
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
            });

        // fetch product image
        fetch(`http://localhost:3030/api/v1/products/${id}/image`)
            .then(response => {
                if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                    if (response.status === 404) {
                        return;
                    }
                    return response
                        .then(err => {
                            throw new Error(err.error || 'Something went wrong');
                        });
                }
                return response; // If the response is OK, proceed.
            })
            .then(data => {
                return data.blob(); // Convert to Blob
            })
            .then(imageBlob => {
                // Create a URL representing the Blob
                const imageObjectURL = URL.createObjectURL(imageBlob);  
                setProductImage(imageObjectURL); 
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
            });
    }, [refetchTrigger, id, api]);

    if (!product) {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minWidth: '800px'}}>
            {contextHolder}
            <div className='product-container'>
                <div className='product-image-container'>
                    <Image alt="art work" src={productImage} fallback={errorLoading} className='product-image' />
                </div>

                <Row className='product-info-container'>
                    <Col span={12}>
                        <h1><i>{product.name}</i></h1>
                        <p>{product.creator}</p>
                    </Col>
                    
                    <Col span={12} align="right">
                        {/* only show price and option to buy if not sold */}
                        {product.sold === 0 ? (
                            <ConfigProvider theme={{components: {Button: {defaultHoverBorderColor: '#06b800', defaultHoverColor: '#06b800'}}}}>
                                <h2>£{product.price}</h2>
                                <Button className='purchase-button'>Purchase</Button>
                            </ConfigProvider>
                        ) : (
                            <div>
                                <span style={{ paddingRight: '10px' }}>sold</span>
                                <span><CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '16px' }} /></span>
                            </div>
                        )}
                    </Col>
                </Row>

                <Row className='product-description-container'>
                    <p>{product.description}</p>
                </Row>
            </div>
        </div>
    );
}
export default Product;

/*

<Col span={12} align="right">
                        <h2>£{product.price}</h2>
                        {Status}
                        <ConfigProvider theme={{components: {Button: {defaultHoverBorderColor: '#06b800', defaultHoverColor: '#06b800'}}}}>
                            {product.sold !== 1 && <Button className='purchase-button'>Purchase</Button>}
                        </ConfigProvider>
                    </Col>
                    */