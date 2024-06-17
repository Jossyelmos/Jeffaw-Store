import React, { Fragment, useContext, useEffect } from 'react';
import CartItem from './CartItem';
import Spinner from '../components/layout/Spinner';
import ProductContext from '../context/product/productContext';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { loadStripe } from '@stripe/stripe-js';

const Carts = () => {
    const productContext = useContext(ProductContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { carts, total, clearCart, getCarts, loading } = productContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        authContext.loadUser();
        getCarts();

        // eslint-disable-next-line
    }, []);

    if (carts !== null && carts.length === 0) {
        return (
            <section className='all-center'>
                <header>
                    <h2>YOUR CART</h2>
                    <h4>is currently empty</h4>
                </header>
            </section>
        )
    }

    const handlePayment = async () => {

        if (authContext.user.email) {
            const stripePromise = await loadStripe("pk_test_51Ok9NNDgRkBhUUI2vf3Ii7wq6kVJurTTasvD98p4anc3dSGJEioM1DwyjBjAt8nNiDeXNF64UQxPL0m4BqpI5jFa00FTF6jncI");
        
            const res = await fetch('/checkout-payment', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(carts)
            })

            if (res.statusCode === 500) return;

            const data = await res.json();
            console.log(data);

            setAlert('Redirect to Payment Gateway...', 'success');
            stripePromise.redirectToCheckout({sessionId: data})

        } else {
            setAlert('You have not login...', 'dangers');
        }
        
    }

    return (
        <Fragment>
            { carts !== null && !loading ? (
                <section>
                    <header className='all-center'>
                        <h2>YOUR CART</h2>
                    </header> 
                    <div>
                        {carts.map((cart) => {
                            return <CartItem key={cart._id} cart={cart} />
                        })} 
                    </div>
                    <footer>
                        <hr className='hr' />
                        <div>
                            <h4>
                                Total <span className='right !important'>${total}</span>
                            </h4>
                        </div>
                        <div className='all-center my-3 grid-2'>
                            <button className="btn waves-effect waves-light GREEN" onClick={handlePayment}>
                                CHECKOUT
                            </button>
                            <button className="btn waves-effect waves-light red" onClick={clearCart}>
                                CLEAR CART
                            </button>
                        </div>
                    </footer>
                </section>
            ) : <Spinner />}
        </Fragment>
  )
}

export default Carts;