import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default class FormEditFactIngreso extends Component {
    constructor(props){
        super(props);

        this.state={
            idFacturaEdit: this.props.idToEdit,
            concepto: "",
            fecha_ingreso: "",
            base_imp: "",
            iva: "",
            total_ingreso: "",
            archivo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidMount(){
        this.getFacturaEdit();
    }

    getFacturaEdit(){
        //Axios get file
        axios.get(`https://gestoria-db-09ec50f82e6d.herokuapp.com/factura_ingreso/download/${this.state.idFacturaEdit}`, 
        { responseType: 'blob' },
        {withCredentials: true})
        .then(response => {
            // handle success
            console.log("respuesta del file de la factura a editar", response);
            console.log("respuesta del file data", response.data); //QUITAR
            //Obtener Filename formateado
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
            //Convertir file de formato BLOB a FIle y enviar a Input File
            const file = new File([response.data], fileName);
            const container = new DataTransfer();
            container.items.add(file);
            document.querySelector('#file_input').files = container.files;
            //Actualizar state archivo, con file
            this.setState({
                archivo : file
            })
        })
        .catch(error=> {
          // handle error
          console.log("error funcion getFileEdit",error);
        });

        axios.get(`https://gestoria-db-09ec50f82e6d.herokuapp.com/factura_ingreso/get_edit/${this.state.idFacturaEdit}`, {withCredentials: true}
        ).then(response => {
            console.log("respuesta de datos de la factura a editar", response);
            console.log("respuesta de data", response.data[0]); //QUITAR
            const {
                concepto,
                fecha_ingreso,
                base_imp,
                iva,
                total_ingreso,
            } = response.data[0];

            this.setState({
                concepto: concepto,
                fecha_ingreso: fecha_ingreso,
                base_imp: base_imp,
                iva: iva,
                total_ingreso: total_ingreso,
            })
        })     
    }

    buildForm() {
        let datos = new FormData();
        datos.append("concepto", this.state.concepto);
        datos.append("fecha_ingreso", moment(this.state.fecha_ingreso).format("DD/MM/YYYY"));
        datos.append("base_imp", ((parseFloat(this.state.total_ingreso) - parseFloat(this.state.iva)).toFixed(2)));
        datos.append("iva", this.state.iva);
        datos.append("total_ingreso", this.state.total_ingreso);
        datos.append("archivo", this.state.archivo);
        return datos;

    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Factura actualizada con exito!',
            showConfirmButton: false,
            timer: 1500
        }) 
    }

    handleSubmit(event){
        axios.patch(`https://gestoria-db-09ec50f82e6d.herokuapp.com/factura_ingreso/update/${this.state.idFacturaEdit}`,
        this.buildForm(),

        {headers: {'Content-Type': 'multipart/form-data'}},
        {withCredentials: true}
        ).then(response => {
            console.log("factura actualizada", response);
            this.handleAlert();
            this.props.handleCloseModal();
        }).catch(error => {
            console.log("error actualizacion", error);
        })

        event.preventDefault();
    }

    handleBaseImp(){
        return (
            (this.state.total_ingreso) === "" ?
                ""
            :
                (parseFloat(this.state.total_ingreso) - parseFloat(this.state.iva)).toFixed(2)
        )
    }

    
    render() {
        return (
            <div className="form-editfactura-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="titulo-form">Editar Factura de Ingreso Nº{this.state.idFacturaEdit}</h1>
                    <div className="two-column">
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
                            Fecha de Ingreso
                            <input
                                type="date"
                                name="fecha_ingreso"
                                value={this.state.fecha_ingreso}
                                onChange={this.handleChange}
                                required
                                min="2022-01-01" 
                                max={moment().format("YYYY-MM-DD")}
                            />
                        </label>
                    </div>

                    <div className="two-column">
                        <label>
                            IVA
                            <input
                                type="number"
                                name="iva"
                                value={this.state.iva}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                                step="0.01"
                            />
                        </label>

                        <label>
                            Total Ingreso
                            <input
                                type="number"
                                name="total_ingreso"
                                value={this.state.total_ingreso}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                                step="0.01"
                            />
                        </label>
                    </div>

                    <div className="one-column">
                        <div className="calculos-factura">
                            <h2>Calculos de la factura:</h2>
                            <p>Base Imponible: {this.handleBaseImp()}
                            </p>
                            <p>IVA: {this.state.iva}</p>
                            <p>Total Ingreso: {this.state.total_ingreso}</p>
                        </div>
                    </div>

                    <div className="one-column">
                        <input
                            type="file"
                            id="file_input"
                            name="archivo"
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={this.handleChangeFile}
                        />
                    </div>
                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Actualizar Factura</button>
                    </div>
                </form>
            </div>    
        );
    }
}