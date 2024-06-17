import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ProductItem.css'

const ProductItem = ({ product: { id, image, title, price, description } }) => {
    const [isHovering, setIsHovering] = useState(-1);

    return (
        <div className=''>
            <div className="">
                <div
                    className="singleProduct"
                    onMouseEnter={() => setIsHovering(id)}
                    onMouseLeave={() => setIsHovering(-1)}
                >
                    <Link to={`/product/${id}`}></Link>
                    <div className="proImg">
                        <img className="activator" src={image} alt='Img' />
                        <div className={isHovering === id ? 'showOverlayInfo' : 'overlayInfo'}>
                            <h5>
                                {title}
                                <Link to={`/product/${id}`}><i className="material-icons right icon">arrow_forward</i></Link>
                            </h5>
                        </div>
                    </div>
                    <Link to={`/product/${id}`}>
                        <div className="proText flex">
                            <h6 className="card-title activator grey-text text-darken-4">
                                {title}
                            </h6>
                            <i className="material-icons right">more_vert</i>
                        
                        </div>
                    </Link>
                     <div className="proFooter">
                        <p className='bold-text'>Price: ${ price }</p>
                    </div>
                </div>
            </div>
        </div>
        // <div className=''>
        //     <div className="">
        //         <div className="card sticky-action large hoverable">
        //             <div className="card-image waves-effect waves-light">
        //                 <Link to={`/product/${id}`}><img className="activator" src={image} alt='Img' /></Link>
        //             </div>
        //             <div className="card-content">
        //                 <span className="card-title activator grey-text text-darken-4">{ title }<i className="material-icons right">more_vert</i></span>
                        
        //             </div>
        //              <div className="card-action">
        //                 <p className='bold-text'>Price: ${ price }</p>
        //             </div>
        //             <div className="card-reveal">
        //                 <span className="card-title grey-text text-darken-4">{ title}<i className="material-icons right">close</i></span>
        //                 <p>{ description }</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
};

export default ProductItem;