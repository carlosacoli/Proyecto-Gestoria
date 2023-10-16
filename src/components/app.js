import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faHome, faChartSimple, faReceipt, faEuroSign, faChevronRight, 
        faMoneyBillTrendUp,faCoins,faCirclePlus, faFolderOpen, faComments, faUsersGear,
        faCircleQuestion, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import Panel from './pages/panel';
import Facturas_Ingresos from './pages/facturas-ingresos';
import Facturas_Gastos from './pages/facturas-gastos';
import Impuestos from './pages/impuestos';
import Documentos from './pages/documentos';
import ChatRoom from './pages/chatroom';
import Gestion_users from './gestoria-system/gestion-users';
import Faq from './pages/faq';
import GestoriaDetail from './gestoria-system/gestoria-detail';
import Auth from './pages/auth';
import AddFacturaIngreso from './modulos/form-factura-ingreso'
import NoMatch from './pages/no-match';
import NoMatchAuth from './pages/no-match-auth';

library.add(faUser, faHome, faChartSimple, faReceipt, faEuroSign, faFolderOpen,
            faComments, faUsersGear, faCircleQuestion, faSignOutAlt,faChevronRight,
            faMoneyBillTrendUp, faCoins, faCirclePlus);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: "OFFLINE",
      nombre: "",
      apellidos: "",
      id_user: "",
      id_user_rol: ""
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loginStatus: "ONLINE"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loginStatus: "OFFLINE",
      nombre: "",
      apellidos: "",
      id_user: "",
      id_user_rol: ""
    });
  }

  handleLogout() {
    this.setState({
      loginStatus: "OFFLINE",
      nombre: "",
      apellidos: "",
      id_user: "",
      id_user_rol: ""
    });
  }

  checkLoginStatus(){
    if (localStorage.getItem('jwt-token-gc') === null) {
      this.setState({
        loginStatus: "OFFLINE",
        nombre: "",
        apellidos: "",
        id_user: "",
        id_user_rol: ""

      })
      
      // return (location.assign("/auth"))
      //return (location.pathname === '/auth')

      console.log("cambiado");  //<---QUITAR
      
    }else if (localStorage.getItem('jwt-token-gc') !== null){
      let token = localStorage.getItem('jwt-token-gc');
      return axios.get('http://127.0.0.1:5000/protected', {
      headers: { Authorization: `Bearer ${token}`}, 
      withCredentials: true
      }).then(response => {
        this.setState({
          loginStatus: "ONLINE",
          nombre: (response.data.logged_in_as.nombre),
          apellidos: (response.data.logged_in_as.apellidos),
          id_user: (response.data.logged_in_as.id_user),
          id_user_rol: (response.data.logged_in_as.id_rol)

        })
        console.log("respuesta de status", response) //<---QUITAR
      }).catch(error =>{
        this.setState({
          loginStatus: "OFFLINE"
        })
        localStorage.clear();
        console.log("error catch", error) //<---QUITAR
      })
    } 
  }

  componentDidMount(){
    this.checkLoginStatus();
  }
  render(){
    return (
      <div className='app'>
        <div className='head'>
          <h1>Sistema de Gestoria</h1>
        </div>
        {/* <div><h3>{this.state.loginStatus}</h3></div> */} 
        {this.state.loginStatus === "OFFLINE" ? 
          <div className='login-container'>
            <Router>
              <Switch>
                <Route 
                  exact path="/auth"
                  render={props => (
                    <Auth
                      {...props}
                      handleSuccessfulLogin={this.handleSuccessfulLogin}
                      handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                    />
                  )}
                />
                <Route path="*" component={NoMatchAuth} />
              </Switch>
            </Router>
          </div>
        :   
          <div className='nav-containter'>
            <Router>
              <NavigationContainer 
                id_rol= {this.state.id_user_rol}
                nombre= {this.state.nombre}
                apellidos= {this.state.apellidos}
                handleLogout={this.handleLogout}
              />

              <Switch>
                <Route 
                  exact path="/"
                  render={props => (
                    <Home
                      {...props}
                      nombre={this.state.nombre}
                      apellidos={this.state.apellidos}
                    />
                  )}
                />
                {/* <Route path="/auth" /> */}
                <Route path="/panel" component={Panel} />
                <Route path="/facturas-ingresos" component={Facturas_Ingresos} />
                <Route path="/facturas-gastos" component={Facturas_Gastos} />
                <Route path="/impuestos" component={Impuestos} />
                <Route path="/documentos" component={Documentos} />
                <Route path="/chatroom" component={ChatRoom} />
                <Route path="/gestion-users" component={Gestion_users} />
                <Route path="/faq" component={Faq} />
                <Route path="/add-factura-ingreso" component={AddFacturaIngreso} />
                <Route exact path="/gestoria/:slug" component={GestoriaDetail} />
                <Route component={NoMatch} />
              </Switch>

            </Router> 
          </div>
        }
      </div>
    );
  }
}
