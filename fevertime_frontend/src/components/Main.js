import React, { Component } from 'react';
import '../App.css'
import caro1 from '../assets/img/caro1.png'
import caro2 from '../assets/img/caro2.png'
import caro3 from '../assets/img/caro3.png'
// import kakaologo from '../assets/img/kakaologo.png'
// import msvision from '../assets/img/msvision.png'
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux'
// import * as feverActionCreators from '../store/actions/fever';
import PropTypes from "prop-types";
import axios from "axios";
class Main extends Component {
    constructor (props)
    {
        super(props);
        this.state = {
            feverlist : [{name : 'abc', fever_time: '00:10'},
                {name : 'def', fever_time: '00:20'}],
            showTop3: false,
        }
    }
    componentDidMount(){
        this.getTop3()
    }
    getTop3(){
        axios.get("/api/fever_top_list/")
            .then(res => {
                this.setState({
                    feverlist : res.data,
                    showTop3 : true
                })
            })
    }
    render() {
        return (
            <div className='f-xlarge t-center Main'>
                {this.state.showTop3 &&
                <div className='top3'>
                    <div className='w-50'>Top 3 Fever</div>
                    <div className='w-50'>
                        <Carousel controls={false} indicators={false}>
                            {this.state.feverlist.map((value,index)=>{
                                return(
                                    <Carousel.Item key={index}>
                                        <div className='d-flex d-ho-center d-v-center'>
                                            <div className='mr-5'>{index+1}</div>
                                            <div className='badge-custom-main t-center hover-pointer mr-3' id='friend-button'>
                                                {value.name[0]}
                                            </div>
                                            <div className='rank-text'>{value.name}</div>
                                            <div className='time-text'>{value.fever_time}</div>
                                        </div>
                                    </Carousel.Item>
                                )
                            })}

                        </Carousel>
                    </div>
                </div>
                }
                <div className='d-flex carousel-wrapper'>
                    {/*<div className='w-10'></div>*/}
                    <div className='w-100'>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={caro1}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={caro2}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={caro3}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>

                <div className='main-first-word'>
                    <div className='pt-5'>Let yourself focus.</div>
                    <div className='pb-5'>Take record of your concentrated Time</div>
                </div>
                {/*<div>*/}
                    {/*<div>Total ranking</div>*/}
                {/*</div>*/}
                {/*<div className='footer-wrapper'>*/}
                    {/*/!*<div className='footer-line'></div>*!/*/}
                    {/*<div className='d-flex'>*/}
                        {/*<div className='w-20'></div>*/}
                        {/*<div className='w-20 d-flex d-v-center d-ho-center'>*/}
                            {/*Kakao face<br/> detect API*/}
                        {/*</div>*/}
                        {/*<div className='w-20 d-flex d-v-center d-ho-center footer-msazure'>*/}
                            {/*MS Azure<br/> Vision API*/}
                        {/*</div>*/}
                        {/*<div className='w-20 d-flex d-v-center d-ho-center was-used'>Was Used</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}
Main.propTypes={
    onGetUser:PropTypes.func,
    last_hid:PropTypes.number
}
const mapStateToProps = state => {
    return {
        last_hid:state.feverStart.last_hid
    };
}
const mapDispatchToProps = dispatch => {
    return {
        // onGetUser: ()=>
        //     dispatch(feverActionCreators.getUserInfo()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
