import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Descriptions, Button, Space, notification, Result } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

import UserInfoEdit from './user-info-edit';
import UserAddressEdit from './user-address-edit';
import NewAddress from './newAddress';

function NotFound() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        />
    );
}

/*
This function fetches user and address data from the database and displays it in a user-friendly format.
It also provides functionality to edit user and address information.

if a user does not have an address, the address section is replaced with a button to add an address

if a user does not exist at all, a 404 error page is displayed instead
*/
function Account(props) {
    let { id } = useParams();
    const [refetchTrigger, setRefetchTrigger] = useState(false); //  State to trigger the re-fetch
    const [api, contextHolder] = notification.useNotification();

    const [userData, setUserData] = useState(null);
    const [userItems, setUserItems] = useState([]);
    const [addressData, setAddressData] = useState(null);
    const [addressItems, setAddressItems] = useState([]);

    /*
    fetch the user data from db, set the data as the description items which 
    formats the response then do the same for the address data
    encapsulate in useEffect to provide refresh functionality
    */
    useEffect(() => {
        // fetch user data
        fetch(`http://localhost:3030/api/v1/users/${id}`)
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
                // format created_at and updated_at dates
                data.created_at = data.created_at ? new Date(data.created_at).toLocaleString() : null;
                data.updated_at = data.updated_at ? new Date(data.updated_at).toLocaleString() : null;
                setUserData(data);
                // description items inheriting user information
                setUserItems([
                    { key: '1', label: 'User Id', children: data.id },
                    { key: '2', label: 'User Role', children: data.role },
                    { key: '3', label: 'Username', children: data.username },
                    { key: '4', label: 'First Name', children: data.first_name },
                    { key: '5', label: 'Last Name', children: data.last_name },
                    { key: '6', label: 'Email Address', children: data.email },
                    { key: '7', label: 'Phone Number', children: data.phone_number },
                    { key: '8', label: 'User Since', children: data.created_at },
                    { key: '9', label: 'Last Updated', children: data.updated_at }
                ]);
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
                setUserData(null);
            });

        // fetch address data
        fetch(`http://localhost:3030/api/v1/users/${id}/address`)
            .then(response => {
                if (!response.ok) { // If the server responds with a bad HTTP status, throw an error.
                    if (response.status === 404) {
                        return;
                    }
                    return response.json()
                        .then(err => {
                            throw new Error(err.error || 'Something went wrong');
                        });
                }
                return response.json(); // If the response is OK, proceed.
            })
            .then(data => {
                if (!data) { // if the user does not have an address
                    setAddressData(null);
                    return;
                }
                // format created_at and updated_at dates
                data.created_at = data.created_at ? new Date(data.created_at).toLocaleString() : null;
                data.updated_at = data.updated_at ? new Date(data.updated_at).toLocaleString() : null;
                setAddressData(data);

                // description items inheriting address information
                setAddressItems([
                    { key: '1', label: 'Address Line 1', children: data.address_line1 },
                    { key: '2', label: 'Address Line 2', children: data.address_line2 },
                    { key: '3', label: 'City', children: data.city },
                    { key: '4', label: 'Postcode', children: data.postcode },
                    { key: '5', label: 'Country', children: data.country },
                    { key: '6', label: 'Address Created', children: data.created_at },
                    { key: '7', label: 'Last Updated', children: data.updated_at }
                ]);
            })
            .catch(error => { // unsuccessful response, with error from server
                api.open({ message: 'Error', description: error.message, duration: 5, type: 'error' });
                console.error(error);
                setUserData(null);
            });
    }, [refetchTrigger]);

    // handle user edit
    const handleUserEdit = () => {
        api.open({ message: 'User Updated', description: 'User has been updated', duration: 5, type: 'success' });
        setRefetchTrigger(!refetchTrigger); // trigger re-fetch
    }

    // handle address create
    const handleAddressCreate = () => {
        api.open({ message: 'Address Created', description: 'Address has been created', duration: 5, type: 'success' });
        setRefetchTrigger(!refetchTrigger); // trigger re-fetch
    }

    // handle address edit
    const handleAddressEdit = () => {
        api.open({ message: 'Address Updated', description: 'Address has been updated', duration: 5, type: 'success' });
        setRefetchTrigger(!refetchTrigger); // trigger re-fetch
    }

    // handle address delete
    const handleAddressDelete = () => {
        api.open({ message: 'Address Deleted', description: 'Address has been deleted', duration: 5, type: 'success' });
        setRefetchTrigger(!refetchTrigger); // trigger re-fetch
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {contextHolder}
            <div style={{ maxWidth: '800px', display: 'grid' }}>
                {userData ? ( // if user exists
                    <>
                        <h1>Account Settings</h1>
                        <Divider />

                        <Descriptions
                            title="User Information"
                            items={userItems} column={2}
                            extra={<UserInfoEdit user={userData} onChange={handleUserEdit} />}
                        />
                        <Divider />

                        {addressData != null ? ( // if user has an address
                            <>
                                <Descriptions
                                    title="Address Information"
                                    items={addressItems}
                                    column={2}
                                    extra={
                                        <Space>
                                            <UserAddressEdit address={addressData} user={userData} onChange={handleAddressEdit} />
                                            <Button danger onClick={handleAddressDelete}>Delete</Button>
                                        </Space>
                                    }
                                />
                                <Divider />
                            </>

                        ) : ( // if user does not have an address
                            <div style={{ textAlign: 'center' }}>
                                <NewAddress user_id={id} onChange={handleAddressCreate} />
                                <Divider />
                            </div>
                        )}

                        <h3 style={{ margin: '0' }}>Order History</h3>
                        <div style={{ padding: '20px 0' }}>
                            <Button href={'/orders'} block>Go to Your Orders<ExportOutlined /></Button>
                        </div>
                    </>
                ) : ( // if user does not exist
                    <NotFound />
                )}
            </div>
        </div>
    );
}

export default Account;
