import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import * as Types from '../store/actions/actionTypes'
import TimeField from 'react-simple-timefield';

class FeverStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory:'',
            goalTime:'00:00',
            etcCategory:'',
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

    startFever = (e) => {
        if(this.state.goalTime==='00:00') alert('Insert your goalTime!')
        else if(this.state.selectedCategory==='') alert('Select the category!')
        else if(this.state.selectedCategory!=='Etc.'){
                this.props.onStoreFeverStart(this.state.selectedCategory, this.state.goalTime, '')
                this.props.history.push('/feverready')      
        }
        else if(this.state.etcCategory === ''){
            alert('Insert your Etc. Category!')
        }
        else{
            this.props.onStoreFeverStart(this.state.selectedCategory, this.state.goalTime, this.state.etcCategory)
            this.props.history.push('/feverready')
        }
            
        
        
    }



    render() {
        return (
            <div>
                <div className='t-center mt-5 page-title'>Fever mode</div>
                <div className='d-flex mt-5 d-v-center'>
                    <div className='w-20'></div>
                    <div className='w-10'>Goal Time (HH:MM)</div>
                    <TimeField  //https://reactjsexample.com/simple-react-time-input-field/
                        value={this.state.goalTime}                     // {String}   required, format '00:00' or '00:00:00'
                        onChange={this.changeGoalTime}      // {Function} required
                        input={<input className = 'w-10' />} // {Element}  default: <input type="text" />
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
                            <input type="radio" value="Study"
                                        checked={this.state.selectedCategory === 'Study'}
                                        onChange={this.changeCategory} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Work
                            <input type="radio" value="Work" 
                                        checked={this.state.selectedCategory === 'Work'} 
                                        onChange={this.changeCategory} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Reading
                            <input type="radio" value="Reading" 
                                        checked={this.state.selectedCategory === 'Reading'} 
                                        onChange={this.changeCategory} />
                        </label>
                        </div>
                        <div className="w-10">
                        <label>
                            Etc.
                            <input type="radio" value="Etc." 
                                        checked={this.state.selectedCategory === 'Etc.'} 
                                        onChange={this.changeCategory} />
                        </label>
                        </div>
                        <div className = "w-30">
                        {(this.state.selectedCategory === 'Etc.')?(
                            <input className='w-30 input-1'onChange = {this.changeEtcCategory}/>
                        ):('')}</div>

                </div>
                <div className='d-flex d-ho-center mt-5'>
                    <button className='button-orange' onClick = {this.startFever}>Go Fever</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStoreFeverStart: (selectedCategory, goalTime, etcCategory) =>
                dispatch({type:Types.FEVERSTART, selectedCategory:selectedCategory,
                goalTime:goalTime, etcCategory:etcCategory})
    };
};
export default connect(null,mapDispatchToProps)(FeverStart);