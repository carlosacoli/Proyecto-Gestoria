import React from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModuloFacturasIngresos from "../modulos/modulo-facturas-ing";

export default function(){
    return(
        <div className="base-modulos">
            <div className="head-container-facturas">
                <div>
                    <h2>Facturas Ingresos</h2>
                </div>
                <div className="container-icon-facturas">
                    <Link to="add-factura-ingreso" className="icon-upload-ingreso">
                        <FontAwesomeIcon  icon="circle-plus" />
                    </Link>
                    <p>Añadir Facturas</p>
                </div>
            </div>
            <div>
                <ModuloFacturasIngresos />
            </div>
        </div>
    );
}