import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

const ContactData = (props) => {
    const [contactData, setContactData] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: 
                    [
                        { value: 'express', displayValue: 'Express' },
                        { value: 'regular', displayValue: 'Regular' },
                    ],
                },
                value: 'express',
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    });

    const orderHandler = (event) => {
        event.preventDefault();

        setContactData({...contactData, loading: true});

        const formData = {};
        for (let key in contactData.orderForm) {
            formData[key] = contactData.orderForm[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            // In a real situation we'd calculate the price on the back-end
            price: props.price,
            orderData: formData
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

    const formElementsArray = [];
    for (let key in contactData.orderForm) {
        formElementsArray.push(
            {
                id: key,
                config: contactData.orderForm[key]
            });
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        
        if (rules == null) return true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormData = {...contactData.orderForm};
        const updatedElement = {...updatedFormData[inputIdentifier]};
        updatedElement.value = event.target.value;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        updatedElement.touched = true;
        updatedFormData[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for (let inputs in updatedFormData) {
            formIsValid = updatedFormData[inputs].valid && formIsValid
        }
        setContactData({...contactData, orderForm: updatedFormData, formIsValid: formIsValid})
    };

    console.log(contactData.formIsValid)

    let form = (            
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!contactData.formIsValid}>ORDER</Button>
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