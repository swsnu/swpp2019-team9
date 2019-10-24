import React, { Component ,createRef } from 'react';
import smileImg from '../assets/img/smileIcon.png';
import avatar from '../assets/img/man-avatar.jpg';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import '../App.css'
import AlarmModal from './component/PopUpModal'
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";



class FeverMode extends Component {

    constructor(props){
        super(props);
        this.state = {
            showCamera: false,
            showAlarm: false,
            showAlarmPopup : false,
            time : 0,
            hour : 0,
            min : 0,
            sec : 0,
            currentMyImage : avatar,
            videoConstraints : {
                width: 160,
                height: 160,
                facingMode: "user"
            },
            selectedGoodWords : "Don’t be afraid your life will end be afraid. That it will never begin",
            selectedGoodWordsMan : "Grace Hansen",
            goodwords : [{word: "Business? It's quite simple. It's other people's money.", man : "Alexandre Dumas"},
                {word: "A hungry man is not a free man.", man : "Adlai Stevenson"},
                {word: "The secret of business is to know something that nobody else knows.", man : "Aristotle Onassis"},
                {word: "One man with courage makes a majority.", man : "Andrew Jackson"},
                {word: "Anything you're good at contributes to happiness.", man : "Bertrand Russell"},
                {word: "Freedom is a system based on courage.", man : "Charles Peguy"},
                {word: "If a man takes no thought about what is distant, he will find sorrow near at hand.", man : "Confucius"},
                {word: "We are an intelligent species and the use of our intelligence quite properly gives us pleasure. ", man : "Carl Sagan"},
                {word: "If you want to be happy for a year, plant a garden; if you wnat to be happy for life, plant a tree.", man : "English Proverb"},
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
                }),()=>{
                    if(time % 60 === 59){
                        this.capture();
                    }
                });
            });
        });
    }

    // capture = () => () => {
    //     console.log(this.webcamRef);
    //     this.setState({
    //         currentMyImage : this.webcamRef.current.getScreenshot(),
    //     })
    // }
    capture = () => {
        let min = 0;
        let max = 15;
        let randInt = min+ parseInt(Math.random() *(max-min));
        this.setState({
            currentMyImage : this.webcamRef.current.getScreenshot(),
            selectedGoodWords : this.state.goodwords[randInt].word,
            selectedGoodWordsMan : this.state.goodwords[randInt].man
        })

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
            showAlarmPopup : e.target.checked,
            showAlarm : e.target.checked
        })
    }

    clickClose = () => () => {
        this.setState({
            showAlarmPopup : false,
            showAlarm : false
        })
    }
    clickConfirm = () => () => {
        this.setState({
            showAlarmPopup : false,
            showAlarm : true
        })
    }


    render() {
        return (
            <div className='p-relative' id='FeverMode'>
                <AlarmModal show={this.state.showAlarmPopup}
                            modalTitle={'Start Alarm mode'}
                            content={'Do you want to turn on the Alarm?'}
                            buttonConfirm={'Turn On'}
                            clickClose={this.clickClose()}
                            clickConfirm={this.clickConfirm()}

                />
                <div className='p-absolute'>
                    <div className='d-flex '>
                        <input id='fevermode-show-camera-checkbox' type='checkbox' onChange={this.checkBox}/>
                        <div className='ml-1 show-camera-button'>Show Camera</div>
                    </div>
                    <div>

                        { this.state.showCamera ?(
                            //show camera 시 켜진 실제 카메라 모듈
                            <div className='camera-size'>
                                <Webcam
                                    audio={false}
                                    height={160}
                                    ref={this.webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={160}
                                    videoConstraints={this.state.videoConstraints}
                                    mirrored ={true}
                                />
                                {/*<button onClick={this.capture()}>capture</button>*/}
                            </div>) : (
                            //show camera 안했을시 존재하는 화면밖의 가상의 카메라 모듈
                            <Webcam
                                    className='invisible-fevermode-webcam'
                                audio={false}
                                height={160}
                                ref={this.webcamRef}
                                screenshotFormat="image/jpeg"
                                width={160}
                                videoConstraints={this.state.videoConstraints}
                                mirrored ={true}
                        />)}
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
                    <div className=' mt-5 d-v-center  fever-form'>
                        <div className='t-center w-100 f-large'>
                            {this.state.selectedGoodWords}<br/>
                            - {this.state.selectedGoodWordsMan} -

                        </div>
                        <div className='d-flex mt-5'>
                            <div className='w-33 pr-3 t-right'>
                                <img className='icon-size' alt='' src={this.state.currentMyImage}/>
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

const mapStateToProps = state =>{
    return {
        selectedCategory:state.feverStart.selectedCategory,
        goalTime:state.feverStart.goalTime,
        etcCategory:state.feverStart.etcCategory,
    }
}
export default connect(mapStateToProps,null)(FeverMode);