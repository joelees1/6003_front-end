import React from 'react';
import { Card, Col, Image, Row } from 'antd';
import errorLoading from '../images/error-loading.png';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'; /* can cause memory overflow in codio */


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

const ArtCard = ({ id, name, description, creator, price, sold, category_id, image_url }) => {
    const Status = getIcon(sold);

    // returns a card with the art work's name, creator and status
    return (
        <Card
            className="standard-card"
            cover={<Image alt="art work" src={image_url} fallback={errorLoading} className='card-cover'/>}
        >
            <Row style={{display: 'flex', alignItems: 'baseline'}}>
                <Col style={{width: '70%', display: 'flex'}}>
                    <h3><a href={`/products/${id}`} style={{ color: 'black' }}>{name}</a></h3>
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
