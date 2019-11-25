import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
class FeverEnd extends Component {
    constructor(props){
        super(props);
        this.state = {
            total_time : "",
            fever_time : "",
            fever_rate : "",
        }
    }
    componentDidMount(){
        var search = this.props.location.search
        var params = new URLSearchParams(search)
        this.setState({
            total_time : params.get('total_time'),  
            fever_time : params.get('fever_time'),
            fever_rate : params.get('fever_rate'),
    })
}
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
                        <div className='w-20 f-xlarge '>{this.state.total_time}</div>
                    </div>
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-large'>Fever Time </div>
                        <div className='w-20 f-xlarge '>{this.state.fever_time}</div>
                    </div>
                    <div className='d-flex mt-5'>
                        <div className='w-20'></div>
                        <div className='w-40 f-large'>Avg Fever rate </div>
                        <div className='w-20 f-xlarge '> {this.state.fever_rate*100}%</div>
                    </div>
                </div>
                <div className='d-flex d-ho-center'>
                    <button className='button-orange mt-5'><Link to='feverstart'>Restart Fever</Link></button>
                </div>
            </div>
        )
    }
}
FeverEnd.propTypes={
    location:PropTypes.object,
};
export default connect(null,null)(withRouter(FeverEnd));