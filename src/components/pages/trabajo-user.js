import React, { useState } from "react";

import ModuloTrabajoUser from "../modulos/modulo-trabajo-user";

export default function(props){

        const datauser = (id_user) => {
            props.datauser(id_user)
        }

    return(
        <div className="base-trabajo-user">
            <div className="head-container-trabajo-user">
                <div>
                    <h2>Trabajar con Usuario</h2>
                </div>
            </div>
            <div className="table-trabajo-user">
                <ModuloTrabajoUser 
                    id_user={datauser}

                />
            </div>
        </div>
    );
}