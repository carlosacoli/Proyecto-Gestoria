import React, { Component } from "react";
import ReactModal from "react-modal";

import FormAdminChangePass from "../forms/form-admin-changepass"

ReactModal.setAppElement(".app-wrapper");

export default class ModalChangePass extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height:"500px"
        },
        overlay: {
            backgroundColor: "rgba(1,1,1, 0.80)"
        }
    }

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal(){
    this.props.handleModalChangeClose()
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles} 
        onRequestClose={() => {this.props.handleModalChangeClose()}} 
        isOpen={this.props.changeModalIsOpen}
        
      >
        <FormAdminChangePass 
            idToEdit={this.props.idToEdit} 
            handleCloseModal={this.handleCloseModal}
        />
      </ReactModal>
    );
  }
}