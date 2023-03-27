import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
        !isAuthenticated && !loading ? <Navigate to='/products' /> : children
    );
};

export default PrivateRoute;