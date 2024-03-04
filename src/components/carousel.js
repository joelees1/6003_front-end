import React from 'react';
import { Col, Image, Row, notification } from 'antd';
import errorLoading from '../images/error-loading.png';
import { Link } from 'react-router-dom';

// maps three random items to a carousel item
const CarouselItems = ({item, index}) => {
    const [api, contextHolder] = notification.useNotification();
    const [productImage, setProductImage] = React.useState(null);

    // fetch product image inside a useEffect hook
    // adding the item.id as a dependency to the useEffect hook to prevent infinite loop
    React.useEffect(() => {
        fetch(`http://localhost:3030/api/v1/products/${item.id}/image`)
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
                return response.blob(); // If the response is OK, proceed.
            })
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setProductImage(imageObjectURL);
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
            });
    } , [item.id, api]);


    return (
        <>
            {contextHolder}
            <Row type='flex' key={index} className='featured-row'>
                <Col span={8} className='featured-desc'>
                    <Link to={`/products/${item.id}`}><h2 style={{paddingTop: '20px'}}><i>{item.name}</i></h2></Link>
                    <h3 style={{color: '#6b6b6b'}}>{item.creator}</h3>
                    
                    <p style={{paddingTop: '20px'}}>{item.description.length > 40 ? item.description.slice(0, 400) + '...' : item.description}</p>
                </Col>
                <Col span={16} className='featured-image-container'>
                    <div className='featured-image-container-box'>
                        <Image className='featured-image' src={productImage} alt={item.name} fallback={errorLoading}/>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default CarouselItems;