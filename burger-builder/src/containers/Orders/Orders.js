import React, {useState, useEffect} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'

const Orders = () => {

    const [orders, setOrders] = useState({
        orders: [],
        loading: true
    })

    useEffect(() => {
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push(
                    {
                        ...res.data[key],
                        id: key
                    }
                );
            }
            setOrders({orders: fetchedOrders, loading: false});
        }).catch(err => {
            setOrders({...orders, loading: false});
        })
    },[])

    return (
        <div>
            {orders.orders.map(order => (
                <Order key={order.key}
                ingredients={order.ingredients}
                price={order.price}/>
            ))}
        </div>
    );
};

export default withErrorHandler(Orders, axios);