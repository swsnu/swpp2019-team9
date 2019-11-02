import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
class PopupMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            time : 0,
            show : true

        }
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.clickClose} className='PopupMessage'>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex'>
                        <div className='w-10'></div>
                        <div className='w-80'>
                            {this.props.content}
                        </div>
                        <div className='w-10'></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.isSuccess?(
                    <Button variant="primary" onClick={this.props.clickConfirm}>
                        {this.props.buttonConfirm}
                    </Button>
                    ):
                    (<Button variant="secondary" onClick={this.props.clickClose}>
                        {this.props.buttonClose}
                    </Button>)}
                </Modal.Footer>
            </Modal>
        )
    }
}
PopupMessage.defaultProps = {
    show: false,
    isSuccess : true,
    modalTitle: 'Modal title',
    content: 'empty content',
    buttonClose: 'cancel',
    buttonConfirm: 'OK'
};
PopupMessage.propTypes={
    show:PropTypes.bool,
    isSuccess:PropTypes.bool,
    modalTitle:PropTypes.string,
    content:PropTypes.string,
    clickClose:PropTypes.func,
    buttonClose:PropTypes.string,
    clickConfirm:PropTypes.func,
    buttonConfirm:PropTypes.string
}
export default PopupMessage;