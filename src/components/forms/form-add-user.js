import React, {Component} from "react";
import axios from "axios";
import moment from 'moment';

import UserImage from '../../../static/assets/imagenes/users.jpg';

export default class FormAddUser extends Component {
    constructor(props){
        super(props);

        this.state ={
            nombre: "",
            apellidos: "",
            provincia: "Álava",
            ciudad: "",
            direccion: "",
            telefono: "",
            email: "",
            password: "",
            fecha_creacion: moment().format("DD/MM/YYYY"),
            id_rol_usuario: "1"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
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
        datos.append("password", this.state.password);
        datos.append("fecha_creacion",this.state.fecha_creacion);
        datos.append("id_rol_usuario", this.state.id_rol_usuario);

        return datos;
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleAlert(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario registrado con exito!',
            showConfirmButton: false,
            timer: 2000
        }) 
    }

    handleSubmit(event){
        axios.post('https://gestoria-db-09ec50f82e6d.herokuapp.com/usuario/add',
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            console.log("Usuario creado", response);
            this.handleAlert();
            this.props.history.push("/gestion-users");
        }).catch(error => {
            console.log("error creacion de usuario", error);
        })

        console.log(this.buildForm());
        event.preventDefault();
    }

    render(){
        return(
            <div className="form-addfactura-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className="two-column">
                        {/* <h2>Nueva Factura de Ingreso</h2> */}
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
                                autoComplete="off"
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
                                // className="select-element"
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
                            Direccion
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
                                autoComplete="off"
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

                        <label>
                            Contraseña
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

                    <label>
                        Rol Usuario
                            <select
                                type="text"
                                name="id_rol_usuario"
                                value={this.state.id_rol_usuario}
                                onChange={this.handleChange}
                                // className="select-element"
                            >
                                <option value="1">Administrador</option>
                                <option value="2">Gestor</option>
                                <option value="3">Usuario</option>
                            </select>
                    </label>

                    <div className="boton-wrapper">
                        <button type="submit" className="boton">Crear Usuario</button>
                    </div>
                </form>
                <div
                    className='payment-img'
                    style={{
                        backgroundImage: `url(${UserImage})`
                    }}
                />
            </div>



        );
    }
}