import React, {useContext, useEffect} from 'react';
import ProductItem from './ProductItem';
import Spinner from '../layout/Spinner';
import ProductContext from '../../context/product/productContext';

const Products = () => {
    const productContext = useContext(ProductContext);
    const { products, loading, getProducts } = productContext;

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className='grid-4 product-cont'>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        )
    }

};

export default Products