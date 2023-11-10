import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class FormViewUser extends Component {
    constructor(props){
        super(props);

        this.state={
            idUserView: this.props.idToEdit,
            nombre: "",
            apellidos: "",
            provincia: "",
            ciudad: "",
            direccion: "",
            telefono: "",
            fecha_creacion: "",
            email: "",
            id_rol_usuario: ""
        }

        this.handleChange = this.handleChange.bind(this);
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
        axios.get(`https://gestoria-db-09ec50f82e6d.herokuapp.com/usuario/get_view/${this.state.idUserView}`, {withCredentials: true}
        ).then(response => {
            console.log("respuesta de datos del usuario a visualizar", response);
            console.log("respuesta de data", response.data[0]); //QUITAR
            const {
                nombre_usuario,
                apellidos_usuario,
                provincia_usuario,
                ciudad_usuario,
                direccion_usuario,
                telefono_usuario,
                fecha_creacion,
                email_usuario,
                id_rol_usuario
            } = response.data[0];

            this.setState({
                nombre: nombre_usuario,
                apellidos: apellidos_usuario,
                provincia: provincia_usuario,
                ciudad: ciudad_usuario,
                direccion: direccion_usuario,
                telefono: telefono_usuario,
                fecha_creacion: fecha_creacion,
                email: email_usuario,
                id_rol_usuario: id_rol_usuario
            })
        })     
    }

    render() {
        return (
            <div className="form-viewuser-wrapper">
                <form>
                    <h1 className="titulo-form">Información del Usuario Nº{this.state.idUserView}</h1>
                    <div className="two-column">
                        <div className="column-left">
                            Nombre:
                        </div>
                        <div className="column-right">
                            {this.state.nombre}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Apellidos:  
                        </div>
                        <div className="column-right">
                            {this.state.apellidos}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Provincia:
                        </div>
                        <div className="column-right">
                            {this.state.provincia}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Ciudad:  
                        </div>
                        <div className="column-right">
                            {this.state.ciudad}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Dirección:
                        </div>
                        <div className="column-right">
                            {this.state.direccion}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Telefono:  
                        </div>
                        <div className="column-right">
                            {this.state.telefono}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Fecha de Creación:
                        </div>
                        <div className="column-right">
                            {moment(this.state.fecha_creacion).format('LL')}
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Correo Electrónico:  
                        </div>
                        <div className="column-right">
                            {this.state.email} 
                        </div>
                    </div>

                    <div className="two-column">
                        <div className="column-left">
                            Rol de Usuario:  
                        </div>
                        <div className="column-right">
                            {this.state.id_rol_usuario}
                        </div>
                    </div>
                </form>
            </div>    
        );
    }
}