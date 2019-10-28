import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actionCreators from "../store/actions/index";
import {connect} from 'react-redux'

class MyAccount extends Component {
    state={
        nickname: this.props.storedMyAccount.nickname,
        password: "",
        password_confirm: "",
    }
    render() {
        return (
            <div className='form-container MyAccount'>
                <div className='t-center mt-5 page-title'>My Account</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>ID</div>
                    <input className='w-30 input-1' defaultValue={this.props.storedMyAccount.username} disabled/>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Nickname</div>
                    <input className='w-30 input-1' defaultValue={this.props.storedMyAccount.nickname}/>
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
        storedMyAccount:state.login,
    };
};
const mapDispatchToProps = dispatch =>{
    return{
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);