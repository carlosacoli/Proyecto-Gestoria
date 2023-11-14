import React, { Component } from "react";
import axios from 'axios';


export default class ModuloImpuestos extends Component {
  constructor(props){
    super(props);


    this.state = {
        // trimestre: "Enero - Marzo ",
        año: " 2023",
        total_ingresos: "",
        total_iva_ingresos: "",
        total_gastos: "",
        total_iva_gastos: "",
        irpf: "3",
        irpf_declarar: "",
        iva_declarar: ""
    }

    this.handleIvaDeclarar = this.handleIvaDeclarar.bind(this);
    this.handleChangeIrpf = this.handleChangeIrpf.bind(this);
  }  

  getSumTotalIngreso(){
    axios.get(`http://127.0.0.1:5000/factura_ingreso/sum_totalingreso/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de suma total operaciones ingreso", response); //QUITAR
      this.setState({
        total_ingresos: response.data
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getSumTotalIngreso",error);
    });
  }

  getSumTotalIvaIngreso(){
    axios.get(`http://127.0.0.1:5000/factura_ingreso/sum_ivaingreso/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de suma total iva ingreso", response); //QUITAR
      this.setState({
        total_iva_ingresos: response.data
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getSumTotalIvaIngreso",error);
    });
  }

  getSumTotalGasto(){
    axios.get(`http://127.0.0.1:5000/factura_gasto/sum_totalgasto/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de suma total operaciones gasto", response); //QUITAR
      this.setState({
        total_gastos: response.data
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getSumTotalGasto",error);
    });
  }

  getSumTotalIvaGasto(){
    axios.get(`http://127.0.0.1:5000/factura_gasto/sum_ivagasto/${this.props.id_user_work}`, {withCredentials: true})
    .then(response => {
    // handle success
      console.log("respuesta de suma total iva gasto", response); //QUITAR
      this.setState({
        total_iva_gastos: response.data
      });
    })
    .catch(error=> {
      // handle error
      console.log("error funcion getSumTotalIvaGasto",error);
    });
  }

  componentDidMount(){
    this.getSumTotalIngreso();
    this.getSumTotalIvaIngreso();
    this.getSumTotalGasto();
    this.getSumTotalIvaGasto();
  }

  handleChangeIrpf(event){
    this.setState({
        [event.target.name]: event.target.value,
    })
  }

    handleIvaDeclarar(){
        return (
            (this.state.total_iva_gastos) === ""  || (this.state.total_iva_gastos) === null  ?
            (this.state.total_iva_ingresos)
            :
            (parseFloat(this.state.total_iva_ingresos) - parseFloat(this.state.total_iva_gastos)).toFixed(2)
        )
    }
    
    handleIrpfDeclarar(){
        return (
            (this.state.total_ingresos) === "" || (this.state.total_ingresos) === null ?
            ""
            :
            (parseFloat(this.state.total_ingresos) * (parseFloat(this.state.irpf) / 100)).toFixed(2)
        )
    }

  render() {
        const datoiva = (parseFloat(this.state.total_iva_ingresos) - parseFloat(this.state.total_iva_gastos)).toFixed(2)
        console.log(datoiva)
    return(
        <div>
            <div className="title-impuestos">
            Impuestos Trimestre: {this.state.año} 
            </div>
            <div>
            </div>
            <div className="table-grid-impuestos">
                <div>
                    <div className="title-table-grid-impuestos">
                        Calculos del Trimestre
                    </div>
                    <div className="data-table-grid-impuestos">
                        Volumen de operaciones del trimestre: <span>{this.state.total_ingresos}€</span>
                    </div>
                    <div className="data-table-grid-impuestos">
                        Iva del volumen de operaciones: <span>{this.state.total_iva_ingresos}€</span>
                    </div>
                    <div className="data-table-grid-impuestos">
                        Base Imponible de Gastos de operaciones del trimestre: <span>{this.state.total_gastos}€</span>
                    </div>
                    <div className="data-table-grid-impuestos">
                        IVA deducible de operaciones del trimestre: <span>{this.state.total_iva_gastos}€</span>
                    </div>
                </div>
                <div>
                    <div className="title-table-grid-impuestos">
                        Calculos de los Impuestos
                    </div>
                    <div className="data-table-grid-impuestos">
                        Seleccione el porcentaje de IRPF que desea declarar
                        <select  
                            type="text"
                            className="select-impuestos"
                            name="irpf"
                            value={this.state.irpf}
                            onChange={this.handleChangeIrpf}
                        >
                            <option value="3" >3</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="data-table-grid-impuestos">
                        Total IRPF a declarar: <span>{this.handleIrpfDeclarar()}€</span>
                    </div>
                    <div className="data-table-grid-impuestos">
                        Total IVA a declarar: 
                        <span>
                            {this.handleIvaDeclarar()}€
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
  }
}