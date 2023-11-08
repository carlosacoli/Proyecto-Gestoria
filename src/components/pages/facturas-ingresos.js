import React from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModuloFacturasIngresos from "../modulos/modulo-facturas-ing";

export default function(props){
    return(
        <div className="base-modulos">
            <div className="head-container-facturas">
                <div>
                    <h2>Facturas de Ingresos</h2>
                </div>
                <div className="container-icon-facturas">
                    <Link to="add-factura-ingreso" className="icon-upload-ingreso">
                        <FontAwesomeIcon  icon="circle-plus" />
                    </Link>
                    <p>Añadir Factura</p>
                </div>
            </div>
            <div>
                <ModuloFacturasIngresos 
                    id_user_rol={props.id_user_rol}
                    id_user_work={props.id_user_work}
                />
            </div>
        </div>
    );
}