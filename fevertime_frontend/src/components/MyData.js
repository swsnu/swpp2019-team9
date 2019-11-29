import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import ColumnChart from "./Chart/ColumnChart";
import PieChart from "./Chart/PieChart";
import {Dropdown, DropdownButton} from 'react-bootstrap'
import Calendar from 'react-calendar'
import './Friends.css'
import PropTypes from 'prop-types';
class MyData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 0,
            selectCateg: 0, //0:All, 1:Study, 2:Work, 3: Read, 4:Etc.
            showModeDWM: 1, //0:Daily, 1:Weekly, 2:Monthly
            selectDate: new Date(),

            chartData: [],
            Title: '',
            selectedDWM: '',

            total_total_time: '',
            total_fever_time: '',
            avg_total_time: '',
            avg_fever_time: '',
            log:[],
            category_time: [],

            noData: true,
        }
    }

    componentDidMount() {
        let user_id = parseInt(window.location.href.split("/")[4], 10)
        this.setState({ user_id: user_id }, () => { this.getFeverData() })

    }

    categFunc = (selectCateg) => {
        if (selectCateg===0)return 'All'
        else if (selectCateg===1)return 'Study'
        else if (selectCateg===2)return 'Work'
        else if (selectCateg===3)return 'Read'
        else return 'Etc.'
    }

    getFeverData = () => {
        axios.get('/api/user/social/'+this.state.user_id+'/')
            .then(()=>{})
            .catch(()=>{
                this.props.history.goBack()
            })
            if (this.state.showModeDWM===0) this.getFeverData_D()
            else if (this.state.showModeDWM===1) this.getFeverData_WM('W')
            else this.getFeverData_WM('M')
    }
    getFeverData_D = () => {
        axios.post('/api/fever_data_D/', {
            user_id: this.state.user_id,
            selectDate: String(this.state.selectDate)
        }).then(res => {
            this.setState({
                total_total_time: res.data.t_t_time,
                total_fever_time: res.data.t_f_time,
                category_time: res.data.categ_time,
                log:res.data.log,
                selectedDWM: res.data.selectedDWM,
                noData: (res.data.t_t_time ==='0:00:00'),
            })
        })
    }

    getFeverData_WM = (v) => {
        axios.post('/api/fever_data_'+v+'/', {
            user_id: this.state.user_id,
            selectDate: String(this.state.selectDate),
            selectCateg: this.state.selectCateg
        }).then(res => {
            this.setState({
                total_total_time: res.data.t_t_time,
                total_fever_time: res.data.t_f_time,
                avg_total_time: res.data.avg_t_time,
                avg_fever_time: res.data.avg_f_time,
                category_time: res.data.categ_time,
                chartData: [
                    {
                        type: "stackedColumn",
                        name: "FeverTime",
                        color: "red",
                        showInLegend: false,
                        yValueFormatString: "#,##0.##h",
                        dataPoints: res.data.dataPointsF
                    }, {
                        type: "stackedColumn",
                        name: "NonFeverTime",
                        color: "gray",
                        showInLegend: false,
                        yValueFormatString: "#,##0.##h",
                        dataPoints: res.data.dataPointsN
                    }],
                selectedDWM: res.data.selectedDWM,
                noData: (res.data.t_t_time ==='0:00:00'),
            })
        })
    }

    onChangeCalendar = (selectDate) => {
        this.setState({ selectDate },()=>{this.getFeverData()})
    }

    clickDaily = () => {
        this.setState({
            showModeDWM : 0,
        }, () => { this.getFeverData() })
    }
    clickWeekly = () => {
        this.setState({
            showModeDWM : 1,
        }, () => { this.getFeverData() })
    }
    clickMonthly = () => {
        this.setState({
            showModeDWM : 2,
        }, () => { this.getFeverData() })
    }

    clickAll = () => {
        this.setState({
            selectCateg: 0
        }, () => { this.getFeverData() })
    }
    clickStudy = () => {
        this.setState({
            selectCateg: 1
        }, () => { this.getFeverData() })
    }
    clickWork = () => {
        this.setState({
            selectCateg: 2
        }, () => { this.getFeverData() })
    }
    clickRead = () => {
        this.setState({
            selectCateg: 3
        }, () => { this.getFeverData() })
    }
    clickEtc = () => {
        this.setState({
            selectCateg: 4
        }, () => { this.getFeverData() })
    }

    render() {
        return (
            <div className='form-container' id='mydata'>
                <div className='w-30  page-title mt-5'>My Data</div>
                <div className='d-flex mt-5 w-100 button-data'>
                    <div className='w-33' onClick={this.clickDaily} id='daily-button'>Daily</div>
                    <div className='w-33' onClick={this.clickWeekly} id='weekly-button'>Weekly</div>
                    <div className='w-33' onClick={this.clickMonthly} id='monthly-button'>Monthly</div>
                </div>
                <div className='mt-5 mb-5 d-flex'>
                    <div className='w-10'></div>
                    <div className='w-80'>
                        <Calendar
                            className='w-100'
                            onChange={this.onChangeCalendar}
                            value={this.state.selectDate}
                        />
                    </div>
                </div>
                <div className='t-center mt-5 d-flex'>
                    <div className='w-20'></div>
                    <div className='f-large w-60'>
                        {this.state.selectedDWM}
                    </div>
                    <div className='w-20'>
                        {(this.state.showModeDWM) ? (<div>
                            <DropdownButton className='t-center' id="dropdown-basic-button" title={"Category: " + this.categFunc(this.state.selectCateg)}>
                                <Dropdown.Item onClick={this.clickAll}>All</Dropdown.Item>
                                <Dropdown.Item onClick={this.clickStudy}>Study</Dropdown.Item>
                                <Dropdown.Item onClick={this.clickWork}>Work</Dropdown.Item>
                                <Dropdown.Item onClick={this.clickRead}>Read</Dropdown.Item>
                                <Dropdown.Item onClick={this.clickEtc}>Etc.</Dropdown.Item>
                            </DropdownButton>
                        </div>) : ('')}
                    </div>
                </div>
                {(this.state.noData) ? (
                    <div className='t-center f-large mt-5'>No Records!</div>
                ) : (
                        <div>
                            <div>{(this.state.showModeDWM === 0) ? (
                                <div className='mt-5'>
                                    <div className='d-flex mt-5 pl-5'>
                                        <div className='w-100 d-flex title-list'>
                                            <div className='w-15'>category</div>
                                            <div className='w-15'>tag</div>
                                            <div className='w-15'>start time</div>
                                            <div className='w-15'>total time</div>
                                            <div className='w-15'>fever time</div>
                                            <div className='w-15'>fever rate</div>
                                            <div className='w-15'>goal time</div>
                                        </div>
                                    </div>
                                    <div className='pl-5'>
                                            <div>
                                                {this.state.log.map((value, index) => {
                                                    return (
                                                        <div key={index} className='w-100 d-flex friend-item-list' id='group-name'>
                                                            <div className='w-15'>{value.category}</div>
                                                            <div className='w-15'>{value.tag}</div>
                                                            <div className='w-15'>{value.start_time}</div>
                                                            <div className='w-15'>{value.t_time}</div>
                                                            <div className='w-15'>{value.f_time}</div>
                                                            <div className='w-15'>{value.f_rate}%</div>
                                                            <div className='w-15'>{value.goalTime}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='mt-5'>
                                    <ColumnChart data={this.state.chartData} />
                                </div>
                            )}</div>

                            <div>
                                <div className='mt-5 d-flex'>
                                    <div className='w-30 f-large mt-5'>Total Time</div>
                                    <div className='w-20 f-large mt-5'>{this.state.total_total_time}</div>
                                    <div className='w-30 f-large mt-5'>Fever Time</div>
                                    <div className='w-20 f-large mt-5'>{this.state.total_fever_time}</div>
                                </div>

                                {(this.state.showModeDWM===0) ? ('') : (
                                    <div className='d-flex'>
                                        <div className='w-30 f-large mt-5'> Avg Total Time </div>
                                        <div className='w-20 f-large mt-5'>{this.state.avg_total_time}</div>
                                        <div className='w-30 f-large mt-5'>Avg Fever Time</div>
                                        <div className='w-20 f-large mt-5'>{this.state.avg_fever_time}</div>
                                    </div>)}
                                <div className='mt-5'>
                                    <PieChart category_time={this.state.category_time} />
                                </div>
                            </div>
                        </div>)}
            </div>
        )
    }
}

MyData.propTypes={
    history:PropTypes.object,
}

export default connect(null, null)(MyData);

