import React from "react";

import ImageConstruction from '../../../static/assets/imagenes/under-construction.jpg'


const PageConstruction = () => {
    return(
                <div className="nomatch-wrapper">
                    <div>
                        <h2>Lo siento! Página en desarrollo </h2>
                    </div>
                    <div 
                        className='img-nomatch'
                        style={{
                            backgroundImage: `url(${ImageConstruction})`
                        }}
                    />
                </div>
            );
}
export default PageConstruction;
