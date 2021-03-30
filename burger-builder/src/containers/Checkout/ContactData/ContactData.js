import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

const ContactData = (props) => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        address: {
            street: '', 
            number: '',
            postalCode: '',
        },
        loading: false
    });

    const orderHandler = (event) => {
        event.preventDefault();

        setContactData({...contactData, loading: true});

        const order = {
            ingredients: props.ingredients,
            // In a real situation we'd calculate the price on the back-end
            price: props.price,
            customer: {
                name: 'Aryeh Zinn',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '78659',
                    country: 'Australia'
                },
                email: 'test@test.com'
            },
            deliverMethod: 'express'
        };
        axios.post('/orders.json', order)
            .then(response => {
                setContactData({...contactData, loading: false})
                props.history.push('/')
            })
            .catch(error => {
                setContactData({...contactData, loading: false})
            });
    };

    let form = (            
        <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name'></input>
            <input className={classes.Input} type='text' name='email' placeholder='Your Email'></input>
            <input className={classes.Input} type='text' name='street' placeholder='Your Street'></input>
            <input className={classes.Input} type='text' name='postalCode' placeholder='Your Postal Code'></input>
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );
    if (contactData.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Details:</h4>
            {form}
        </div>
    );
};

export default ContactData;