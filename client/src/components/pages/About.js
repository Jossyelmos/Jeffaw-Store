import React from 'react';
import image from '../../images/aboutUs-img2.jpeg';

const About = () => {
  return (
    <div className='aboutUs all-center'>
      <img className='aboutUs-img' src={image} alt="aboutUs" />
      <h1>Our Story</h1>
      <p>We are the leading online grocery stores around the world. Dealing with the best of Local and International store there is...</p>
    </div>
  )
}

export default About;