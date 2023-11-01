import React from "react";
import Swal from 'sweetalert2'

import ModalEditFacIngreso from "../modals/modal-edit-ingreso"
export default function(){
        const mostraralerta = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        }
    
    return(
        <div>
            Pagina de Impuestos
            <button onClick={()=>mostraralerta()}>click</button>
            <ModalEditFacIngreso />
        </div>
    );
}