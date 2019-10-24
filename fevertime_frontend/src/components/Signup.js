import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Signup extends Component {
    render() {
        return (
            <div className='form-container Signup'>
                <div className='t-center mt-5 page-title'>Sign Up</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>ID</div>
                    <input className='w-30 input-1'/>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Nickname</div>
                    <input className='w-30 input-1'/>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password</div>
                    <input className='w-30 input-1' type="password"/>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password Confirm</div>
                    <input className='w-30 input-1' type="password"/>
                </div>
                <div className='d-flex mt-3'>
                    <div className='w-20'></div>
                    <input className='checkbox' type='checkbox'/>
                    <div className='ml-1'>Terms of Use</div>
                </div>
                <div className='d-flex mt-1'>
                    <div className='w-20'></div>
                    <input className='checkbox' type='checkbox'/>
                    <div className='ml-1'>Collect and use of personal information</div>
                </div>
                <div className='t-center mt-4 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue'><Link to='/'>Sign up</Link></button>
                    <div className='w-30'></div>
                </div>
            </div>
        )
    }
}
export default Signup;