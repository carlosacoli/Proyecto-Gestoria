import React from "react";
import { Link } from "react-router-dom";

import Image404 from '../../../static/assets/imagenes/error-404.jpg'

export default function() {
    return(
        <div className="nomatch-auth-wrapper">
            <div>
                <h2>Lo siento! no se pudo encontrar esta pagina </h2>
            </div>
            <div 
                className='img-nomatch-401'
                style={{
                    backgroundImage: `url(${Image404})`
                }}
            />
            <div className="link-nomatch-404">
                <Link to="/">Volver al inicio</Link>
            </div>
        </div>
    );
}