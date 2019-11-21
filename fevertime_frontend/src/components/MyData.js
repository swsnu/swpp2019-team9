import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import ColumnChart from "./Chart/ColumnChart";
import PieChart from "./Chart/PieChart";
import {Dropdown, DropdownButton} from 'react-bootstrap'

const daysinweek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

class MyData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: 0,
            selectTime: 0,
            selectCateg: 0, //0:All, 1:Study, 2:Work, 3: Read, 4:Etc.
            showModeDWM: 1, //0:Daily, 1:Weekly, 2:Monthly

            chartData: [],
            Title: '',
            selectedDWM: '',

            total_total_time: '',
            total_fever_time: '',
            avg_total_time: '',
            avg_fever_time: '',

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
        if (this.state.showModeDWM===0) this.getFeverData_D()
        else if (this.state.showModeDWM===1) this.getFeverData_WM('W')
        else this.getFeverData_WM('M')
    }
    getFeverData_D = () => {
        axios.post('/api/fever_data_D/', {
            user_id: this.state.user_id,
            selectTime: this.state.selectTime
        }).then(res => {
            this.setState({
                total_total_time: res.data.t_t_time,
                total_fever_time: res.data.t_f_time,
                category_time: res.data.categ_time,
                selectedDWM: res.data.selectedDWM,
                noData: (res.data.t_t_time ==='0:00:00'),
            })
        })
    }

    getFeverData_WM = (v) => {
        axios.post('/api/fever_data_'+v+'/', {
            user_id: this.state.user_id,
            selectTime: this.state.selectTime,
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

    clickDaily = () => {
        this.setState({
            showModeDWM : 0,
            selectTime: 0,
        }, () => { this.getFeverData() })
    }
    clickWeekly = () => {
        this.setState({
            showModeDWM : 1,
            selectTime: 0,
        }, () => { this.getFeverData() })
    }
    clickMonthly = () => {
        this.setState({
            showModeDWM : 2,
            selectTime: 0,
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

    clickLeft = () => {
        this.setState({
            selectTime: this.state.selectTime - 1
        }, () => { this.getFeverData() })
    }

    clickRight = () => {
        this.setState({
            selectTime: this.state.selectTime + 1
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
                <div className='mt-5 d-flex'>
                    <button className='w-30 button-blue' onClick={this.clickLeft} id='left-button'>Left</button>
                    <div className='w-40'>
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
                    <button className='w-30 button-blue' onClick={this.clickRight} id='right-button'>Right</button>
                </div>
                <div className='t-center mt-5 f-large'>{this.state.selectedDWM}</div>
                {(this.state.noData) ? (
                    <div className='t-center f-large mt-5'>No Records!</div>
                ) : (
                        <div>
                            <div>{(this.state.showModeDWM === 0) ? ('') : (
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

export default connect(null, null)(MyData);

