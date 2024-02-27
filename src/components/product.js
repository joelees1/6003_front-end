import React from 'react';
import { useParams } from 'react-router-dom';
import { Image, Row, Col, Button, ConfigProvider, Result } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons'; /* can cause memory overflow in codio */

import errorLoading from '../images/error-loading.png';


function Product(data) {
    let { id } = useParams();
    const product = data.artData.find(item => item.id === parseInt(id));

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
            <div className='product-container'>
                <div className='product-image-container'>
                    <Image alt="art work" src={product.image_url} fallback={errorLoading} className='product-image' />
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