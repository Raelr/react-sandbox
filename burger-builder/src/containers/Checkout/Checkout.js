import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState(
        {
            ingredients: {},
            price: 0
        }
    )

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('checkout/contact-data');
    }

    useEffect(() => {
        if (props.location.search === '') return;

        const query = new URLSearchParams(props.location.search);

        let burgerIngredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                burgerIngredients[param[0]] = +param[1];
            }
        }
        setIngredients({ingredients: burgerIngredients, price: price});
    },[props.location.search])

    return (
        <div>
            <CheckoutSummary 
                ingredients={ingredients}
                onCheckoutCancel={checkoutCancelledHandler}
                onCheckoutContinue={checkoutContinuedHandler}/>
            <Route 
                path={props.match.path + '/contact-data'} 
                render={(props) => (
                <ContactData 
                    ingredients={ingredients.ingredients} 
                    price={ingredients.price}
                    {...props}/>
                )}/>
        </div>
    );
}

export default Checkout;