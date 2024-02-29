import React from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Descriptions, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import UserInfoEdit from './user-info-edit';
import UserAddressEdit from './user-address-edit';

function Account(props) {
    let { id } = useParams();  

    // get and update user information from the database getbyid
    // get and update address information from the database getbyid

    const userPlaceholder = {
        id: 1,
        role: 'admin',
        username: 'admin',
        first_name: 'first',
        last_name: 'last',
        email: 'adminemail@gmail.com',
        phone_number: '123456789',
        created_at: '2021-10-10 00:00:00',
        updated_at: '2021-10-10 00:00:00'
    }

    const addressPlaceholder = {
        id: 1,
        user_id: 1,
        address_line1: '1234 address street',
        address_line2: 'apt 123',
        city: 'city',
        postcode: '12345',
        country: 'UK',
        created_at: '2021-10-10',
        updated_at: 'null'
    }

    // description items inheriting user information
    const userItems = [
        {
            key: '1',
            label: 'User Id',
            children: userPlaceholder.id
        },
        {
            key: '2',
            label: 'User Role',
            children: userPlaceholder.role
        },
        {
            key: '3',
            label: 'Username',
            children: userPlaceholder.username
        },
        {
            key: '4',
            label: 'First Name',
            children: userPlaceholder.first_name
        },
        {
            key: '5',
            label: 'Last Name',
            children: userPlaceholder.last_name
        },
        {
            key: '6',
            label: 'Email Address',
            children: userPlaceholder.email
        },
        {
            key: '7',
            label: 'Phone Number',
            children: userPlaceholder.phone_number
        },
        {
            key: '8',
            label: 'User Since',
            children: new Date(userPlaceholder.created_at).toLocaleDateString()
        },
        {
            key: '9',
            label: 'Last Updated',
            children: new Date(userPlaceholder.updated_at).toLocaleString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
        }
    ]

    const addressItems = [
        {
            key: '1',
            label: 'Address Line 1',
            children: addressPlaceholder.address_line1
        },
        {
            key: '2',
            label: 'Address Line 2',
            children: addressPlaceholder.address_line2
        },
        {
            key: '3',
            label: 'City',
            children: addressPlaceholder.city
        },
        {
            key: '4',
            label: 'Postcode',
            children: addressPlaceholder.postcode
        },
        {
            key: '5',
            label: 'Country',
            children: addressPlaceholder.country
        },
        {
            key: '6',
            label: 'Address Created',
            children: new Date(addressPlaceholder.created_at).toLocaleDateString()
        },
        {
            key: '7',
            label: 'Last Updated',
            children: new Date(addressPlaceholder.updated_at).toLocaleString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
        }
    ]

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', display: 'grid' }}>
                <h1>Account Settings</h1>
                <Divider />

                <Descriptions 
                    title="User Information"
                    items={userItems} column={2}
                    extra={
                        <UserInfoEdit user={userPlaceholder}
                            onChange={(user) => {
                                console.log(user);
                            }}
                        />
                    } 
                />
                <Divider/>

                <Descriptions
                    title="Address Information"
                    items={addressItems} column={2}
                    extra={
                        <UserAddressEdit address={addressPlaceholder}
                            onChange={(address) => {
                                console.log(address);
                            }}
                        />
                    } 
                />
                <Divider />

                <h3 style={{margin: '0'}}>Order History</h3>
                <div style={{padding: '20px 0'}}>
                    <Button href={'/orders'} block>Go to Your Orders <ExportOutlined /></Button>
                </div>
            </div>
        </div>
    );
}

export default Account;
