import React, {Component} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from 'moment';

import InvoiceImage from '../../../static/assets/imagenes/payment.jpg';

export default class FormFacturaGasto extends Component {
    constructor(props){
        super(props);

        this.state ={
            concepto: "",
            fecha_gasto: "",
            fecha_subida: moment().format("DD/MM/YYYY"),
            base_imp: "",
            iva: "",
            total_gasto: "",
            archivo: "",
            estado_factura: "PENDIENTE",
            id_factura_usuario: props.id_user_work
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
    }

    buildForm() {
        let datos = new FormData();

        datos.append("concepto", this.state.concepto);
        datos.append("fecha_gasto", moment(this.state.fecha_gasto).format("DD/MM/YYYY"));
        datos.append("fecha_subida", this.state.fecha_subida);
        datos.append("base_imp", ((this.state.total_gasto) - (this.state.iva)));
        datos.append("iva", this.state.iva);
        datos.append("total_gasto", this.state.total_gasto);
        datos.append("archivo", this.state.archivo);
        datos.append("estado_factura", this.state.estado_factura);
        datos.append("id_factura_usuario", this.state.id_factura_usuario);

        const data = Object.fromEntries(datos); //IMPORTANT!
        console.log("ver aqui",data);
        // const datajson = JSON.stringify(data);
        // console.log(datajson);
        return datos;
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleChangeFile(event) {
        this.setState({
            archivo: (event.target.files[0]),
        })
    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Factura registrada con exito!',
            showConfirmButton: false,
            timer: 2000
        }) 
    }

    handleSubmit(event){
        axios.post('http://127.0.0.1:5000/factura_gasto/add',
        this.buildForm(),
        {headers: {'Content-Type': 'multipart/form-data'}},
        {withCredentials: true}
        ).then(response => {
            this.handleAlert();
            this.props.history.push("/facturas-gastos");
        }).catch(error => {
            console.log("error subida", error);
        })

        console.log(this.buildForm());
        event.preventDefault();
    }

    handleBaseImp(){
        return (
            (this.state.total_gasto) === "" ?
                ""
            :
                (parseFloat(this.state.total_gasto) - parseFloat(this.state.iva)).toFixed(2)
        )
    }

    render(){
        return(
            <div className="form-addfactura-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-column">
                        {/* <h2>Nueva Factura de Ingreso</h2> */}
                        <label>
                            Concepto
                            <input
                                type="text"
                                name="concepto"
                                value={this.state.concepto}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>

                        <label>
                            Fecha de Gasto
                            <input
                                type="date"
                                name="fecha_gasto"
                                value={this.state.fecha_gasto}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="two-column">
                        <label>
                            IVA
                            <input
                                type="text"
                                name="iva"
                                value={this.state.iva}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>

                        <label>
                            Total Gasto
                            <input
                                type="text"
                                name="total_gasto"
                                value={this.state.total_gasto}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <div className="one-column">
                        <div className="calculos-factura">
                            <h2>Calculos de la factura:</h2>
                            <p>Base Imponible: {this.handleBaseImp()}
                            </p>
                            <p>IVA: {this.state.iva}</p>
                            <p>Total Gasto: {this.state.total_gasto}</p>
                        </div>
                    </div>

                    <div className="one-column">
                        <input
                            type="file"
                            id="file_input"
                            name="archivo"
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={this.handleChangeFile}
                            required
                        />
                    </div>
                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Añadir Gasto</button>
                    </div>
                </form>
                <div
                    className='payment-img'
                    style={{
                        backgroundImage: `url(${InvoiceImage})`
                    }}
                />
            </div>



        );
    }
}