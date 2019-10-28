import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actionCreators from "../store/actions/index";
import {connect} from 'react-redux'

class MyAccount extends Component {
    componentDidMount(){
        this.props.onGetUserInfo()
    }
    render() {
        return (
            <div className='form-container MyAccount'>
                <div className='t-center mt-5 page-title'>My Account</div>
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
                <div className='t-center mt-5 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue'><Link to='/'>Confirm Change</Link></button>
                    <div className='w-30'></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        storedMyAccount:state.user,
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        onGetUserInfo:() =>
            dispatch(actionCreators.getUserInfo()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);