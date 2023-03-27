import React, { Fragment, useContext, useEffect } from 'react';
import CartItem from './CartItem';
import Spinner from '../components/layout/Spinner';
import ProductContext from '../context/product/productContext';
import AuthContext from '../context/auth/authContext';

const Carts = () => {
    const productContext = useContext(ProductContext);
    const authContext = useContext(AuthContext);

    const { carts, total, clearCart, getCarts, loading } = productContext;

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
                        <div className='all-center my-3'>
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