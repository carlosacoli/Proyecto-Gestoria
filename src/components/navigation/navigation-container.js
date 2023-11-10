import React from 'react';
import { useState } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import Logo from "../../../static/assets/imagenes/logo.png";


const NavigationContainer = (props) =>{

    const [isActive, setIsActive] = useState(false);
    const [isActiveAdmin, setIsActiveAdmin] = useState(false);
    
    const dropdownStyle = {
        paddingLeft: '30px',
    };

    const dynamicLink = (route, linkText) =>{
        return(
            <div >
                <NavLink to={route} className="nav-link-wrapper" onClick={() => setIsActiveAdmin(!isActiveAdmin)}>
                    <div className="icon-navigation">
                        <FontAwesomeIcon icon="fa-solid fa-gears"  />
                    </div>
                    <div>
                        {linkText}
                    </div>
                    <div className="icon-dropdown">
                        <FontAwesomeIcon style={{ transform: isActiveAdmin ? "rotate(90deg)" : "rotate(0deg)" }} icon="chevron-right" />
                    </div>
                </NavLink>
                {isActiveAdmin ? 
                    <div>
                        <NavLink to="/trabajo-user" className="nav-link-wrapper" style={dropdownStyle}>
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="fa-solid fa-briefcase" />
                        </div>
                        <div>
                            Trabajar con...
                        </div>
                        </NavLink>
                        <NavLink to="/gestion-users" className="nav-link-wrapper" style={dropdownStyle}>
                            <div className="icon-navigation">
                                <FontAwesomeIcon icon="fa-solid fa-users-gear" />
                            </div>
                            <div>
                                Gestión de Usuarios
                            </div>
                        </NavLink>
                    </div>
                : null }  
            </div>
        );
    };

    const handleSignOut = () =>{
        Swal.fire({
            title: '¿Estas seguro que deseas cerrar sesion?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si, Deseo Cerrar Sesion',
            cancelButtonText: 'No, prefiero quedarme!',
            
          }).then(result => {
            if (result.isConfirmed) {
                localStorage.removeItem('jwt-token-gc');
                props.history.push("/auth")
                props.handleLogout();

                Swal.fire({
                    confirmButtonColor: '#28a745',
                    title: 'Sesion cerrada satisfactoriamente!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return(
            <div className="nav-wrapper">
                <div className="logo-navigation">
                    <img src={Logo}/>
                </div>
                <div className="user-activo">
                    <div><FontAwesomeIcon className="user-icon" icon="fa-solid fa-user" /></div> 
                    <div>{props.nombre} {props.apellidos}</div>
                </div>
                <hr />
                <div>
                    <NavLink exact to="/" className="nav-link-wrapper" activeClassName="nav-link-active" >
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="house" />
                        </div>
                        <div>
                            Home
                        </div>   
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/panel" className="nav-link-wrapper" activeClassName="nav-link-active">
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="chart-simple" />
                        </div>
                        <div>
                            Panel
                        </div>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="#" className="nav-link-wrapper" onClick={() => setIsActive(!isActive)}>
                            <div className="icon-navigation">
                                <FontAwesomeIcon icon="receipt" />
                            </div>
                            <div>
                                Mis Facturas
                            </div>
                            <div className="icon-dropdown">
                                <FontAwesomeIcon style={{ transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }} icon="chevron-right" />
                            </div>  
                        </NavLink>
                        {isActive ? 
                            <div>
                            <NavLink to="/facturas-ingresos" className="nav-link-wrapper" style={dropdownStyle}>
                                <div className="icon-navigation">
                                    <FontAwesomeIcon icon="money-bill-trend-up" />
                                </div>
                                <div>
                                    Facturas Ingresos
                                </div>
                            </NavLink>
                            <NavLink to="/facturas-gastos" className="nav-link-wrapper" style={dropdownStyle}>
                                <div className="icon-navigation">
                                    <FontAwesomeIcon icon="coins" />
                                </div>
                                <div>
                                    Facturas Gastos
                                </div>
                            </NavLink>
                            </div>
                        : null }
                </div>
                <div>
                    <NavLink to="/impuestos" className="nav-link-wrapper" activeClassName="nav-link-active">
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="euro-sign" />
                        </div>
                        <div>
                            Impuestos
                        </div>
                    </NavLink>
                </div>
                <div> 
                    <NavLink to="/documentos" className="nav-link-wrapper" activeClassName="nav-link-active">
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="folder-open" />
                        </div>
                        <div>
                            Documentos
                        </div>
                    </NavLink>
                </div>
                <div >
                    <NavLink to="/chatroom" className="nav-link-wrapper" activeClassName="nav-link-active">
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="comments" />
                        </div>
                        <div>
                            Chat con mi asesor
                        </div>
                    </NavLink>   
                </div>

                {props.id_rol === 1 || props.id_rol === 2 ? dynamicLink("#", "Gestiones Admin") : null }
                
                <div >
                    <NavLink to="/faq" className="nav-link-wrapper" activeClassName="nav-link-active">
                        <div className="icon-navigation">
                            <FontAwesomeIcon icon="fa-solid fa-circle-question" />
                        </div>
                        <div>
                            FAQ
                        </div>
                    </NavLink>
                </div>
                <div className="nav-link-wrapper">
                    <div className="icon-navigation">
                        <FontAwesomeIcon icon="sign-out-alt" />
                    </div>
                    <div className='logout-wrapper'>
                        <a onClick={handleSignOut}>Cerrar Sesion</a>
                    </div>
                </div>
            </div>
        )
}
export default withRouter (NavigationContainer);