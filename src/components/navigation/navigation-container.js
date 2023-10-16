import React from 'react';
import { useState } from 'react';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import Carlitox from "../../../static/assets/imagenes/carlitox.png";


const NavigationContainer = (props) =>{

    const [isActive, setIsActive] = useState(false);
    
    const dropdownStyle = {
        paddingLeft: '30px',
    };

    const dynamicLink = (route, linkText) =>{
        return(
            <div >
                <NavLink to={route} className="nav-link-wrapper" activeClassName="nav-link-active">
                    <div className="icon-navigation">
                        <FontAwesomeIcon icon="fa-solid fa-users-gear" />
                    </div>
                    <div>
                        {linkText}
                    </div>
                </NavLink>  
            </div>
        );
    };

    const handleSignOut = () =>{
        localStorage.removeItem('jwt-token-gc');
        props.history.push("/auth")
        props.handleLogout();
  
    }
    return(
            <div className="nav-wrapper">
                <div className="logo-navigation">
                    <img src={Carlitox}/>
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

                {props.id_rol === 1 || props.id_rol === 2 ? dynamicLink("/gestion-users", "Gestion de Usuarios") : null }
                
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
                    <div>
                        <a onClick={handleSignOut}>Cerrar Sesion</a>
                    </div>
                </div>
            </div>
        )
}
export default withRouter (NavigationContainer);