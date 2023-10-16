import React, {Component} from "react";
import axios from "axios";




export default class FormFacturaIngreso extends Component {
    constructor(){
        super();

        this.state ={
            concepto: "",
            fecha_ingreso: "",
            fecha_subida: "",
            base_imp: "1200",
            iva: "",
            total_ingreso: "",
            archivo: "",
            estado_factura: "PENDIENTE",
            id_factura_usuario: "1"

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let datos = new FormData();
      
        datos.append("concepto", this.state.concepto);
        datos.append("fecha_ingreso", this.state.fecha_ingreso);
        datos.append("fecha_subida", this.state.fecha_ingreso);
        datos.append("base_imp", this.state.base_imp);
        datos.append("iva", this.state.iva);
        datos.append("total_ingreso", this.state.total_ingreso);
        datos.append("archivo", this.state.archivo);
        datos.append("estado_factura", this.state.estado_factura);
        datos.append("id_factura_usuario", this.state.id_factura_usuario);

        return datos;
      }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        axios.post('http://127.0.0.1:5000/factura_ingreso/add', 
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            console.log("respuesta subida", response);
        }).catch(error => {
            console.log("error subida", error);
        })

        //console.log(this.buildForm());

        //this.buildForm();
        event.preventDefault();
    }

    render(){
        return(
            <div className="form-addfactura-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="concepto"
                            placeholder="Concepto"
                            value={this.state.concepto}
                            onChange={this.handleChange}
                        />

                        <input
                            type="date"
                            name="fecha_ingreso"
                            placeholder="Fecha del ingreso"
                            value={this.state.fecha_ingreso}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="iva"
                            placeholder="IVA"
                            value={this.state.iva}
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            name="total_ingreso"
                            placeholder="Total ingreso"
                            value={this.state.total_ingreso}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <div>
                        <h3>Calculos aqui</h3>    
                        </div>

                        <input
                            type="text"
                            name="archivo"
                            placeholder="Archivo"
                            value={this.state.archivo}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <button type="submit">Añadir Ingreso</button>
                    </div>
                </form>
            </div>



        );
    }
}