import React, { Component } from "react";
import axios from "axios";

export default class FormEditUser extends Component {
    constructor(props){
        super(props);

        this.state={
            idUserEdit: this.props.idToEdit,
            nombre: "",
            apellidos: "",
            provincia: "",
            ciudad: "",
            direccion: "",
            telefono: "",
            email: ""
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
                nombre_usuario,
                apellidos_usuario,
                provincia_usuario,
                ciudad_usuario,
                direccion_usuario,
                telefono_usuario,
                email_usuario
            } = response.data[0];

            this.setState({
                nombre: nombre_usuario,
                apellidos: apellidos_usuario,
                provincia: provincia_usuario,
                ciudad: ciudad_usuario,
                direccion: direccion_usuario,
                telefono: telefono_usuario,
                email: email_usuario
            })
        })     
    }

    buildForm() {
        let datos = new FormData();
        datos.append("nombre", this.state.nombre);
        datos.append("apellidos", this.state.apellidos);
        datos.append("provincia", this.state.provincia);
        datos.append("ciudad", this.state.ciudad);
        datos.append("direccion", this.state.direccion);
        datos.append("telefono", this.state.telefono);
        datos.append("email", this.state.email);

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
                    <h1 className="titulo-form">Editar Usuario Nº{this.state.idUserEdit}</h1>
                    <div className="two-column">
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

                        <label>
                            Apellidos
                            <input
                                type="text"
                                name="apellidos"
                                value={this.state.apellidos}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="two-column">
                    <label>
                            Provincia
                            <select
                                type="text"
                                name="provincia"
                                value={this.state.provincia}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="Álava">Álava</option>
                                <option value="Albacete">Albacete</option>
                                <option value="Alicante">Alicante</option>
                                <option value="Almeria">Almeria</option>
                                <option value="Asturias">Asturias</option>
                                <option value="Ávila">Ávila</option>
                                <option value="Badajoz">Badajoz</option>
                                <option value="Barcelona">Barcelona</option>
                                <option value="Bizkaia">Bizkaia</option>
                                <option value="Burgos">Burgos</option>
                                <option value="Cáceres">Cáceres</option>
                                <option value="Cádiz">Cádiz</option>
                                <option value="Cantabria">Cantabria</option>
                                <option value="Castellón">Castellón</option>
                                <option value="Ciudad Real">Ciudad Real</option>
                                <option value="Córdoba">Córdoba</option>
                                <option value="La Coruña">La Coruña</option>
                                <option value="Cuenca">Cuenca</option>
                                <option value="Gerona">Gerona</option>
                                <option value="Granada">Granada</option>
                                <option value="Guadalajara">Guadalajara</option>
                                <option value="Gipuzkoa">Gipuzkoa</option>
                                <option value="Huelva">Huelva</option>
                                <option value="Huesca">Huesca</option>
                                <option value="Islas Baleares">Islas Baleares</option>
                                <option value="Jaén">Jaén</option>
                                <option value="León">León</option>
                                <option value="Lérida">Lérida</option>
                                <option value="Lugo">Lugo</option>
                                <option value="Madrid">Madrid</option>
                                <option value="Málaga">Málaga</option>
                                <option value="Murcia">Murcia</option>
                                <option value="Navarra">Navarra</option>
                                <option value="Ourense">Ourense</option>
                                <option value="Palencia">Palencia</option>
                                <option value="Las Palmas">Las Palmas</option>
                                <option value="Pontevedra">Pontevedra</option>
                                <option value="La Rioja">La Rioja</option>
                                <option value="Salamanca">Salamanca</option>
                                <option value="Segovia">Segovia</option>
                                <option value="Sevilla">Sevilla</option>
                                <option value="Soria">Soria</option>
                                <option value="Tarragona">Tarragona</option>
                                <option value="Tenerife">Tenerife</option>
                                <option value="Teruel">Teruel</option>
                                <option value="Toledo">Toledo</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Zamora">Zamora</option>
                                <option value="Zaragoza">Zaragoza</option>
                            </select> 
                        </label>

                        <label>
                            Ciudad
                            <input
                                type="text"
                                name="ciudad"
                                value={this.state.ciudad}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>
                    </div>

                    <div className="two-column">
                        <label>
                            Dirección
                            <input
                                type="text"
                                name="direccion"
                                value={this.state.direccion}
                                onChange={this.handleChange}
                                required
                                autoComplete="off"
                            />
                        </label>

                        <label>
                            Telefono
                            <input
                                type="tel"
                                name="telefono"
                                value={this.state.telefono}
                                onChange={this.handleChange}
                                required
                                minlength="9"
                                maxlength="14"
                            />
                        </label>
                    </div>

                    <div className="two-column">
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


                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Actualizar Usuario</button>
                    </div>
                </form>
            </div>    
        );
    }
}