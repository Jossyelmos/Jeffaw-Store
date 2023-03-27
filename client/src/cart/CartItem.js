import React, { useContext } from 'react';
import ProductContext from '../context/product/productContext';

const CartItem = ({ cart: { _id, image, price, title, quantity } }) => {
    const productContext = useContext(ProductContext);
    const { removeProduct, increaseQty, decreaseQty } = productContext;
  
  return (
    <div className=''>       
        <div className="col s12 m7">
            <div className="card horizontal grid-3">
                <div className="card-image">
                    <img className='cart-item' src={image} alt=''/>
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                      <p className='bold-text'>{title }</p>
                      <p className='cart-price'>${price }</p>
                          <p className='cart-remove' onClick={() => removeProduct(_id)}>Remove Product</p>
                      </div>
                </div>
                <div className="card-action bold-text">
                      <p onClick={() => increaseQty(_id)}>+</p>
                      <p>{quantity}</p>
                      <p onClick={() => decreaseQty(_id)}>-</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem;