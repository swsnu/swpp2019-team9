import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import * as actionCreators from "../store/actions/index";
import {connect} from 'react-redux'

class Login extends Component {
    state={
        username:"",
        password:"",
    }
    clickLogin=()=>{
        this.props.onLoginUser(this.state.username,this.state.password);
    }
    render() {
        return (
            <div className='form-container Login'>
                <div className='t-center mt-5 page-title'>Login</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>ID</div>
                    <input className='w-30 input-1' onChange={(event)=>this.setState({username:event.target.value})} id='id-input'/>
                </div>
                <div className='d-flex mt-4 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password</div>
                    <input className='w-30 input-1' type="password" onChange={(event)=>this.setState({password:event.target.value})} id='pw-input'/>
                </div>
                <div className='t-center mt-4 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue'onClick={this.clickLogin} id='login-button'>Login</button>
                    <div className='w-30'></div>
                </div>
                <div className='d-flex mt-5'>
                    <div className='w-30'></div>
                    <div className='w-20'>Don't have ID yet?</div>
                    <button className='w-20 button-white' id='signup-button'><Link className='color-black' to='signup'>Signup</Link></button>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoginUser: (username,password)=>
            dispatch(actionCreators.loginUser({username:username,password:password})),
    }
}
export default connect(null,mapDispatchToProps)(Login);