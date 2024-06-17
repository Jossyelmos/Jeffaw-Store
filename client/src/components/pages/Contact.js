import React, { useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.png';
import ContactImg from '../../images/contact-img1.jpg';
import ContactSideImg from '../../images/contact-img2.jpg';
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer   
} from '@react-google-maps/api'

const center = { lat: -26.180031, lng: 28.072071 }

const Contact = () => {
  const JEFFAW_APP_API_KEY = "AIzaSyCTQq_rAozAh-OL2bbd8s4sQ9fCYxBUkZA";

  const { isLoaded } = useJsApiLoader({
    id: "jeffawapp",
    googleMapsApiKey: JEFFAW_APP_API_KEY,
    libraries: ['places']
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    

  }, []);

  const handleMouseEnter = () => {
      setIsHovering(true);
      // setTimeout(() => setIsHovering(false) , 100)
    }

    const handleMouseLeave = () => {
      setIsHovering(false);
      // setTimeout(() => setIsHovering(true) , 100)
    }

  /** @type React.MutableRefObject<HTML.InputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTML.InputElement> */
  const destinationRef = useRef();
  

  if (!isLoaded) {
    return ("Loading...")
  }

  const calculateRoute = async () => {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    //  eslint-disable-next-line
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: center,
      // destination: destinationRef.current.value,
      //  eslint-disable-next-line
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const clearRoute = () => {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  const style={  
      backgroundImage: `url(${ContactImg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
  }
  

  return (
    <div>
      <div className="contact_cont p-2">
        <div className="grid-2">
          <div className="contact" style={style}>
            <div className="contact-info-cont">
              <div className="contact-info">
                <img src={logo} alt="Logo" />
                <p>Jeffaw</p>
                <h5>Contact Us</h5>
                <ul className="contact-icons">
                  <li className=''>
                    <i className=" material-icons">call</i>
                    <span>
                      <h6>PHONE</h6>
                      <p>+27613645542</p>
                    </span>
                  </li>
                  <li className=''>
                    <i className=" material-icons">location_on</i>
                    <span>
                      <h6>ADDRESS</h6>
                      <p>1 Observatory Av.</p>
                    </span>
                  </li>
                  <li className=''>
                    <i className=" material-icons">language</i>
                    <span>
                      <h6>WEBSITE</h6>
                      <p>www.jdsonlineshopping.com</p>
                    </span>
                  </li>
                  <li className=''>
                    <i className=" material-icons">email</i>
                    <span>
                      <h6>EMAIL</h6>
                      <p>jdsonlineshopping@yahoo.com</p>
                    </span>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
          <div className="contact-side-cont">
            <div className="contact-side">
              <h1>Jeffaw Mega Store Contact Us Instagram Story</h1>
              <div className="contact-side-img">
                <img src={ContactSideImg} alt="Img" />
                <p>By Jossy Amos</p>
              </div>
              <div className="contact-side-btn">
                <p>Click to Start Shopping</p>
                <i className=" material-icons">star_border</i>
              </div>
              <ul>
                <li>
                  <i className=" material-icons">color_lens</i>
                    <span>
                      <p>Click on any of your desired store</p>
                    </span>
                </li>
                <li>
                  <i className=" material-icons">local_cafe</i>
                    <span>
                      <p>More than 200 shops around</p>
                    </span>
                </li>
                <li>
                  <i className=" material-icons">local_florist</i>
                    <span>
                      <p>60 mins Delivery time frame</p>
                    </span>
                </li>
                <li>
                  <i className=" material-icons">person_add</i>
                    <span>
                      <p>24 hrs Customers center</p>
                    </span>
                </li>
                <li>
                  <i className=" material-icons">system_update_alt</i>
                    <span>
                      <p>Carts Records keeping</p>
                    </span>
                </li>
                <li>
                  <i className=" material-icons">stay_current_portrait</i>
                    <span>
                      <p>Easy download and user friendly App</p>
                    </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
     </div>

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "300px" }}
        options={{
          // zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          // fullscreenControl: false
        }}
        onLoad={(map) => setMap(map)}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
        
      >
        <MarkerF position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        <div className={isHovering ? "row mapControl" : 'hidden'}>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s4">
              <Autocomplete>
                <input placeholder="Origin" type="text" ref={originRef}/>
              </Autocomplete>
            </div>
            <div className="input-field col s4">
              <Autocomplete>
                <input placeholder='Destination' type="text" ref={destinationRef}/>
              </Autocomplete>
            </div>
            <div className="input-field col s4">
               <button className="btn waves-effect waves-light" type="submit" name="action" onClick={calculateRoute}>Calculate
              </button>
              <i className="material-icons" onClick={clearRoute}>highlight_off</i>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="input-field col s5">
                <p>Distance: {distance }</p>
              </div>
              <div className="input-field col s5">
                <p>Duration: { duration}</p>
              </div>
              <div className="input-field col s2">
                <i className="tiny material-icons near-me" onClick={() => map.panTo(center)}>near_me</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      </GoogleMap>
    </div>
  )
}

export default Contact;