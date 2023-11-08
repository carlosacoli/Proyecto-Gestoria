import React, { Component } from "react";
import ReactModal from "react-modal";

import FormAddDocumento from "../forms/form-add-documento"

ReactModal.setAppElement(".app-wrapper");

export default class ModalAddDocumento extends Component {
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
    this.handleReload = this.handleReload.bind(this);
  }

  handleCloseModal(){
    this.props.handleModalAddClose()
  }

  handleReload(){
    this.props.handleReloadTable()
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles} 
        onRequestClose={() => {this.props.handleModalAddClose()}} 
        isOpen={this.props.addModalIsOpen}
        
      >
        <FormAddDocumento 
            handleCloseModal={this.handleCloseModal}
            handleReload={this.handleReload}
            id_user_rol={this.props.id_user_rol}
            id_user_work={this.props.id_user_work}
        />
      </ReactModal>
    );
  }
}