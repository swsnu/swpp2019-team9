import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class FeverStart extends Component {
    render() {
        return (
            <div>
                <div className='t-center mt-5 page-title'>Fever mode</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Goal Time</div>
                    <input className='w-30 input-1'/>
                </div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Category</div>
                    <input type='radio' className='w-30' title='study'/>
                </div>
                <div className='d-flex d-ho-center mt-5'>
                    <button className='button-orange'><Link to='/feverready'>Go Fever</Link></button>
                </div>
            </div>
        )
    }
}
export default FeverStart;