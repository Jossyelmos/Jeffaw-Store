import React from 'react';
import { Link } from 'react-router-dom';


const Success = () => {
  return (
    <section className='all-center'>
      <div className='success-page'>
        <p>Payment Successful</p>
      </div>
      <div className="success-btn">
        <Link to='/'>
          <button>
              Back to Home
          </button>  
        </Link>
      </div>
    </section>
  )
}

export default Success;