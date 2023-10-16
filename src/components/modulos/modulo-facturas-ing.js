import React, { Component } from "react";
import axios from 'axios';
import 'styled-components'
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Estado',
    selector: row => row.estado_factura,
    sortable: true
  },
  {
    name: 'Concepto',
    selector: row => row.concepto,
    sortable: true
  },
  {
    name: 'Base Imp.',
    selector: row => row.base_imp,
    sortable: true
  },
  {
    name: 'IVA',
    selector: row => row.iva,
    sortable: true
  },
  {
    name: 'Total Gasto',
    selector: row => row.total_ingreso,
    sortable: true
  },
  {
    name: 'Fecha',
    selector: row => row.fecha_ingreso,
    sortable: true
  },
  {
    name: 'Subido el',
    selector: row => row.fecha_subida,
    sortable: true
  },
  {
    name: 'Archivo',
    selector: row => row.archivo,
    sortable: true
  },
]


export default class ModuloFacturasIngresos extends Component {
  constructor(){
    super();

    this.state = {
      PaginaTitulo: "Mis Facturas",
      isLoading: false,
      data: []
    };

    this.getFacturas = this.getFacturas.bind(this);
  }  
    
  getFacturas(){
    axios.get('http://127.0.0.1:5000/factura_ingreso/get')
    .then(response => {
    // handle success
      console.log("respuesta de datos de facturas", response);
      var datos = response.data
      this.setState({
        data: datos
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getFacturas",error);
    });
  }

  componentDidMount(){
    this.getFacturas();
  }

  render() {
    return(
        <div>
            {this.state.data.map(dato => {
            console.log("Facturas de Ingresos", dato);
            })}

            <div>
            <DataTable 
                columns={columns}
                data={this.state.data}
                pagination
            />
            </div>
        </div>
    )
  }
}