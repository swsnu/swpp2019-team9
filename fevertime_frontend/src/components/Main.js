import React, { Component } from 'react';
import '../App.css'
import caro1 from '../assets/img/caro1.png'
import caro2 from '../assets/img/caro2.png'
import caro3 from '../assets/img/caro3.png'
import {Carousel} from 'react-bootstrap'
class Main extends Component {
    render() {
        return (
            <div className='f-xlarge t-center'>
                <div className='d-flex'>
                    <div className='w-20'></div>
                    <div className='w-60'>
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
                <div className='mt-5'>Let yourself focus.</div>
                <div className='mt-5'>Take record of your concentrated Time</div>
            </div>
        )
    }
}
export default Main;