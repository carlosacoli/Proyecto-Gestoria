import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import moment from "moment";
// import 'styled-components'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import ModuloNoData from "../pages/no-data";


export default class ModuloDocumentos extends Component {
  constructor(props){
    super(props);

    this.state = {
      info: [],
      idToEdit: "",
    };

    this.getDocumentos = this.getDocumentos.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
    this.handleAlertNotIdWork = this.handleAlertNotIdWork.bind(this);
  }  
    
  getDocumentos(){
    axios.get(`http://127.0.0.1:5000/documento/get/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de documentos", response); //QUITAR
      var datos = response.data
      this.setState({
        info: datos,
      });
      this.props.stopReload();
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getDocumentos",error);
    });
  }

  componentDidMount(){
    this.getDocumentos();
    if (this.props.id_user_work == "" || this.props.id_user_work == undefined){ 
      this.handleAlertNotIdWork();
    }
  }

  handleDeleteClick(id){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar el documento?',
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
        axios.delete(`http://127.0.0.1:5000/documento/delete/${id}`, {withCredentials: true})
          .then(response => {
            console.log("Documento eliminado correctamente", response);
            Swal.fire({
              confirmButtonColor: '#28a745',
              title: 'Eliminada!',
              text: 'El documento ha sido eliminado correctamente!',
              icon: 'success'
            })
            this.getDocumentos();
          }).catch(error => {
            console.log("Error delete documento", error);
          });
      } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            confirmButtonColor: '#28a745',
            title:'Cancelado',
            text:'El documento esta a salvo :)',
            icon:'error'
          })
        }
    })  
  }

    handleDownloadClick(id){
        axios.get(`http://127.0.0.1:5000/documento/download/${id}`, 
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Documento descargado con exito!',
              showConfirmButton: false,
              timer: 2000
            }) 
    
          }).catch(error =>{
            console.log("Error en la descarga del archivo", error);
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

    this.props.eventReload === true ? this.getDocumentos() : null

    const columns = [
      {
        name: 'Nombre Documento',
        minWidth: "400px",
        cell: (row) => <div className="download-documento-wrapper" onClick={() => this.handleDownloadClick(row.id)}>
                            <FontAwesomeIcon className="Icon-download-documento" icon="fa-solid fa-circle-down" />{row.nombre_documento}
                        </div>,
        sortable: true,
      },
      {
        name: 'Comentario',
        minWidth: "600px",
        selector: row => row.comentario,
        sortable: true,
      },
      {
        name: 'Fecha Subida',
        selector: row => moment(row.fecha_subida).format('LL'), 
        sortable: true,
      },
      {
        name: 'Subido Por',
        selector: row => row.id_rol_upload, 
        sortable: true,
      },
    ]

    this.props.id_user_rol == 1 || this.props.id_user_rol == 2 ? columns.push(
      {
        width: "30px",
        cell: (row) => <FontAwesomeIcon onClick={() => this.handleDeleteClick(row.id)} 
        title="Eliminar Documento" className="Icon-datatable-red" icon="fa-solid fa-file-circle-xmark"/>,
        center: true
      },
      
    ) : null

    return(
        <div>
            {this.state.info.map(datos => {
            console.log("Datos de Documentos", datos); //QUITAR
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
        </div>
    )
  }
}