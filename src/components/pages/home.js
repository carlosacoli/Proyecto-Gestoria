import React from "react";

import homeImage from '../../../static/assets/imagenes/logo-home.png'

export default function Home (props){
    function MensajeRol () {
        if (props.id_user_rol === 1 ){
            return(
                <div className="home-content"> 
                    <div
                        className='home-img'
                        style={{
                            backgroundImage: `url(${homeImage})`
                        }}
                    />
                    <h1>Hola {props.nombre} {props.apellidos}</h1>
                    <h2>Bienvenido al Sistema de Gestoria Colina</h2>
                    <p>Como administrador recuerda velar por el correcto servicio hacia los usuarios</p>
                </div>
            )
        }

        if (props.id_user_rol === 2){
            return(
                <div className="home-content">
                    <div
                        className='home-img'
                        style={{
                            backgroundImage: `url(${homeImage})`
                        }}
                    />
                    <h1>Hola {props.nombre} {props.apellidos}</h1>
                    <h2>Bienvenido al Sistema de Gestoria Colina</h2>
                    <p>Recuerda que debes seleccionar un usuario para comenzar a trabajar con el</p>
                </div>
            )
        }

        if (props.id_user_rol === 3){
            return(
                <div className="home-content"> 
                    <div
                        className='home-img'
                        style={{
                            backgroundImage: `url(${homeImage})`
                        }}
                    />
                    <h1>Hola {props.nombre} {props.apellidos}</h1>
                    <h2>Bienvenido al Sistema de Gestoria Colina</h2>
                    <p>Aqui podras subir tus facturas de ingresos y de gastos</p>
                    <p>Subir tus Documentos, calcular tus impuestos y mucho mas!</p>
                </div>
            )
        }
    }

    return(
        <div className="home-container">
            <div className="home-wrapper"> 
                
                <MensajeRol />     
            </div>
        </div>
    )
}
