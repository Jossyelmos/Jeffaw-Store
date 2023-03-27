import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            // console.log(localStorage.token);
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'dangers');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'dangers');
        } else {
            login({
                email,
                password
            });
        }
    }

  return (
    <div>
        {/* <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}
        <div className="">
            <div className="all-center">
                <h4 className='center'>Account Login</h4>
                <form onSubmit={onSubmit} className='login'>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange} />
                    </div>
                    <p>Have no account? <a href='/register'>Register</a></p>
                    <input type='submit' value='Login' />
                </form>
            </div>          
        </div>
    </div>
  )
}

export default Login;