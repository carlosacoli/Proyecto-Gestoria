import React from "react";
import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModuloDocumentos from "../modulos/modulo-documentos";
import ModalAddDocumento from "../modals/modal-add-documento"

export default function(props){
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);

    function handleaddModalOpen() {
        setAddModalIsOpen(true);
    }

    function handleAddModalClose(){
        setAddModalIsOpen(false);
    }

    function handleReloadTable(){
        setReloadTable(true);
    }
    
    function handleStopReloadTable(){
        setReloadTable(false);
    }

    return(
        <div className="base-documentos">
            <div className="head-container-documentos">
                <div>
                    <h2>Documentos</h2>
                </div>
                {props.id_user_work !== "" ?
                    <div className="container-icon-documento">
                        <FontAwesomeIcon onClick={handleaddModalOpen} className="icon-add-documento" icon="fa-solid fa-folder-plus" />
                        <p>Subir Documento</p>
                    </div>
                :null
                }
            </div>
            <div className="table-documentos">
                <ModuloDocumentos 
                    eventReload={reloadTable}
                    stopReload={handleStopReloadTable}
                    id_user_work={props.id_user_work}
                />

                <ModalAddDocumento 
                    handleModalAddClose={handleAddModalClose}
                    handleReloadTable={handleReloadTable}
                    addModalIsOpen={addModalIsOpen}
                    id_user_rol={props.id_user_rol}
                    id_user_work={props.id_user_work}
                />
            </div>
        </div>
    );
}