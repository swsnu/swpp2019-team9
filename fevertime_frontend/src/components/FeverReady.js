import React, { Component } from 'react';
import avatar from '../assets/img/man-avatar.jpg';
import Camera from "react-html5-camera-photo";

import {connect} from 'react-redux'
import * as actionCreators from '../store/actions/index';
import { withRouter } from 'react-router';

class FeverReady extends Component {

    constructor(props){
        super(props);
        this.state = {
            showCamera: false,
            time : 0,

        }
    }
    componentDidMount() {
        //timer 참고 https://medium.com/wasd/react%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%ED%83%80%EC%9D%B4%EB%A8%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-9fc164416586
        this.timerStart();
    }
    componentWillUnmount() {
        clearInterval(this.interval); //timer
    }

    timerStart() {
        this.interval = setInterval(() => {
            this.timerAction();
        }, 1000);
    }
    timerAction(){
        const time = this.state.time;
        // component update
        this.setState(() => ({  // setState is asynchronous
            time: time + 1}))  // timerHandler will call after setState working is done
        if(time === 10){
            this.props.postFeverHistory(this.props.selectedCategory, this.props.etcCategory, this.props.goalTime);
        }
    }

    clickSkip = () => () => {
        this.props.postFeverHistory(this.props.selectedCategory, this.props.etcCategory, this.props.goalTime);
    }
    render() {
        return (
            <div className='form-container FeverReady'>
                <div className='d-flex d-v-center mt-5'>
                    <div className='w-30  page-title'>Fever mode</div>
                </div>
                <div className=' mt-5 d-v-center  fever-form'>
                    <div className=' mt-5 f-large t-center'>
                        Please compose the camera as shown below.
                    </div>
                    <div className='mt-3 f-medium t-center'>
                        After 10 seconds, fevermode starts.
                    </div>
                    <div className='mt-3 f-large t-center'>
                        {this.state.time}
                    </div>
                    <div className='d-flex mt-5'>
                        <div className='w-40 pr-3 t-right'>
                            <img className='icon-size' alt='' src={avatar}/>
                        </div>
                        <div className='w-10 pr-3 t-right'></div>
                        <div className='w-50 f-large'>
                            <div className='ready-camera-size'>
                                <Camera/>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='d-flex d-ho-center mt-5'>
                    <button id='fever-ready-click-skip' className='button-orange-s' onClick={this.clickSkip()}>Skip</button>
                </div>
            </div>
        )
    }
}
FeverReady.propTypes={
    selectedCategory:PropTypes.object,
    etcCategory:PropTypes.object,
    postFeverHistory:PropTypes.func,
    goalTime:PropTypes.string,
}
const mapStateToProps = state => {
    return {
        selectedCategory:state.feverStart.selectedCategory,
        etcCategory:state.feverStart.etcCategory,
        goalTime:state.feverStart.goalTime
    };
}
const mapDispatchToProps = dispatch => {
    return {
        postFeverHistory: (cat, etcCat, goalTime) =>
            dispatch(actionCreators.postFeverHistory(cat, etcCat, goalTime))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(FeverReady));