import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Register = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;
    const navigate = useNavigate();

     useEffect(() => {
         if (isAuthenticated) {
             navigate('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'dangers');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'dangers');
        } else if (password !== password2) {
            setAlert('Password do not match', 'dangers')
        } else {
            register({
                name,
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
                <h4 className='center'>Account Register</h4>
                <form onSubmit={onSubmit} className='register'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={name} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' value={email} onChange={onChange} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange} minLength='6' />
                    </div>
                    <div>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input type='password' name='password2' value={password2} onChange={onChange} minLength='6' />
                    </div>
                    <input type='submit' value='Register' />
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default Register;