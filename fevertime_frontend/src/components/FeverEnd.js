import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';

class FeverEnd extends Component {
    render() {
        return (
            <div className='form-container FeverEnd'>
                <div className='d-flex d-v-center mt-5'>
                    <div className='w-30  page-title'>Fever mode</div>

                </div>
                <div className=' mt-5 d-v-center  fever-form'>
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-large'>Total Time </div>
                        <div className='w-20 f-xlarge '>{this.props.total_time}</div>
                    </div>
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-large'>Fever Time </div>
                        <div className='w-20 f-xlarge '>{this.props.fever_time}</div>
                    </div>
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-large'>Avg Fever rate </div>
                        <div className='w-20 f-xlarge '> {this.props.fever_rate}%</div>
                    </div>
                </div>
                <div className='d-flex d-ho-center'>
                    <button className='button-orange mt-5'><Link to='feverstart'>Restart Fever</Link></button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        total_time:state.feverStart.total_time,
        fever_time:state.feverStart.fever_time,
        fever_rate:state.feverStart.fever_rate
    };
}
export default connect(mapStateToProps,null)(withRouter(FeverEnd));