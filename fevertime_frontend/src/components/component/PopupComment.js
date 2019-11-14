import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
class PopupComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            time : 0,
            show : true

        }
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.clickClose} className='PopupComment'>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex'>
                        <div className='w-60'>
                            <input className='w-100' onChange={this.props.changeContent}
                            defaultValue = {this.props.content}
                            />
                        </div>
                    </div>
                </Modal.Body>
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
PopupComment.defaultProps = {
    show: false,
    modalTitle: 'Modal title',
    content: 'empty content',
    buttonClose: 'cancel',
    buttonConfirm: 'Confirm Change',
};
PopupComment.propTypes={
    show:PropTypes.bool,
    modalTitle:PropTypes.string,
    content:PropTypes.string,
    clickClose:PropTypes.func,
    buttonClose:PropTypes.string,
    clickConfirm:PropTypes.func,
    buttonConfirm:PropTypes.string,
    changeContent:PropTypes.func
}
export default PopupComment;