import React, { Component } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
/* 
    need /api/user/signup/
        post(ID, Nickname, Password) : make new user
*/

class Signup extends Component {
    state = {
        ID : "",
        Nickname : "",
        Password : "",
        Password_Confirm : "",
        Term_of_Use : false,
        Term_of_Personal_info : false,
        WrongInput : ["","","","","",""],
    }

    clickSignUp= () => {
        let LocalWrongInput = ["","","","","",""]
        let wrong = false;

        if(this.state.ID ===""){
            LocalWrongInput.splice(0,1, "Empty ID")
            wrong = true
        }

        if(this.state.Nickname === ""){
            LocalWrongInput.splice(1,1, "Empty Nickname")
            wrong = true
        }

        if(this.state.Password === ""){
            LocalWrongInput.splice(2,1,"Empty Password")
            wrong = true
        }

        if(this.state.Password !== this.state.Password_Confirm){
            LocalWrongInput.splice(3,1,"Wrong Password Confirm")
            wrong = true
        }

        if(!this.state.Term_of_Use){
            LocalWrongInput.splice(4,1,"Please Check")
            wrong = true
        }

        if(!this.state.Term_of_Personal_info){
            LocalWrongInput.splice(5,1,"Please Check")
            wrong = true
        }

        this.setState({WrongInput : LocalWrongInput})

        if(!wrong){
            return axios.post('/api/user/signup/', {
                                username : this.state.ID,
                                nickname : this.state.Nickname,
                                password : this.state.Password,},
                                )
                        .then(() => {this.props.history.push('/login')})
                        .catch(() => {
                            LocalWrongInput[0]="ID exists"
                            this.setState({WrongInput : LocalWrongInput})})
            
        }
    }

    render() {
        return (
            <div className='form-container Signup'>
                <div className='t-center mt-5 page-title'>Sign Up</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>ID</div>
                    <input className='w-30 input-1'
                            id="ID_input"
                            onChange={(event => this.setState({
                                ID: event.target.value}))}
                    />
                    {this.state.WrongInput[0]}
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Nickname</div>
                    <input className='w-30 input-1'
                            id="Nickname_input"
                        onChange={(event => this.setState({
                            Nickname: event.target.value}))}
                    />
                    {this.state.WrongInput[1]}
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password</div>
                    <input className='w-30 input-1' type="password"
                            id="Password_input"
                            onChange={(event => this.setState({
                                Password: event.target.value}))}
                    />
                    {this.state.WrongInput[2]}
                </div>
                <div className='d-flex mt-3 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-20'>Password Confirm</div>
                    <input className='w-30 input-1' type="password"
                            id="Password_Confirm_input"
                            onChange={(event => this.setState({
                                Password_Confirm: event.target.value}))}
                    />
                    {this.state.WrongInput[3]}
                </div>
                <div className='d-flex mt-3'>
                    <div className='w-20'></div>
                    <input className='checkbox' type='checkbox'
                            id="Term_Use_button"
                            onChange={() => this.setState({
                                Term_of_Use: !this.state.Term_of_Use})}
                    />
                    <div className='ml-1'>Terms of Use</div>
                    {this.state.WrongInput[4]}
                </div>
                <div className='d-flex mt-1'>
                    <div className='w-20'></div>
                    <input className='checkbox' type='checkbox'
                            id="Term_Personal_button"
                            onChange={(() => this.setState({
                                Term_of_Personal_info: !this.state.Term_of_Personal_info}))}
                    />
                    <div className='ml-1'>Collect and use of personal information</div>
                    {this.state.WrongInput[5]}
                </div>
                <div className='t-center mt-4 d-flex'>
                    <div className='w-30'></div>
                    <button className='w-40 button-blue'
                            id="Signup_button"
                            onClick = {()=>this.clickSignUp()}
                    >Sign up</button>
                    <div className='w-30'></div>
                </div>
            </div>
        )
    }
}
Signup.propTypes={
    history: PropTypes.object
}
export default Signup;