import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-carousel-minimal';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();

    // eslint-disable-next-line
  }, []);

   const data = [
    {
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      caption: "Men's Clothing"
    },
    {
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      caption: "Jewelery"
    },
    {
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      caption: "Electronics"
    },
    {
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      caption: "Electronics"
    },
    {
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      caption: "Women's Clothing"
    }
  ];


   const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  
  return (
    <div className="">
      <div style={{ textAlign: "center" }}>
        <h2>Jeffaw Mega Store</h2>
        <p>Bringing the world class online MEGA STORE close to your door step.</p>
        <div style={{
          padding: "0 20px",
        }}>
          <Carousel
            data={data}
            time={3000}
            width="750px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="lightgrey"
            pauseIconSize="40px"
            slideBackgroundColor="white"
            slideImageFit="contain"
            style={{
              textAlign: "center",
              maxWidth: "750px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home;