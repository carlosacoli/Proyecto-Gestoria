import React, { Component } from "react";
import ReactModal from "react-modal";

import FormEditFactGasto from "../modulos/form-edit-factura-gasto"

ReactModal.setAppElement(".app-wrapper");

export default class ModalEditFacGasto extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height:"600px"
        },
        overlay: {
            backgroundColor: "rgba(1,1,1, 0.80)"
        }
    }

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.props.handleModalEditClose()
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles} 
        onRequestClose={() => {this.props.handleModalEditClose()}} 
        isOpen={this.props.modalIsOpen}
        
      >
        <FormEditFactGasto 
            idToEdit={this.props.idToEdit} 
            handleCloseModal={this.handleCloseModal}
        />
      </ReactModal>
    );
  }
}