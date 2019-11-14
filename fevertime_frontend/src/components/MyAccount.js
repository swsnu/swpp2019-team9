import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Popup from "./component/PopupMessage";
import axios from 'axios';
import * as actionCreators from "../store/actions/index"
class MyAccount extends Component {
    state={
        nickname: this.props.storedMyAccount.nickname,
        password: "",
        password_confirm: "",
        WrongInput : ["","",""],
        showSigninPopup: false,
        showErrorPopup : false,
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
            this.setState({showSigninPopup:true})
        }
    }
    clickSigninClose= ()=>{
        this.props.changeMyAccount({nickname : this.state.nickname,password : this.state.password,})
            .then(()=>{this.setState({showSigninPopup:false,showErrorPopup:true})})
    }
    clickErrorClose = ()=>{
        this.setState({showErrorPopup:false})
    }
    clicktoggle = ()=>{
        axios.put('/api/user/social/')
            .then(this.props.onGetUser())
    }
    render() {
        return (
            <div className='form-container MyAccount'>
                <Popup show={this.state.showSigninPopup}
                                modalTitle={'Notice'}
                                content={"Login after modification"}
                                buttonConfirm={'OK'}
                                isSuccess={true}
                                clickClose={this.clickSigninClose}
                                clickConfirm={this.clickSigninClose}
                />
                <Popup show={this.state.showErrorPopup}
                                modalTitle={'Not Available'}
                                content={"Nickname Exists"}
                                buttonConfirm={'OK'}
                                isSuccess={true}
                                clickClose={this.clickErrorClose}
                                clickConfirm={this.clickErrorClose}
                />
                <div className='t-center mt-5 page-title'>My Account</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>ID</div>
                    <input className='w-30 input-1 disable-input' defaultValue={this.props.storedMyAccount.username} disabled/>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Nickname</div>
                    <input className='w-30 input-1' id="nickname_input" defaultValue={this.props.storedMyAccount.nickname}
                    onChange={(event => this.setState({nickname: event.target.value}))}
                    />
                    <div className='ml-3 f-small'>
                        {this.state.WrongInput[0]}
                    </div>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password</div>
                    <input className='w-30 input-1' id="password_input" type="password"
                    onChange={(event => this.setState({
                        password: event.target.value}))}
                    />
                    <div className='ml-3 f-small'>
                        {this.state.WrongInput[1]}
                    </div>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password Confirm</div>
                    <input className='w-30 input-1' id="password_confirm_input"type="password"
                    onChange={(event => this.setState({
                        password_confirm: event.target.value}))}
                    />
                    <div className='ml-3 f-small'>
                        {this.state.WrongInput[2]}
                    </div>
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Fever Info Disclosure</div>
                    <button className='w-30 button-blue' id="toggle-button"
                            onClick = {this.clicktoggle}
                    >toggle</button>
                </div>
                <div className='t-center mt-5 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue' id="confirm_button"
                    onClick = {()=>this.clickConfirmChange()}
                    >Confirm Change</button>
                    <div className='w-30'></div>
                </div>
            </div>
        )
    }
}
MyAccount.propTypes={
    storedMyAccount:PropTypes.object,
    changeMyAccount:PropTypes.func,
    history:PropTypes.object,
    onGetUser:PropTypes.func,
}

const mapStateToProps = state =>{
    return{
        storedMyAccount:state.login,
    };
};
const mapDispatchToProps = dispatch =>{
    return{
        changeMyAccount : (pkt) => dispatch(actionCreators.ChangeMyAccount(pkt)),
        onGetUser: ()=>dispatch(actionCreators.getUserInfo()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyAccount));
