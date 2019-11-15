import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class WeeklyChart extends Component {
    constructor() {
        super();
        this.state={
        }
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }

    componentDidMount(){
    }
    toggleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else{
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }
    render() {
        console.log(this.props.total_time)
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: this.props.weekstart+"~"+this.props.weekend,
                fontFamily: "verdana"
            },
            axisY: {
                title: "time",
                prefix: "",
                suffix: "h"
            },
            toolTip: {
                shared: true,
                reversed: true
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right",
                reversed: true,
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [
               {
                    type: "stackedColumn",
                    name: "FeverTime",
                    color: "red",
                    showInLegend: false,
                    yValueFormatString: "#,###.##h",
                    dataPoints: [
                        { label: this.props.days[0]+"(MON)", y: this.props.fever_time[0]/3600 },
                        { label: this.props.days[1]+"(TUE)", y: this.props.fever_time[1]/3600 },
                        { label: this.props.days[2]+"(WED)", y: this.props.fever_time[2]/3600 },
                        { label: this.props.days[3]+"(THU)", y: this.props.fever_time[3]/3600 },
                        { label: this.props.days[4]+"(FRI)", y: this.props.fever_time[4]/3600 },
                        { label: this.props.days[5]+"(SAT)", y: this.props.fever_time[5]/3600 },
                        { label: this.props.days[6]+"(SUN)", y: this.props.fever_time[6]/3600 },
                    ]
                 },
                {
                    type: "stackedColumn",
                    name: "NonFeverTime",
                    color: "gray",
                    showInLegend: false,
                    yValueFormatString: "#,###.##h",
                    dataPoints: [
                        { label: this.props.days[0]+"(MON)", y: (this.props.total_time[0]-this.props.fever_time[0])/3600 },
                        { label: this.props.days[1]+"(TUE)", y: (this.props.total_time[1]-this.props.fever_time[1])/3600 },
                        { label: this.props.days[2]+"(WED)", y: (this.props.total_time[2]-this.props.fever_time[2])/3600 },
                        { label: this.props.days[3]+"(THU)", y: (this.props.total_time[3]-this.props.fever_time[3])/3600 },
                        { label: this.props.days[4]+"(FRI)", y: (this.props.total_time[4]-this.props.fever_time[4])/3600 },
                        { label: this.props.days[5]+"(SAT)", y: (this.props.total_time[5]-this.props.fever_time[5])/3600 },
                        { label: this.props.days[6]+"(SUN)", y: (this.props.total_time[6]-this.props.fever_time[6])/3600 },
                    ]
                }]
        }

        return (
            <div className='StackedColumnChart'>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default WeeklyChart;