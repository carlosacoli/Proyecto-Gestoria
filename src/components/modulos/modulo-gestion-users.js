import React, { Component } from "react";
import axios from 'axios';
// import Swal from 'sweetalert2'
import moment from "moment";
// import 'styled-components'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalEditUser from "../modals/modal-edit-user"
import ModalViewUser from "../modals/modal-view-user"
import ModalChangePass from "../modals/modal-admin-changepass";


export default class ModuloGestionUsers extends Component {
  constructor(){
    super();

    this.state = {
      isLoading: false,
      info: [],
      idToEdit: "",
      editModalIsOpen: false,
      viewModalIsOpen: false,
      changeModalIsOpen: false
    };

    this.getUsers = this.getUsers.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleModalEditClick = this.handleModalEditClick.bind(this);
    this.handleModalViewClick = this.handleModalViewClick.bind(this);
    this.handleModalChangeClick = this.handleModalChangeClick.bind(this);
    this.handleModalEditClose = this.handleModalEditClose.bind(this);
    this.handleModalViewClose = this.handleModalViewClose.bind(this);
    this.handleModalChangeClose = this.handleModalChangeClose.bind(this);
  }  
    
  getUsers(){
    axios.get('http://127.0.0.1:5000/usuario/get', {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de datos de usuarios", response); //QUITAR
      var datos = response.data
      this.setState({
        info: datos
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getUsers",error);
    });
  }

  componentDidMount(){
    this.getUsers();
  }

  handleDeleteClick(id){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el usuario?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, Deseo Elimarlo!',
      cancelButtonText: 'No, Eliminar!',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:5000/usuario/delete/${id}`, {withCredentials: true})
          .then(response => {
            console.log("Usuario eliminado correctamente", response);
            Swal.fire({
              confirmButtonColor: '#28a745',
              title: 'Eliminada!',
              text: 'El usuario ha sido eliminado correctamente!',
              icon: 'success'
            })
            this.getUsers();
          }).catch(error => {
            console.log("Error delete user", error);
          });
      } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            confirmButtonColor: '#28a745',
            title:'Cancelado',
            text:'El usuario esta a salvo :)',
            icon:'error'
          })
        }
    })  
  }

  handleModalEditClick(id){
    this.setState({
        editModalIsOpen: true,
        idToEdit: id
    })
  }

  handleModalViewClick(id){
    this.setState({
        viewModalIsOpen: true,
        idToEdit: id
    })
  }

  handleModalChangeClick(id){
    this.setState({
      changeModalIsOpen: true,
      idToEdit: id
    })
  }

  handleModalEditClose(){
    this.setState({
        editModalIsOpen: false,
        idToEdit: ""
    })
    this.getUsers();
  }

  handleModalViewClose(){
    this.setState({
        viewModalIsOpen: false,
        idToEdit: ""
    })
    this.getUsers();
  }

  handleModalChangeClose(){
    this.setState({
      changeModalIsOpen: false,
      idToEdit: ""
    })
    this.getUsers();
  }

  render() {
    const columns = [
      {
        name: 'ID',
        width: "80px",
        selector: row => row.id_usuario,
        sortable: true,
        
    
      },
      {
        name: 'Nombre',
        selector: row => row.nombre_usuario,
        sortable: true,
      },
      {
        name: 'Apellidos',
        selector: row => row.apellidos_usuario,
        sortable: true,
      },
      {
        name: 'Correo',
        selector: row => row.email_usuario,
        sortable: true,
      },
      {
        name: 'Telefono',
        width: "140px",
        selector: row => row.telefono_usuario,
        sortable: true,
        
      },
      {
        name: 'Fecha Creación',
        selector: row => moment(row.fecha_creacion).format('LL'), 
        sortable: true,
      },
      {
        name: 'Rol usuario',
        selector: row => row.id_rol_usuario,
        sortable: true,
        center: true
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleModalViewClick(row.id_usuario)} 
        title="Ver Usuario" className="Icon-datatable-teal" icon="fa-solid fa-eye"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleDeleteClick(row.id_usuario)} 
        title="Eliminar Usuario" className="Icon-datatable-red" icon="fa-solid fa-user-slash"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleModalEditClick(row.id_usuario)}
        title="Editar Usuario" className="Icon-datatable-green" icon="fa-solid fa-user-pen"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleModalChangeClick(row.id_usuario)}
        title="Cambiar Password" className="Icon-datatable-green" icon="fa-solid fa-key"/>,
        center: true 
      },  
    ]

    return(
        <div>
            {this.state.info.map(datos => {
            console.log("Datos de Usuarios", datos); //QUITAR
            })}

            <div>
            <DataTable 
                columns={columns}
                data={this.state.info}
                pagination
                paginationPerPage = {15}
                paginationRowsPerPageOptions = {[15, 30, 45, 60, 80, 100]}
            />
            </div>
            <div>
              <ModalEditUser 
                handleModalEditClose={this.handleModalEditClose}
                editModalIsOpen={this.state.editModalIsOpen}
                idToEdit={this.state.idToEdit}
              />

              <ModalViewUser
                handleModalViewClose={this.handleModalViewClose}
                viewModalIsOpen={this.state.viewModalIsOpen}
                idToEdit={this.state.idToEdit}
              />

              <ModalChangePass
                handleModalChangeClose={this.handleModalChangeClose}
                changeModalIsOpen={this.state.changeModalIsOpen}
                idToEdit={this.state.idToEdit}

              />
            </div>
        </div>
    )
  }
}