import React, { Component ,createRef } from 'react';
import avatar from '../assets/img/man-avatar.jpg';
import { withRouter } from 'react-router';
import {connect} from 'react-redux'
import '../App.css'
import AlarmModal from './component/PopUpModal'
import AlarmMessageModal from "./component/PopupMessage";
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";
import Camera from "react-html5-camera-photo";
import * as actionCreators from "../store/actions";
import qs from'query-string'
import PropTypes from 'prop-types';



class FeverMode extends Component {

    constructor(props){
        super(props);
        this.state = {
            hid:0,
            showCamera: false,
            showAlarm: false,
            onDisplayMode: false,
            showAlarmCheckPopup : false,
            showAlarmMessagePopup : false, // 핸드폰 Detect 시 뜨는 알림창을 키고 끄는 변수
            time : 0,
            hour : 0,
            min : 0,
            sec : 0,
            currentMyImage : avatar,
            videoConstraints : {
                width: 700,
                height: 700,
                facingMode: "user"
            },
            selectedGoodWords : "",
            selectedGoodWordsMan : "",
            goodwords : [
                {word: "Don’t be afraid your life will end be afraid. That it will never begin", man: "Grace Hansen"},
                {word: "Business? It's quite simple. It's other people's money.", man : "Alexandre Dumas"},
                {word: "A hungry man is not a free man.", man : "Adlai Stevenson"},
                {word: "The secret of business is to know something that nobody else knows.", man : "Aristotle Onassis"},
                {word: "One man with courage makes a majority.", man : "Andrew Jackson"},
                {word: "Anything you're good at contributes to happiness.", man : "Bertrand Russell"},
                {word: "Freedom is a system based on courage.", man : "Charles Peguy"},
                {word: "If a man takes no thought about what is distant, he will find sorrow near at hand.", man : "Confucius"},
                {word: "We are an intelligent species and the use of our intelligence quite properly gives us pleasure. ", man : "Carl Sagan"},
                {word: "If you want to be happy for a year, plant a garden; if you want to be happy for life, plant a tree.", man : "English Proverb"},
                {word: "Only the person who has faith in himself is able to be faithful to others.", man : "Erich Fromm"},
                {word: "Life improves slowly and goes wrong fast, and only catastrophe is clearly visible.", man : "Edward Teller"},
                {word: "Who controls the past controls the future. Who controls the present controls the past.", man : "George Orwell"},
                {word: "Work banishes those three great evils, boredom, vice and poverty.", man : "Goethe"},
                {word: "One man who has a mind and knows it can always beat ten men who haven't and don't.", man : "George Bernard Shaw"},
                {word: "The more you sweat in peace, the less you bleed in war.", man : "Hyman Rickover"},
                {word: "Time is a great teacher, but unfortunately it kills all its pupils.", man : "Hector Berlioz"},
            ]

        }

    }
    webcamRef = createRef();
    componentDidMount() {
        let min = 0;
        let max = 16;
        let randInt = min+ parseInt(Math.random() *(max-min));
        const query = qs.parse(this.props.location.search);
        if(query.prog_time !== undefined){
            this.setState({
                hid : query.id,
                goalTime : query.goalTime,
                time : Number(query.prog_time) * 60, // 1분에 한번씩 capture 하므로
                selectedGoodWords : this.state.goodwords[randInt].word,
                selectedGoodWordsMan : this.state.goodwords[randInt].man

            });
        }else{
            this.setState({
                hid : query.id,
                goalTime : query.goalTime,
                selectedGoodWords : this.state.goodwords[randInt].word,
                selectedGoodWordsMan : this.state.goodwords[randInt].man
            });
        }
        //timer 참고 https://medium.com/wasd/react%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%ED%83%80%EC%9D%B4%EB%A8%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-9fc164416586
        this.timerStart();

    }
    componentWillUnmount() {
        clearInterval(this.interval);
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
            time: time + 1,
        }), () => this.timesSetter());  // timerHandler will call after setState working is done

    }
    timesSetter(){
        const {time } = this.state;

        this.setState(() => ({
            hour: Math.floor(time / 3600),
        }), () => {
            this.setState((prevState) => ({
                min: Math.floor((time - prevState.hour * 3600) / 60),  // prevState.hour means just changed hour value. Without this, min will be -1
            }), () => {
                this.setState((prevState) => ({
                    sec: time - (prevState.hour * 3600) - (prevState.min * 60),  // prevState means just changed valud. Without this, sec will be -1
                }),()=>{
                    if(time % 60 === 59){
                        this.capture();
                    }
                });
            });
        });
    }

    capture(){
        this.setState({
            currentMyImage : this.webcamRef.current.getScreenshot()
        })
        this.props.postFeverProgress(this.state.hid, this.webcamRef.current.getScreenshot());

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
    onCheckAlarm = (e) => {
        this.setState({
            showAlarmCheckPopup : e.target.checked,
            showAlarm : e.target.checked
        })
    }
    onCheckDisplay = (e) => {
        this.setState({
            onDisplayMode : e.target.checked,
        })
    }

    clickClose = () => () => {
        this.setState({
            showAlarmCheckPopup : false,
            showAlarm : false
        })
    }
    clickConfirm = () => () => {
        this.setState({
            showAlarmCheckPopup : false,
            showAlarm : true
        })
    }
    clickDisplayModeEnd= () => () => {
        this.setState({
            onDisplayMode : false
        })
    }
    clickEnd = () => () => {
        this.props.putFeverHistory(this.state.hid);
    }
    render() {
        return (
            <div className='p-relative' id='FeverMode'>
                { this.state.onDisplayMode &&
                <div className='fevermode-fullscreen'>
                    <div className='d-flex'>
                        <h1 className='d-flex fevermode-fullscreen-time'>
                            <div>{this.transTime(this.state.hour)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.min)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.sec)}</div>
                        </h1>
                    </div>
                    <div className='d-flex'>
                        <h1 className='d-flex fevermode-fullscreen-checkbox'>
                            <div className='fevermode-fullscreen-button-orange' id='fevermode-display-off-button'  onClick={this.clickDisplayModeEnd()}>Hide Off</div>
                        </h1>
                    </div>

                </div>
                }
                <AlarmModal show={this.state.showAlarmCheckPopup }
                            modalTitle={'Start Alarm mode'}
                            content={'Do you want to turn on the Alarm?'}
                            buttonConfirm={'Turn On'}
                            clickClose={this.clickClose()}
                            clickConfirm={this.clickConfirm()}
                />
                <AlarmMessageModal show={this.state.showAlarm && this.props.phone_detect}
                                       modalTitle={'Phone detected'}
                                       content={'Please come back to fever!'}
                                       buttonConfirm={'Close'}
                                       isSuccess={false}
                                       clickClose={this.props.clickDetectAlarmPopupClose}
                                       clickConfirm={this.props.clickDetectAlarmPopupClose}
                />
                <div className='p-absolute'>
                    <div className='d-flex '>
                        <input id='fevermode-show-camera-checkbox' type='checkbox' onChange={this.checkBox}/>
                        <div className='ml-1 show-camera-button'>Show Camera</div>
                    </div>
                    <div>

                        { this.state.showCamera ?(
                            //show camera 시 켜진 거울용 카메라 모듈
                            <div className='w-50 f-large d-flex d-v-center'>
                                <div className='camera-size'>
                                    <Camera/>
                                    {/*<button onClick={this.capture()}>capture</button>*/}
                                </div>
                            </div>) : ('')}
                        <Webcam
                            className='invisible-fevermode-webcam'
                            audio={false}
                            height={700}
                            mirrored={true}
                            ref={this.webcamRef}
                            screenshotFormat="image/jpeg"
                            width={700}
                            videoConstraints={this.state.videoConstraints}
                        />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='d-flex d-v-center mt-5'>
                        <div className='w-30  page-title'>Fever mode</div>
                        <div className='w-30'></div>
                        <div className='w-20 d-flex'>
                            <input type='checkbox' id='fevermode-alarm-checkbox' checked={this.state.showAlarm} onChange={this.onCheckAlarm} />
                            <div className='ml-1 show-camera-button'>Alarm On/Off</div>
                        </div>
                        <div className='w-20 t-right f-medium d-flex'>
                            <div>{this.transTime(this.state.hour)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.min)}&nbsp; :&nbsp; </div>
                            <div>{this.transTime(this.state.sec)}</div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='w-60'></div>
                        <div className='w-20 d-flex'>
                            <input type='checkbox' id='fevermode-display-checkbox' checked={this.state.onDisplayMode} onChange={this.onCheckDisplay} />
                            <div className='ml-1 show-camera-button'>Hide mode On</div>
                        </div>
                        <div className='w-20 color-gray t-right'>
                            Goal Time : &nbsp; {this.state.goalTime}
                        </div>
                    </div>
                    <div className=' mt-5 d-v-center  fever-form'>
                        <div className='t-center w-100 f-large good-word-box'>
                            {this.state.selectedGoodWords}<br/>
                            - {this.state.selectedGoodWordsMan} -
                        </div>
                        <div className='d-flex mt-5'>
                            <div className='w-33'></div>
                            <div className='w-33 pr-3 t-right'>
                                <img className='icon-size' alt='' src={this.state.currentMyImage}/>
                            </div>
                            <div className='w-33'></div>
                        </div>
                    </div>
                    <div className='d-flex d-ho-center'>
                        <button id='fever-mode-click-end' onClick={this.clickEnd()} className='button-orange-s mt-5'>End Fever</button>
                    </div>

                </div>
            </div>
        )
    }
}
FeverMode.propTypes={
    location:PropTypes.object,
    selectedCategory:PropTypes.string,
    etcCategory:PropTypes.string,
    hid:PropTypes.number,
    goalTime:PropTypes.string,
    putFeverHistory:PropTypes.func,
    face_detect:PropTypes.bool,
    phone_detect:PropTypes.bool,
    clickDetectAlarmPopupClose:PropTypes.func,
    postFeverProgress:PropTypes.func
}

const mapStateToProps = state =>{
    return {
        selectedCategory:state.feverStart.selectedCategory,
        goalTime:state.feverStart.goalTime,
        etcCategory:state.feverStart.etcCategory,
        hid : state.feverStart.hid,
        face_detect : state.feverStart.face_detect,
        phone_detect : state.feverStart.phone_detect
    }
}
const mapDispatchToProps = dispatch => {
    return {
        putFeverHistory: (hid) =>
            dispatch(actionCreators.putFeverHistory(hid)),
        postFeverProgress: (hid, image) =>
            dispatch(actionCreators.postFeverProgress(hid, image)),
        clickDetectAlarmPopupClose: () =>
            dispatch(actionCreators.clickDetectAlarmPopupClose()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(FeverMode));
