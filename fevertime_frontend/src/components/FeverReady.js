import React, { Component } from 'react';
import avatar from '../assets/img/man-avatar.jpg';
import Camera from "react-html5-camera-photo";

class FeverReady extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCamera: false,
            time : 0
        }
    }
    componentDidMount() {
        //timer 참고 https://medium.com/wasd/react%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%ED%83%80%EC%9D%B4%EB%A8%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-9fc164416586
        this.timerStart();
    }
    timerStart() {
        this.interval = setInterval(() => {
            this.timerAction();
        }, 1000);
    }
    timerAction = () => {
        const time = this.state.time;
        if(time === 10){
            window.location.assign('fevermode')
        }
        // component update

        this.setState(() => ({  // setState is asynchronous
            time: time + 1}))  // timerHandler will call after setState working is done
    }
    render() {
        return (
            <div className='form-container'>
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
                                <Camera
                                    onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default FeverReady;