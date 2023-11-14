import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faHome, faChartSimple, faReceipt, faEuroSign, faChevronRight, 
        faMoneyBillTrendUp,faCoins,faCirclePlus, faFolderOpen, faComments, faUsersGear,
        faCircleQuestion, faSignOutAlt, faDownload, faTrash, faFilePen, faCircleXmark,
        faCircleCheck, faEye, faUserPlus,faUserPen, faUserSlash, faFolderPlus,
        faFileCircleXmark, faCircleDown, faTriangleExclamation,faKey, faGears,
        faBriefcase} from "@fortawesome/free-solid-svg-icons";




import NavigationContainer from './navigation/navigation-container';
import Auth from './pages/auth';
import Home from './pages/home';
import Panel from './pages/panel';
import Facturas_Ingresos from './pages/facturas-ingresos';
import AddFacturaIngreso from './forms/form-factura-ingreso'
import Facturas_Gastos from './pages/facturas-gastos';
import AddFacturaGasto from './forms/form-factura-gasto'
import Impuestos from './pages/impuestos';
import Documentos from './pages/documentos';
import ChatRoom from './pages/chatroom';
import Gestion_users from './pages/gestion-users';
import Trabajo_user from './pages/trabajo-user';
import FormAddUser from './forms/form-add-user';
import Faq from './pages/faq';
import NoMatch from './pages/no-match';
import NoMatchAuth from './pages/no-match-auth';

library.add(faUser, faHome, faChartSimple, faReceipt, faEuroSign, faFolderOpen,
            faComments, faUsersGear, faCircleQuestion, faSignOutAlt,faChevronRight,
            faMoneyBillTrendUp, faCoins, faCirclePlus, faDownload, faTrash, faFilePen,
            faCircleXmark, faCircleCheck, faEye, faUserPlus, faUserPen, faUserSlash, faFolderPlus,
            faFileCircleXmark, faCircleDown, faTriangleExclamation, faKey, faGears,faBriefcase);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: "OFFLINE",
      nombre: "",
      apellidos: "",
      id_user: "",
      id_user_rol: "",
      id_user_work: ""
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleWorkingUser = this.handleWorkingUser.bind(this);
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
      id_user_rol: "",
      id_user_work: ""
    });
  }

  handleLogout() {
    this.setState({
      loginStatus: "OFFLINE",
      nombre: "",
      apellidos: "",
      id_user: "",
      id_user_rol: "",
      id_user_work: ""
    });
  }

  handleWorkingUser(datauser){
    this.setState({
      id_user_work: datauser
    })
  }

  checkLoginStatus(){
    if (localStorage.getItem('jwt-token-gc') === null) {
      this.setState({
        loginStatus: "OFFLINE",
        nombre: "",
        apellidos: "",
        id_user: "",
        id_user_rol: "",
        id_user_work: ""

      })
      
      // return (location.assign("/auth"))
      //return (location.pathname === '/auth')

      console.log("cambiado");  //<---QUITAR
      
    }else if (localStorage.getItem('jwt-token-gc') !== null){
      let token = localStorage.getItem('jwt-token-gc');
      return axios.get('https://gestoria-db-09ec50f82e6d.herokuapp.com/protected', {
      headers: { Authorization: `Bearer ${token}`}, 
      withCredentials: true
      }).then(response => {

        ((response.data.logged_in_as.id_rol === 3) ? 
          this.setState({
            id_user_work: response.data.logged_in_as.id_user
          }) 
          : null)
        
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
        <div >
          <h1>Sistema de Gestoria</h1>
        </div>
        {(this.state.loginStatus === "OFFLINE") ? 
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
                <Route path="/panel" component={Panel} />
                
                <Route 
                  path="/facturas-ingresos" 
                  render={props =>(
                    <Facturas_Ingresos
                      {...props}
                      id_user_rol={this.state.id_user_rol}
                      id_user_work={this.state.id_user_work}
                    />
                  )}
                />
                <Route 
                  path="/add-factura-ingreso" 
                  render={props => (
                    <AddFacturaIngreso
                      {...props}
                      id_user_work={this.state.id_user_work}
                    />                  
                  )}
                />


                <Route 
                  path="/facturas-gastos" 
                  render={props => (
                    <Facturas_Gastos 
                      {...props}
                      id_user_rol={this.state.id_user_rol}
                      id_user_work={this.state.id_user_work}
                    />
                  )}
                />

                <Route 
                  path="/add-factura-gasto" 
                  render={props => (
                    <AddFacturaGasto
                      {...props}
                      id_user_work={this.state.id_user_work}
                    />
                  )}
                />

                <Route 
                  path="/impuestos" 
                  render={props =>(
                    <Impuestos
                      {...props}
                      id_user_rol={this.state.id_user_rol}
                      id_user_work={this.state.id_user_work}
                    />
                  )}
                />

                <Route 
                  path="/documentos"
                  render={props =>(
                    <Documentos
                      {...props}
                      id_user_rol={this.state.id_user_rol}
                      id_user_work={this.state.id_user_work}
                    />
                  )} 
                />
                <Route path="/chatroom" component={ChatRoom} />
                <Route path="/faq" component={Faq} />
                

                {(this.state.id_user_rol === 1) || (this.state.id_user_rol === 2) ?
                  <div>
                    <Route path="/gestion-users" component={Gestion_users} />
                    <Route path="/add-user" component={FormAddUser} />
                    <Route 
                      path="/trabajo-user"
                      render={props =>(
                        <Trabajo_user
                          {...props}
                          datauser={this.handleWorkingUser}
                        />
                      )} 
                    />
                  </div>
                : null
                } 
                 
                <Route component={NoMatch} />
              </Switch>

            </Router> 
          </div>
          
        }
      </div>
    );
  }
}
