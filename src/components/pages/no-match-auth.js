import React from "react";
import { Link } from "react-router-dom";

import Image401 from '../../../static/assets/imagenes/unauthorized401.jpg'

export default function() {
    return(
        <div className="nomatch-wrapper">
            <div>
                <h2>Lo siento! no estas autorizado, por favor inicie sesion </h2>
            </div>
            <div 
                className='img-nomatch'
                style={{
                    backgroundImage: `url(${Image401})`
                }}
            />
            <div className="link-nomatch-401">
                <Link to="/">Presione Aqui para Iniciar Sesion</Link>
            </div>
        </div>
    );
}