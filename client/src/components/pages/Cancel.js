import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <section className='all-center'>
      <div className='cancel-page'>
        <p>Payment Successful</p>
      </div>
      <div className="cancel-btn">
        <Link to='/'>
          <button>
              Back to Home
          </button>  
        </Link>
      </div>
    </section>
  )
}

export default Cancel