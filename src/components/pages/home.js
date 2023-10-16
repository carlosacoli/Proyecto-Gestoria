import React from "react";

export default function(props){
    return(
        <div className="home-container">
            <div className="home-wrapper">
                <div className="home-content"> 
                <h1>Hola {props.nombre} {props.apellidos}</h1>
                <h2>Bienvenido al Sistema de Gestoria Online</h2>
                <p>Aqui podras etc etc etc</p>
                </div>
            </div>
            
        </div>

        
    );
}