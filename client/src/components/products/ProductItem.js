import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product: {id, image, title, price, description}}) => {

    return (
        <div className=''>
            <div className="">
                <div className="card sticky-action large hoverable">
                    <div className="card-image waves-effect waves-light">
                        <Link to={`/product/${id}`}><img className="activator" src={image} alt='Img' /></Link>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{ title }<i className="material-icons right">more_vert</i></span>
                        
                    </div>
                     <div className="card-action">
                        <p className='bold-text'>Price: ${ price }</p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{ title}<i className="material-icons right">close</i></span>
                        <p>{ description }</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductItem;