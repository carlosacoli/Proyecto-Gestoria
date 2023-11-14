import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class FormAddDocumento extends Component {
    constructor(props){
        super(props);

        this.state={
            nombre: "",
            comentario: "",
            documento: "",
            fecha_subida: moment().format("DD/MM/YYYY"),
            rol_upload: this.props.id_user_rol,
            id_documento_user: this.props.id_user_work
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
            documento: (event.target.files[0]),
        })
    }

    buildForm() {
        let datos = new FormData();
        datos.append("nombre", this.state.nombre);
        datos.append("comentario", this.state.comentario);
        datos.append("documento", this.state.documento);
        datos.append("fecha_subida", this.state.fecha_subida);
        datos.append("rol_upload", this.state.rol_upload);
        datos.append("id_documento_user", this.state.id_documento_user);

        return datos;
    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Documento subido con exito!',
            showConfirmButton: false,
            timer: 1500
        }) 
    }

    handleSubmit(event){
        axios.post('https://gestoria-db-09ec50f82e6d.herokuapp.com/documento/add',
        this.buildForm(),
        {headers: {'Content-Type': 'multipart/form-data'}},
        {withCredentials: true}
        ).then(response => {
            console.log("respuesta subida", response);
            this.handleAlert();
            this.props.handleCloseModal();
            this.props.handleReload();
            
            // window.location.reload()
            // location.assign("/documentos");
            // this.props.history.push("/documentos");
        }).catch(error => {
            console.log("error subida de documento", error);
        })

        console.log(this.buildForm());
        event.preventDefault();
    }

    render() {
        return (
            <div className="form-adddocumento-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="titulo-form">Añadir Documento</h1>
                    <div className="one-column">
                        <label>
                            Nombre
                            <input
                                type="text"
                                name="nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <div className="one-column">
                        <label>
                            Comentario
                            <input
                                type="text"
                                name="comentario"
                                value={this.state.comentario}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <div className="one-column">
                        <input
                            type="file"
                            id="file_input"
                            name="documento"
                            accept=".png, .jpg, .jpeg, .pdf"
                            onChange={this.handleChangeFile}
                            required
                        />
                    </div>

                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Subir Documento</button>
                    </div>
                </form>
            </div>    
        );
    }
}