import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class FormAdminChangePass extends Component {
    constructor(props){
        super(props);

        this.state={
            idUserEdit: this.props.idToEdit,
            showError: false,
            nombre: "",
            apellidos: "",
            email: "",
            password: "",
            rep_password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            showError: false
        })
    }

    componentDidMount(){
        this.getUserEdit();
    }

    getUserEdit(){
        axios.get(`http://127.0.0.1:5000/usuario/get_edit/${this.state.idUserEdit}`, {withCredentials: true}
        ).then(response => {
            console.log("respuesta de datos del usuario a editar", response);
            console.log("respuesta de data", response.data[0]); //QUITAR
            const {
                nombre_usuario,
                apellidos_usuario,
                email_usuario
            } = response.data[0];

            this.setState({
                nombre: nombre_usuario,
                apellidos: apellidos_usuario,
                email: email_usuario
            })
        })     
    }

    buildForm() {
        let datos = new FormData();
        datos.append("password", this.state.password);

        return datos;
    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contraseña Actualizada con exito!',
            showConfirmButton: false,
            timer: 1500
        }) 
    }

    handleShowErrorPassword(){
        return(
            <div className="error-change-pass">
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                    Las Contraseñas escritas no coinciden
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
            </div>
        )
    }

    handleSubmit(event){
        if (this.state.password !== this.state.rep_password){
            this.setState({
                showError: true,
            })
            event.preventDefault();
        }else{
            axios.patch(`http://127.0.0.1:5000/usuario/update_password/${this.state.idUserEdit}`,
            this.buildForm(),
            {withCredentials: true}
            ).then(response => {
                console.log("Contraseña Cambiada exitosamente", response);
                this.handleAlert();
                this.props.handleCloseModal();
            }).catch(error => {
                console.log("error cambio de contraseña", error);
            })
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="form-changepass-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="titulo-form">Cambiar Contraseña del Usuario Nº {this.state.idUserEdit}</h1>
                    <div className="datos-user-changepass">
                        <div><p>Nombre y Apellidos: <span>{`${this.state.nombre}  ${this.state.apellidos}`}</span></p></div>
                        <div><p>Email: <span>{this.state.email}</span></p> </div>
                    </div>
                    
                    <div className="one-column-center">
                        <label>
                            Nueva Contraseña
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    
                    <div className="one-column-center">
                        <label>
                            Repetir Contraseña
                            <input
                                type="password"
                                name="rep_password"
                                value={this.state.rep_password}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    {this.state.showError == true ? this.handleShowErrorPassword() : null}
                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Cambiar Contraseña</button>
                    </div>
                </form>
            </div>    
        );
    }
}