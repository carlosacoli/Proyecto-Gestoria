import React, { Component } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state= {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowError = this.handleShowError.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    handleSubmit(event) {
        axios.post('https://gestoria-db-09ec50f82e6d.herokuapp.com/verify',
        {
            email_usuario: this.state.email,
            password: this.state.password
        },
        {withCredentials: true}
        ).then(response => {
            console.log("respuesta", response);
            if (response.data.msg === "OK") {
                localStorage.clear();
                localStorage.setItem("jwt-token-gc", response.data.token);
                console.log("Puedes acceder"); //<---QUITAR

                this.props.handleSuccessfulAuth();
                return response;
            } 
            if (response.data.msg === "Wrong Email") {
                this.setState ({
                    errorText: "Email incorrecto"
                });
                this.props.handleUnsuccessfulAuth();
                this.handleShowError();

            }
            if (response.data.msg === "Wrong Password") {
                this.setState ({
                    errorText: "Password incorrecto"
                });
                this.props.handleUnsuccessfulAuth();
            }   
        }).catch(error => {
            console.log("error en axios", error);
            this.setState({
                errorText: "Ha ocurrido un error en el sistema!"
            });
            this.props.handleUnsuccessfulAuth();
        })
        event.preventDefault();
    }

    handleShowError(){
        return(
            <div className="error-login">
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
                    {this.state.errorText} 
                <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
            </div>
        )
    }

    render() {
        return (
            <div className="login-element">
                <h1>Login - Gestoria Colina</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="email"
                        name="email" 
                        placeholder="Tu Correo Electronico"
                        value={this.state.email}
                        onChange={this.handleChange}

                    />

                     <input 
                        type="password"
                        name="password" 
                        placeholder="Tu Contraseña"
                        value={this.state.password}
                        onChange={this.handleChange}

                    /> 

                    {this.state.errorText !== "" ? this.handleShowError() : null }

                    <div className="boton-wrapper">
                        <button className="boton" type="submit">Iniciar Sesion</button>
                    </div> 
                </form>
            </div>
        )
    }
}