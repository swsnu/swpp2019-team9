import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as Types from '../store/actions/actionTypes'
import TimeField from 'react-simple-timefield';
import AlarmMessageModal from "./component/PopupMessage";
import PropTypes from 'prop-types';

class FeverStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory:'',
            goalTime:'00:00',
            etcCategory:'',
            showAlarmMessage: false,
        }
    }

    changeGoalTime = (e) => {
        this.setState({
          goalTime: e.target.value
        })
    }
    changeEtcCategory = (e) => {
        this.setState({
          etcCategory: e.target.value
        })
    }

    changeCategory = (e) => {
        this.setState({
          selectedCategory: e.target.value
        })
    }

    onAlarmMessage = (message) => {
        this.setState({
            alarmMessage: message,
            showAlarmMessage: true
        })
    }

    clickAlarmClose = () => {
        this.setState({
            showAlarmMessage: false
        })
    }

    startFever = () => {
        
        if(this.props.storedID==null) this.onAlarmMessage('Please login')
        else if(this.state.goalTime==='00:00') this.onAlarmMessage('Insert your goalTime')
        else if(this.state.selectedCategory==='') this.onAlarmMessage('Select the category')
        else{
            this.props.onStoreFeverStart(this.state.selectedCategory, this.state.goalTime, this.state.etcCategory)
            this.props.history.push('/feverready')
        }
            
        
        
    }


    render() {
        return (
            <div className='FeverStart'>
                <AlarmMessageModal show={this.state.showAlarmMessage}
                                       modalTitle={'Go Fever failed!'}
                                       content={this.state.alarmMessage}
                                       isSuccess={false}
                                       clickClose={this.clickAlarmClose}
                                       clickConfirm={this.clickAlarmClose}
                />
                <div className='t-center mt-5 page-title'>Fever mode</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-10'>Goal Time (HH:MM)</div>
                    <TimeField  //https://reactjsexample.com/simple-react-time-input-field/
                        value={this.state.goalTime}                     // {String}   required, format '00:00' or '00:00:00'
                        onChange={this.changeGoalTime}      // {Function} required
                        input={<input className = 'w-10' id = 'id-input' />} // {Element}  default: <input type="text" />
                        colon=":"                        // {String}   default: ":"
                                              // {Boolean}  default: false
                    />

                </div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-10'>Category</div>
                        <div className="w-10">
                        <label>
                            Study 
                            <input className='ml-2 friend-add-button' type="radio" value="Study"
                                        checked={this.state.selectedCategory === 'Study'}
                                        onChange={this.changeCategory} 
                                        id ='study-radio'/>
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Work
                            <input className='ml-2 friend-add-button' type="radio" value="Work"
                                        checked={this.state.selectedCategory === 'Work'} 
                                        onChange={this.changeCategory} 
                                        id ='work-radio'/>
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Read
                            <input className='ml-2 friend-add-button' type="radio" value="Read"
                                        checked={this.state.selectedCategory === 'Read'} 
                                        onChange={this.changeCategory} 
                                        id ='read-radio'/>
                        </label>
                        </div>
                        <div className="w-30">
                        <label className='d-flex'>
                            Etc.
                            <input className='ml-2 friend-add-button etc-radio' type="radio" value="Etc."
                                        checked={this.state.selectedCategory === 'Etc.'} 
                                        onChange={this.changeCategory} 
                                        id ='etc-radio'/> 
                        </label>
                        </div>
                </div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-10'>Tag</div>
                    <div className='w-30 d-flex'>
                        <input className='input-1' onChange={this.changeEtcCategory} id='etc-text' />
                    </div>
                </div>

                <div className='d-flex d-ho-center mt-5'>
                    <button className='button-orange' onClick = {this.startFever} id ='start-button'>Go Fever</button>
                </div>
            </div>
        )
    }
}
FeverStart.propTypes={
    history:PropTypes.object,
    onStoreFeverStart:PropTypes.func,
    storedID:PropTypes.number,
}


const mapStateToProps = state =>{
    return {
        storedID:state.login.uid
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onStoreFeverStart: (selectedCategory, goalTime, etcCategory) =>
                dispatch({type:Types.FEVERSTART, selectedCategory:selectedCategory,
                goalTime:goalTime, etcCategory:etcCategory})
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(FeverStart);