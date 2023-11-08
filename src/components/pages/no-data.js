import React, { Component } from "react";
import { Link } from "react-router-dom";

import ImageNoData from '../../../static/assets/imagenes/no-data.jpg'

export default class ModuloNoData extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div className="nodata-wrapper">
                <div>
                    <h2>No hay registros disponibles</h2>
                </div>
                <div 
                    className='img-nodata'
                    style={{
                        backgroundImage: `url(${ImageNoData})`
                    }}
                />
            </div>
        );
    }
}