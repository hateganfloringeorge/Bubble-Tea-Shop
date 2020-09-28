import React, { useState, useEffect } from 'react';
import { Carousel} from 'react-bootstrap';


import slide02 from '../images/02.jpg';


import slide05 from '../images/05.jpg';
import slide06 from '../images/06.jpg';


const Carrouselle = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        console.log("Acolo");
        getPhoto();
    }, []);

    const getPhoto = () => {
        setPhotos([slide05, slide02,
                    slide06]);
    }

    
    return(
      <>
        <div className="carrouselle">
        <Carousel
         controls={true}
         slide={true}
         >
            {photos.map(
                photo => <Carousel.Item 
                key={photo.toString()}>
                    <img src={photo} alt=""></img>
                </Carousel.Item>
            )}
        </Carousel>
        </div>
      </>  
    );
}


export default Carrouselle;