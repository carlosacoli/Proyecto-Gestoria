import React, { Component } from "react";
import axios from 'axios';
// import 'styled-components'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import ModalViewUser from "../modals/modal-view-user"



export default class ModuloTrabajoUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      info: [],
      idToEdit: "",
      viewModalIsOpen: false,
      id_usuario: "",
      nombre: "",
      apellidos: "",
      email: ""
    };

    this.getUsersCliente = this.getUsersCliente.bind(this);
    this.handleModalViewClick = this.handleModalViewClick.bind(this);
    this.handleModalViewClose = this.handleModalViewClose.bind(this);
    this.handleWorkingUser = this.handleWorkingUser.bind(this);
  }  
    
    getUsersCliente(){
        axios.get('https://gestoria-db-09ec50f82e6d.herokuapp.com/usuario/get/cliente', {withCredentials: true})
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
        this.getUsersCliente();
    }

    
    handleModalViewClick(id){
        this.setState({
            viewModalIsOpen: true,
            idToEdit: id
        })
    }

    handleModalViewClose(){
        this.setState({
            viewModalIsOpen: false,
            idToEdit: ""
        })
        this.getUsersCliente();
    }

    handleWorkingUser(){
        if (this.state.id_usuario == "" || this.state.id_usuario == undefined){
            this.handleAlertUnsucessful() 
        }else{
            this.props.id_user(this.state.id_usuario);
            this.handleAlertSucessful()
        }
    }

    handleAlertUnsucessful(){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No ha seleccionado usuario',
            showConfirmButton: false,
            timer: 1500
        })
    }

    handleAlertSucessful(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Seleccionado para trabajo con exito!',
            showConfirmButton: false,
            timer: 1500
        })
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
            width: "40px",
            cell: (row) => <FontAwesomeIcon onClick={() => this.handleModalViewClick(row.id_usuario)} 
            title="Ver Usuario" className="Icon-datatable-teal" icon="fa-solid fa-eye"/>,
            center: true 
        }
    ]

    const handleSelectedRowsChange = (rows) => {
        console.log(rows.selectedRows[0]);
        if (rows.selectedRows[0] !== undefined) { 
            const {
                id_usuario,
                nombre_usuario,
                apellidos_usuario,
                email_usuario
            } = rows.selectedRows[0];

            this.setState({
                id_usuario: id_usuario,
                nombre: nombre_usuario,
                apellidos: apellidos_usuario,
                email: email_usuario
            })
        }else{
            this.setState({
                id_usuario: "",
                nombre: "",
                apellidos: "",
                email: ""
            })  
        }
      };
    
    return(
        <div className="table-grid-trabajo-user">
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
                selectableRows
                onSelectedRowsChange={handleSelectedRowsChange}
                selectableRowsHighlight
                selectableRowsSingle
            />
            </div>
            <div className="table-grid-user-select">
                <div className="table-trabajo-text-heading">
                    Usuario Seleccionado para trabajar
                </div>
                <div className="table-trabajo-data-user">
                    <p>Usuario: <span>{`${this.state.nombre}  ${this.state.apellidos}`}</span></p>
                    <p>Email: <span>{this.state.email}</span></p>
                </div>

                <div className="boton-wrapper">
                    <button onClick={this.handleWorkingUser} className="boton">Trabajar con Usuario</button>
                </div>
            </div>
            <div>
              <ModalViewUser
                handleModalViewClose={this.handleModalViewClose}
                viewModalIsOpen={this.state.viewModalIsOpen}
                idToEdit={this.state.idToEdit}
              />
            </div>
            
        </div>
    )
  }
}