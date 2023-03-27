import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import ProductContext from '../../context/product/productContext';
import { Link } from 'react-router-dom';

const Product = () => {
    const productContext = useContext(ProductContext);
    const { products, loading, getProducts, addProduct } = productContext;
    const { id } = useParams();

    const details = products.filter((product) => product.id === JSON.parse(id));
  
    const handleAddToCart = (product) => { 
        addProduct(product);
    }

    useEffect(() => {
        getProducts();
        
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    };

    return (
        <Fragment>  
            {details.map((product) => (
                <div key={product.id} className="card-panel indigo lighten-5">
                    <h2>{product.title}</h2>
                    <div className='grid-2'>
                        <div>
                            <img style={{ width: '400px'}} src={product.image} alt='' />
                        </div>
                        <div>
                            <blockquote>{product.description}</blockquote>
                            <p><span className='bold-text'>Category:</span> {product.category}</p>
                            <p><span className='bold-text'>Price:</span> ${product.price}</p>
                            <p><span className='bold-text'>Rating:</span> {product.rating.rate} stars</p>
                            <p className='operators'><span className='bold-text'>Qty: </span>
                                 <button className="but-1">-</button>
                                <button className="">{ product.quantity = 1 }</button>
                                 <button className="">+</button>
                            </p>
                            <Link to='/carts'>
                                <button className="btn waves-effect waves-light all-center grey lighten-1" onClick={() => handleAddToCart(product)}>Add To cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default Product;

