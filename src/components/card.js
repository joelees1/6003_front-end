import React from 'react';
import { Card, Col, Image, Row } from 'antd';
import errorLoading from '../images/error-loading.png';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'; /* can cause memory overflow in codio */
import { Link } from 'react-router-dom';


// Function to get the status icon based on the sold status
function getIcon(sold) {
    const status = // status text
        sold === 0 ? 'Available' :
        sold === 1 ? 'Sold' : 
        'Status: Unknown';

    const icon = // status icon
        sold === 0 ? <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '16px' }} /> : 
        sold === 1 ? <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '16px' }} /> : 
        null;

    return (
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
            <div style={{ marginRight: '5px' }}>{status}</div>
            {icon}
        </div>
    );
}

const ArtCard = ({ id, name, creator, sold }) => {
    const Status = getIcon(sold);

    const [productImage, setProductImage] = React.useState(null);

    // fetch product image inside a useEffect hook
    // adding the id as a dependency to the useEffect hook to prevent infinite loop
    React.useEffect(() => {
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
                return response.blob(); // If the response is OK, proceed.
            })
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setProductImage(imageObjectURL);
            })
            .catch(error => { // unsuccessful response
                console.error(error);
            });
    } , [id]);

    // returns a card with the art work's name, creator and status
    return (
        <Card
            className="standard-card"
            cover={<Image alt="art work" src={productImage} fallback={errorLoading} className='card-cover'/>}
        >
            <Row style={{display: 'flex', alignItems: 'baseline'}}>
                <Col style={{width: '70%', display: 'flex'}}>
                    <h3><Link to={`/products/${id}`}>{name}</Link></h3>
                </Col>

                <Col style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    {Status}
                </Col>
            </Row>
            <Row>
                <h4 style={{color: 'grey'}}>{creator}</h4>
            </Row>
        </Card>
    );
};

export default ArtCard;
