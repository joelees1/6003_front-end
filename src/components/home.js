import React from 'react';
import { Row, Col, Pagination, Dropdown } from 'antd';
import { useState, useRef } from 'react';
import { ControlOutlined } from '@ant-design/icons';

import ArtCard from '../components/card';


function Home(data) {
    /* Filters */
    const [artData, setArtData] = useState(data.artData);
    const initialArtData = useRef(data.artData);

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
        // when the filters are reset, both the artData array and the totalArtLength are reset
        // this resets the page to show all items and correct pagination
        setArtData(initialArtData.current);
        setCurrentPage(1);
        setTotalArtLength(initialTotalArtLength.current);
    };

    const handleFilterClick = (e) => {
        handleResetFilters(); // reset before applying new filters

        // allows further filters to be added
        // find the filter and the child that was clicked
        const filter = filters.find(filter => filter.children.some(child => child.key === e.key));
        const child = filter.children.find(child => child.key === e.key);

        // if the filter is categories, set the categoryId to the id of the child that was clicked
        const categoryId = filter.label === 'Categories' ? child.id : undefined;
        const availabilityId = filter.label === 'Availability' ? child.id : undefined;

        console.log(`clicked: ${child.label}, ${filter.label}, cat: ${categoryId}, avail: ${availabilityId}`);

        // filter the artData array based on the selected category
        const filteredArtData = data.artData.filter(artData => {
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArtLength, setTotalArtLength] = useState(data.artData.length);
    const initialTotalArtLength = useRef(data.artData.length);

    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const currentArtData = artData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className='home-container'>
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
        </div>
    );
}

/* class example of the same code */
class HomeClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artData: props.artData,
            currentPage: 1
        };
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render() {
        if (!this.state.artData) {
            return <div>Loading...</div>;
        }

        const pageSize = 12;
        const startIndex = (this.state.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentArtData = this.state.artData.slice(startIndex, endIndex);

        const ArtGrid = currentArtData.map((art, index) => (
            <Col span={6} key={index} align="center">
                <ArtCard {...art} />
            </Col>
        ));

        return (
            <>
                <Row type="flex">
                    {ArtGrid}
                </Row>

                {this.state.artData.length > pageSize && (
                    <Pagination
                        className='Pagination'
                        defaultCurrent={1}
                        total={this.state.artData.length}
                        pageSize={pageSize}
                        onChange={this.handlePageChange}
                    />
                )}
            </>
        );
    }
}

export default Home;