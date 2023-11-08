import React from "react";

import ModuloImpuestos from "../modulos/modulo-impuestos";

export default function(props){
    return(
        <div className="base-documentos">
            <div className="head-container-documentos">
                <div>
                    <h2>Mis Impuestos</h2>
                </div>
            </div>
            <div>
                <ModuloImpuestos 
                  id_user_rol={props.id_user_rol}
                  id_user_work={props.id_user_work}
                />
            </div>
            
        </div>
    );
}