import React, { Component } from "react";
import ReactModal from "react-modal";


import FormViewUser from "../forms/form-view-user";

ReactModal.setAppElement(".app-wrapper");

export default class ModalViewUser extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "850px",
            height:"600px"
        },
        overlay: {
            backgroundColor: "rgba(1,1,1, 0.80)"
        }
    }

    this.handleCloseViewModal = this.handleCloseViewModal.bind(this);
  }

  handleCloseViewModal(){
    this.props.handleModalClose()
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles} 
        onRequestClose={() => {this.props.handleModalViewClose()}} 
        isOpen={this.props.viewModalIsOpen}
        
      >
        <FormViewUser
            idToEdit={this.props.idToEdit} 
            handleCloseModal={this.handleCloseViewModal}
        />
      </ReactModal>
    );
  }
}