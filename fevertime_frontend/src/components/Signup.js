import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import PopUpModal from "./component/PopUpModal"
/* 
    need /api/user/signup/ID
        get(ID)=> boolean :  check if ID is okay to use
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

    getCookie = (name)=> {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    


    clickSignUp = () =>{
        if(this.state.ID !== ""){
            
                return axios.get('api/user/signup/'+ this.state.ID+"/",)
                            .then(res => {
                                console.log(res)
                                this.checkInput(res)})
                            .catch(error => {this.checkInput(error.response)})
            
        }
        else{
            this.setState({WrongInput :this.state.WrongInput.splice(0,1, "Empty ID")})
            this.checkInput(null)
        }

    }

    checkInput = (result) =>{
        let LocalWrongInput = ["","","","","",""]
        let wrong = false;

        if(result !== null){
            if(result.status === 200){
                if(result.data=== "False"){
                    this.setState({WrongInput :this.state.WrongInput.splice(0,1, "ID Exist")})
                    wrong = true
                }
            }
            else{
                this.setState({WrongInput :this.state.WrongInput.splice(0,1, "Server Not responding")})
                wrong = true
            }
        }
        else{
            wrong = true;
            LocalWrongInput[0] = this.state.WrongInput[0]
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
            return axios.post('api/user/signup/'+this.state.ID+"/", {
                                ID : this.state.ID,
                                Nickname : this.state.Nickname,
                                Password : this.state.Password,},
                                )
                        .then(res => {this.afterPostHandler(res)})
                        .catch(error => {
                            console.log(error.response)
                            this.afterPostHandler(error.response)})
            
        }
    }

    afterPostHandler = (result) => {
        if(result.status === 201){
            this.props.history.push('/login')
        }
        else{
            window.alert("Please submit again Error : "+result.status)
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
                            onChange={(event => this.setState({
                                Term_of_Use: !this.state.Term_of_Use}))}
                    />
                    <div className='ml-1'>Terms of Use</div>
                    {this.state.WrongInput[4]}
                </div>
                <div className='d-flex mt-1'>
                    <div className='w-20'></div>
                    <input className='checkbox' type='checkbox'
                            id="Term_Personal_button"
                            onChange={(event => this.setState({
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
export default Signup;