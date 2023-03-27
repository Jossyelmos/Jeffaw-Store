import React, { Fragment, useContext } from 'react';
import logo from '../../images/logo.png';
import PropTypes from 'prop-types';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
    const productContext = useContext(ProductContext);
    const authContext = useContext(AuthContext);

    const { quantity, clearCart } = productContext;
    const { isAuthenticated, logout, user } = authContext;
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        clearCart();
        navigate('/');
    };

    const authLinks = (
        <Fragment>
            <li>
                <Link to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/products">
                    Products
                </Link>
            </li>
            <li className='cart-cont'>
                <Link to={!isAuthenticated ? "/login" : "/carts"}>
                        <i className="material-icons">shopping_cart</i>
                    <div className="carts">
                        <span className="cart-total">{quantity}</span>
                    </div>
                </Link>
            </li>
            <li className='user-name'> Hi, {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!" className="hide-sm"> 
                    Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/products">
                    Products
                </Link>
            </li>
            <li>
                <Link to="/badges.html">
                    About
                </Link>
            </li>
            <li>
                <Link to="/collapsible.html">
                    Contacts
                </Link>
            </li>
            <li className='cart-cont'>
                <Link to={!isAuthenticated ? "/login" : "/carts"}>
                        <i className="material-icons">shopping_cart</i>
                    <div className="carts">
                        <span className="cart-total">{quantity}</span>
                    </div>
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    Register
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    Login
                </Link>
            </li>
        </Fragment>
    )

    return (
          <nav className='blue'>
            <div className="nav-wrapper">
                <img className='nav-img' src={icon} alt='logo' />
                <a href="#!" className="brand-logo">{title}</a>
                <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
                <ul className="sidenav" id="mobile-demo">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
        </nav>
    )
};

Navbar.defaultProps = {
    title: 'Jeffaw Store',
    icon: logo
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar;