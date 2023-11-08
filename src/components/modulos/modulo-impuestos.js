import React, { Component } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import Calendar from 'react-calendar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class ModuloImpuestos extends Component {
  constructor(props){
    super(props);


    this.state = {
        trimestre: "Enero - Marzo ",
        año: " 2023"
    }
  }  
    

  render() {
    return(
        <div>
            <div>
            Impuestos Trimestre: {this.state.trimestre}  {this.state.año} 
            </div>
            <div>
            <Calendar
            selectRange={false}
            maxDetail='year'
            defaultView='year'                                                    
            />
            </div>
            <div>
                Calculos del Trimestre
            </div>
            <div>
                Total volumen de operaciones del trimestre:
            </div>
            <div>
                Iva del volumen de operaciones:
            </div>
            <div>
                Total Gastos de operaciones del trimestre:
            </div>
            <div>
                Total IVA deducible de operaciones del trimestre:
            </div>
            <hr />
            <div>
                Calculos de los Impuestos
            </div>
            <div>
                Select IRPF
            </div>
            <div>
                Total IRPF a declarar:
            </div>
            <div>
                Total IVA a declarar:
            </div>

        </div>
        


    )
  }
}