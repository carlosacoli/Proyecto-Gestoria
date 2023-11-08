import React from "react";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModuloGestionUsers from "../modulos/modulo-gestion-users";

export default function(){
    return(
        <div className="base-gestion-users">
            <div className="head-container-gestion-users">
                <div>
                    <h2>Gestión de Usuarios</h2>
                </div>
                <div className="container-icon-users">
                    <Link to="add-user" className="icon-add-user">
                        <FontAwesomeIcon icon="fa-solid fa-user-plus" />
                    </Link>
                    <p>Añadir Usuario</p>
                </div>
            </div>
            <div className="table-gestion-users">
                <ModuloGestionUsers />
            </div>
        </div>
    );
}