import React from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModuloFacturasGastos from "../modulos/modulo-facturas-gas";

export default function(){
    return(
        <div className="base-modulos">
            <div className="head-container-facturas">
                <div>
                    <h2>Facturas de Gastos</h2>
                </div>
                <div className="container-icon-facturas">
                    <Link to="add-factura-gasto" className="icon-upload-ingreso">
                        <FontAwesomeIcon  icon="circle-plus" />
                    </Link>
                    <p>Añadir Factura</p>
                </div>
            </div>
            <div>
                <ModuloFacturasGastos />
            </div>
        </div>
    );
}