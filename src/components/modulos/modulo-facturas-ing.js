import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
// import 'styled-components'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalEditFacIngreso from "../modals/modal-edit-ingreso"
// import ModuloNoData from "../pages/no-data";


export default class ModuloFacturasIngresos extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      info: [],
      idToEdit: "",
      editModalIsOpen: false
    };


    this.getFacturasIng = this.getFacturasIng.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this); 
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
    this.handleVisualizeClick = this.handleVisualizeClick.bind(this);
    this.handleEditModalClick = this.handleEditModalClick.bind(this);
    this.handleModalEditClose = this.handleModalEditClose.bind(this);
    this.handleAcceptClick = this.handleAcceptClick.bind(this);
    this.handleRejectedClick = this.handleRejectedClick.bind(this);
    this.handleAlertNotIdWork = this.handleAlertNotIdWork.bind(this);
  }  
    
  getFacturasIng(){
    axios.get(`http://127.0.0.1:5000/factura_ingreso/get/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de datos de facturas", response); //QUITAR
      var datos = response.data
      this.setState({
        info: datos
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getFacturas",error);
    });
  }

  componentDidMount(){
    this.getFacturasIng();
    if (this.props.id_user_work == "" || this.props.id_user_work == undefined){ 
      this.handleAlertNotIdWork();
    }
  }

  handleDeleteClick(id){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar la factura?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, Deseo Elimarla!',
      cancelButtonText: 'No, Eliminar!',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:5000/factura_ingreso/delete/${id}`, {withCredentials: true})
          .then(response => {
            console.log("factura eliminada correctamente", response);
            Swal.fire({
              confirmButtonColor: '#28a745',
              title: 'Eliminada!',
              text: 'La factura ha sido eliminada correctamente!',
              icon: 'success'
            })
            this.getFacturasIng();
          }).catch(error => {
            console.log("Error delete factura", error);
          });
      } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            confirmButtonColor: '#28a745',
            title:'Cancelado',
            text:'Tu Factura esta a salvo :)',
            icon:'error'
          })
        }
    })  
  }
  
  handleDownloadClick(id){
    axios.get(`http://127.0.0.1:5000/factura_ingreso/download/${id}`, 
    { responseType: 'blob' },
    {withCredentials: true})
      .then(response => {
        const blob = new Blob([response.data], {type: response.data.type});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'unknown';
        if (contentDisposition) {
            let fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            let fileNameNull = contentDisposition.match(/filename=(.+)/);
            if (fileNameMatch !== null) {
              fileName = fileNameMatch[1]; 
              console.log("filename", fileName) 
              }else {
                fileName = fileNameNull[1];
                console.log("filename", fileName)
              }             
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.target = '_blank';
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        // Si se desea que el archivo sea mostrado en una nueva ventana y disponible para descargar
        //si activa la linea de link.target, pero se comenta las dos anteriores:
        // // link.setAttribute('download', 'application.pdf'); //or any other extension
        // // document.body.appendChild(link);
        // link.target = '_blank';

        //Alert succes download
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Factura descargada con exito!',
          showConfirmButton: false,
          timer: 2000
        }) 

      }).catch(error =>{
        console.log("Error en la descarga del archivo", error);
      })
  }

  handleVisualizeClick(id){
    axios.get(`http://127.0.0.1:5000/factura_ingreso/download/${id}`, 
    { responseType: 'blob' },
    {withCredentials: true})
      .then(response => {
        const blob = new Blob([response.data], {type: response.data.type});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'unknown';
        if (contentDisposition) {
            let fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            let fileNameNull = contentDisposition.match(/filename=(.+)/);
            if (fileNameMatch !== null) {
              fileName = fileNameMatch[1]; 
              console.log("filename", fileName) 
              }else {
                fileName = fileNameNull[1];
                console.log("filename", fileName)
              }             
        }
        link.target = '_blank';
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }).catch(error =>{
        console.log("Error en la visualizacion del archivo", error);
      })
  }

  handleEditModalClick(id){
    this.setState({
      editModalIsOpen: true,
      idToEdit: id
    })
  }

  handleModalEditClose(){
    this.setState({
      editModalIsOpen: false,
      idToEdit: ""
    })
    this.getFacturasIng();
  }

  handleAcceptClick(id){
    console.log("prueba de accept", id)
    axios.put(`http://127.0.0.1:5000/factura_ingreso/accept/${id}`, {withCredentials: true}
    ).then(response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Factura aceptada con exito!',
        showConfirmButton: false,
        timer: 2000
    }) 
      this.getFacturasIng();
    }).catch(error => {
      console.log("Error aceppt Factura", error);
    })
  }

  handleRejectedClick(id){
    console.log("prueba de rejected", id)
    axios.put(`http://127.0.0.1:5000/factura_ingreso/rejected/${id}`, {withCredentials: true}
    ).then(response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Factura rechazada con exito!',
        showConfirmButton: false,
        timer: 2000
    }) 
      this.getFacturasIng();
    }).catch(error => {
      console.log("Error rejected Factura", error);
    })
  }

  handleAlertNotIdWork(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Recuerda seleccionar un usuario para trabajar',
      showConfirmButton: false,
      timer: 2000
    })
  }

  

  render() {
    let columns = [
      {
        name: 'Nº',
        width: "100px",
        selector: row => row.id,
        sortable: true,
    
      },
      {
        name: 'Estado',
        selector: row => row.estado_factura,
        sortable: true,
      },
      {
        name: 'Concepto',
        selector: row => row.concepto,
        sortable: true,
      },
      {
        name: 'Base Imp.',
        selector: row => row.base_imp,
        sortable: true,
      },
      {
        name: 'IVA',
        selector: row => row.iva,
        sortable: true,
      },
      {
        name: 'Total Ingreso',
        selector: row => row.total_ingreso,
        sortable: true,
      },
      {
        name: 'Fecha Ingreso',
        selector: row => row.fecha_ingreso,
        sortable: true,
        center: true
      },
      {
        name: 'Subido el',
        selector: row => row.fecha_subida,
        sortable: true,
        center: true
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleDownloadClick(row.id)} 
        title="Descargar Factura" className="Icon-datatable-green" icon="fa-solid fa-download"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleVisualizeClick(row.id)} 
        title="Ver Factura" className="Icon-datatable-teal" icon="fa-solid fa-eye"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleDeleteClick(row.id)} 
        title="Eliminar Factura" className="Icon-datatable-red" icon="fa-solid fa-trash"/>,
        center: true 
      },
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleEditModalClick(row.id)}
        title="Editar Factura" className="Icon-datatable-green" icon="fa-solid fa-file-pen"/>,
        center: true 
      },
    ]

    this.props.id_user_rol == 1 || this.props.id_user_rol == 2 ? columns.push(
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleAcceptClick(row.id)}
        title="Aceptar Factura" className="Icon-datatable-green" icon="fa-solid fa-circle-check"/>,
        center: true
      } , 
      {
        width: "40px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleRejectedClick(row.id)}
        title="Rechazar Factura" className="Icon-datatable-red" icon="fa-solid fa-circle-xmark"/>,
        center: true 
      }
      
    ) : null

    return(
        <div>
            {this.state.info.map(datos => {
            console.log("Facturas de Ingresos", datos); //QUITAR
            })}

            <div>
            <DataTable 
                columns={columns}
                data={this.state.info}
                // noDataComponent={<ModuloNoData />}
                pagination
                paginationPerPage = {15}
                paginationRowsPerPageOptions = {[15, 30, 45, 60, 80, 100]}
            />
            </div>
            <div>
              <ModalEditFacIngreso 
                handleModalEditClose={this.handleModalEditClose}
                modalIsOpen={this.state.editModalIsOpen}
                idToEdit={this.state.idToEdit}
              />
            </div>
        </div>
    )
  }
}