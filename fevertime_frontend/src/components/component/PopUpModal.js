import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
class PopUpModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            time : 0,
            show : true

        }
    }
    handleClose = () => () => {
        this.setState({
            show : false
        })
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.clickClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.clickClose}>
                        {this.props.buttonClose}
                    </Button>
                    <Button variant="primary" onClick={this.props.clickConfirm}>
                        {this.props.buttonConfirm}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
PopUpModal.defaultProps = {
    show: false,
    modalTitle: 'Modal title',
    content: 'empty content',
    buttonClose: 'close',
    buttonConfirm: 'Confirm'
};
export default PopUpModal;