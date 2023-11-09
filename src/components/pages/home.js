import React from "react";

export default function(props){
    return(
        <div className="home-container">
            <div className="home-wrapper">
                <div className="home-content"> 
                <h1>Hola {props.nombre} {props.apellidos}</h1>
                <h2>Bienvenido al Sistema de Gestoria Colina</h2>
                <p>Aqui podras subir tus facturas de ingresos y de gastos</p>
                <p>Subir tus Documentos, calcular tus impuestos y muchas cosas mas</p>
                </div>
            </div>
            
        </div>

        
    );
}