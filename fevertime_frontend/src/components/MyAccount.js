import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import axios from "axios";
import * as actionCreators from "../store/actions/index"
class MyAccount extends Component {
    state={
        nickname: this.props.storedMyAccount.nickname,
        password: "",
        password_confirm: "",
        WrongInput : ["","",""],
    }
    clickConfirmChange = () =>{
        let LocalWrongInput = ["","",""]
        let wrong = false;
        if(this.state.nickname === ""){
            LocalWrongInput.splice(0,1, "Empty Nickname")
            wrong = true
        }

        if(this.state.password === ""){
            LocalWrongInput.splice(1,1,"Empty Password")
            wrong = true
        }

        if(this.state.password !== this.state.password_confirm){
            LocalWrongInput.splice(2,1,"Wrong Password Confirm")
            wrong = true
        }
        this.setState({WrongInput : LocalWrongInput})

        if(!wrong){
            this.props.changeMyAccount({
                nickname : this.state.nickname,
                password : this.state.password,})
            return
        }
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
                    <input className='w-30 input-1' defaultValue={this.props.storedMyAccount.nickname}
                    onChange={(event => this.setState({nickname: event.target.value}))}
                    />
                    {this.state.WrongInput[0]}
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password</div>
                    <input className='w-30 input-1' type="password"
                    onChange={(event => this.setState({
                        password: event.target.value}))}
                    />
                    {this.state.WrongInput[1]}
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password Confirm</div>
                    <input className='w-30 input-1' type="password"
                    onChange={(event => this.setState({
                        password_confirm: event.target.value}))}
                    />
                    {this.state.WrongInput[2]}
                </div>
                <div className='t-center mt-5 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue'
                    onClick = {()=>this.clickConfirmChange()}
                    >Confirm Change</button>
                    <div className='w-30'></div>
                </div>
            </div>
        )
    }
}
MyAccount.propTypes={
    storedMyAccount:PropTypes.object
}

const mapStateToProps = state =>{
    return{
        storedMyAccount:state.login,
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        changeMyAccount : (pkt) => dispatch(actionCreators.ChangeMyAccount(pkt)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(MyAccount);