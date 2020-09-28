import React from 'react';
import img1 from '../images/02.jpg';
import img2 from '../images/03.jpg';

const Menu = () => {
    return(
        <>
            <div className="pageTitle">
                <h1>Menu</h1>
           </div>
           <article className="about">
                <img src={img2} alt=""></img>
                <div className="pageTitle">
                    <h1>Don't miss our special menu for this summer!</h1>
                </div>
                <img src={img1} alt=""></img>
                <div className="pageTitle">
                    <h1>Come and taste your zodiac!</h1>
                </div>
           </article>
        </>
    )
}

export default Menu;