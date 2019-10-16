import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class FeverEnd extends Component {
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
        if(time === 5){
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
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-xlarge'>준비중입니다</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FeverEnd;