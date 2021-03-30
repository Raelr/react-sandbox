import React from 'react'
import classes from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button btnType="Success"
            clicked={props.onCheckoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;