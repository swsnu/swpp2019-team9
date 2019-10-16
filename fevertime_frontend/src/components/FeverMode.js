import React, { Component } from 'react';
import smileImg from '../assets/img/smileIcon.png';
import avatar from '../assets/img/man-avatar.jpg';
import { Link } from 'react-router-dom';
import '../App.css'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
class FeverMode extends Component {

    constructor(props){
        super(props);
        this.state = {
            showCamera: false,
            time : 0,
            hour : 0,
            min : 0,
            sec : 0

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

        // component update

        this.setState(() => ({  // setState is asynchronous
            time: time + 1,
        }), () => this.timesSetter());  // timerHandler will call after setState working is done
    }
    timesSetter = () => {
        const {time } = this.state;
        this.setState(() => ({
            hour: Math.floor(time / 3600),
        }), () => {
            this.setState((prevState) => ({
                min: Math.floor((time - prevState.hour * 3600) / 60),  // prevState.hour means just changed hour value. Without this, min will be -1
            }), () => {
                this.setState((prevState) => ({
                    sec: time - (prevState.hour * 3600) - (prevState.min * 60),  // prevState means just changed valud. Without this, sec will be -1
                }));
            });
        });
    }

    onTakePhoto (dataUri) {
        // Do stuff with the dataUri photo...
        console.log('takePhoto');
    }
    checkBox = (e) => {
        this.setState({
            showCamera: e.target.checked
        })
    }
    transTime(t){
        if(parseInt(t/10) === 0){
            return '0'+t.toString()
        }
        return t

    }
    render() {
        return (
            <div className='p-relative'>
                <div className='p-absolute'>
                    <div className='d-flex '>
                        <input type='checkbox' onChange={this.checkBox}/>
                        <div className='ml-1 show-camera-button'>Show Camera</div>
                    </div>
                    <div>
                        { this.state.showCamera ?(
                            <div className='camera-size'>
                                <Camera
                                    onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                                />
                            </div>) : ('')}
                    </div>
                </div>
                <div className='form-container'>
                    <div className='d-flex d-v-center mt-5'>
                        <div className='w-30  page-title'>Fever mode</div>
                        <div className='w-30'></div>
                        <div className='w-20 d-flex'>
                            <input type='checkbox' />
                            <div className='ml-1 show-camera-button'>Alarm On/Off</div>
                        </div>
                        <div className='w-20 t-right f-medium d-flex'>
                            <div>{this.transTime(this.state.hour)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.min)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.sec)}</div>
                        </div>
                    </div>
                    <div className=' mt-5 d-v-center  fever-form'>
                        <div className='t-center w-100 f-large'>Don’t be afraid your life will end be afraid<br/>
                            That it will never begin<br/>
                            - Grace Hansen-
                        </div>
                        <div className='d-flex mt-5'>
                            <div className='w-33 pr-3 t-right'>
                                <img className='icon-size' alt='' src={avatar}/>
                            </div>
                            <div className='w-33 f-large'>Avg Fever rate : </div>
                            <div className='w-33 '>
                                <img className='icon-size' alt='' src={smileImg}/>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex d-ho-center'>
                        <button className='button-orange-s mt-5'><Link to='feverend'>End Fever</Link></button>
                    </div>

                </div>
            </div>
        )
    }
}
export default FeverMode;