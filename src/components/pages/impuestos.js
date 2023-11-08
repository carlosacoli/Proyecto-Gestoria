import React from "react";

import ModuloImpuestos from "../modulos/modulo-impuestos";

export default function(){
    return(
        <div className="base-documentos">
            <div className="head-container-documentos">
                <div>
                    <h2>Mis Impuestos</h2>
                </div>
            </div>
            <div>
                <ModuloImpuestos />
            </div>
            
        </div>
    );
}