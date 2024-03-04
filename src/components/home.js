import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Pagination, Dropdown, Carousel, notification } from 'antd';
import { ControlOutlined } from '@ant-design/icons';

import ArtCard from '../components/card';
import CarouselItems from '../components/carousel';


function Home() {
    const [artData, setArtData] = useState(null);
    const [initialArtData, setInitialArtData] = useState();
    const [randomItems, setRandomItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArtLength, setTotalArtLength] = useState(10);
    const initialTotalArtLength = useRef();
    const [api, contextHolder] = notification.useNotification();

    // fetch the art data from the database
    useEffect(() => {
        fetch('http://localhost:3030/api/v1/products')
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
                setArtData(data);
                setInitialArtData(data);
                setTotalArtLength(data.length);
                initialTotalArtLength.current = data.length; // set the initial totalArtLength
                // get 3 random items from the artData array
                const randomItems = []; 
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    randomItems.push(data[randomIndex]);
                }
                setRandomItems(randomItems);
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
            });
    }, [api]);

    /* Filters */
    const filters = [
        {
            key: '1',
            label: 'Availability',
            children: [
                {
                    key: '1-1',
                    id: 1,
                    label: 'Available',
                },
                {
                    key: '1-2',
                    id: 2,
                    label: 'Sold',
                }
            ]
        },
        {
            key: '2',
            label: 'Categories',
            children: [
                {
                    key: '2-1',
                    id: 1,
                    label: 'Digital Art',
                },
                {
                    key: '2-2',
                    id: 2,
                    label: 'Traditional Art',
                }
            ]
        }
    ];

    const handleResetFilters = () => {
        if (!artData) return;
        // when the filters are reset, both the artData array and the totalArtLength are reset
        // this resets the page to show all items and correct pagination
        setArtData(initialArtData);
        setCurrentPage(1);
        setTotalArtLength(initialTotalArtLength.current);
    };

    const handleFilterClick = (e) => {
        if (!artData) return;

        // find the filter and the child that was clicked
        const filter = filters.find(filter => filter.children.some(child => child.key === e.key));
        const child = filter.children.find(child => child.key === e.key);

        // if the filter is categories, set the categoryId to the id of the child that was clicked
        const categoryId = filter.label === 'Categories' ? child.id : undefined;
        const availabilityId = filter.label === 'Availability' ? child.id : undefined;
        //console.log(`clicked: ${child.label}, ${filter.label}, cat: ${categoryId}, avail: ${availabilityId}`);

        // filter the artData array based on the selected category
        const filteredArtData = artData.filter(artData => {
            if (categoryId !== undefined) {
                return artData.category_id === categoryId;
            } else if (availabilityId !== undefined) {
                return artData.sold === availabilityId - 1;
            } else {
                return true;
            }
        });

        setArtData(filteredArtData);
        setTotalArtLength(filteredArtData.length);
    };

    /* Pagination */
    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentArtData = artData && artData.length > 0 ? artData.slice(startIndex, endIndex) : [];
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

          
    return (
        <div>
            {contextHolder}
            {artData && (
                <>
                    {randomItems && randomItems.length > 0 && (
                        <div className='carousel-container'>
                            <Carousel className='featured-carousel' autoplay autoplaySpeed={8000}>
                                {randomItems.map((item, index) => (
                                    <CarouselItems item={item} index={index} />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    <Row type='flex' className='home-filter'>
                        <Dropdown menu={{onClick: handleFilterClick, items: filters}}>
                            <button style={{paddingLeft: '20px', color: 'black', background: 'none', border: 'none', cursor: 'pointer'}}>
                                <ControlOutlined style={{paddingRight: '5px'}}/> Filter by
                            </button>
                        </Dropdown>

                        <button onClick={handleResetFilters} style={{marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>
                            Clear Filters
                        </button> 
                    </Row>

                    <Row type='flex' className='home-row'>
                        {/* iterate over artData array and render an ArtCard for each object */}
                        {currentArtData.map((art, index) => (
                            <Col sm={12} md={12} lg={8} xl={6} key={index} align="center" className='home-column'>
                                <ArtCard {...art} />
                            </Col>
                        ))}
                    </Row>

                    {/* If length of artData is greater than pageSize, render Pagination */}
                    {totalArtLength > pageSize && (
                        <Pagination
                            className='Pagination'
                            defaultCurrent={currentPage}
                            total={totalArtLength}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                            current={currentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Home;