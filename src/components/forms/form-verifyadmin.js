import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default class FormEditUser extends Component {
    constructor(props){
        super(props);

        this.state={
            idUserEdit: this.props.idToEdit,
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    componentDidMount(){
        this.getUserEdit();
    }

    getUserEdit(){
        axios.get(`https://gestoria-db-09ec50f82e6d.herokuapp.com/usuario/get_edit/${this.state.idUserEdit}`, {withCredentials: true}
        ).then(response => {
            console.log("respuesta de datos del usuario a editar", response);
            console.log("respuesta de data", response.data[0]); //QUITAR
            const {
                email_usuario,
                password

            } = response.data[0];

            this.setState({
                email: email_usuario,
                password: password
            })
        })     
    }

    buildForm() {
        let datos = new FormData();
        datos.append("email", this.state.email);
        datos.append("password", this.state.password);

        return datos;
    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario actualizado con exito!',
            showConfirmButton: false,
            timer: 1500
        }) 
    }

    handleSubmit(event){
        axios.patch(`https://gestoria-db-09ec50f82e6d.herokuapp.com/usuario/update/${this.state.idUserEdit}`,
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            console.log("usuario actualizado", response);
            this.handleAlert();
            this.props.handleCloseModal();
        }).catch(error => {
            console.log("error actualizacion de usuario", error);
        })

        event.preventDefault();
    }

    render() {
        return (
            <div className="form-editfactura-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="titulo-form">Verificar Credenciales de Administrador</h1>
                    <div className="one-column">
                        <label>
                            Correo Electrónico
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    
                    <div className="one-column">
                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    


                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Verificar Credenciales</button>
                    </div>
                </form>
            </div>    
        );
    }
}