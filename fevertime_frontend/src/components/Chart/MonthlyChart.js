import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MonthlyChart extends Component {
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
                text: String(this.props.year)+'/'+String(this.props.month),
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
                    dataPoints: this.props.fever_time.map((v,index)=>{return {label:String(index+1), y: v/3600 }}),
                 },
                {
                    type: "stackedColumn",
                    name: "NonFeverTime",
                    color: "gray",
                    showInLegend: false,
                    yValueFormatString: "#,###.##h",
                    dataPoints: this.props.total_time.map((v,index)=>{return {label:String(index+1), y: (v-this.props.fever_time[index])/3600 }}),
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

export default MonthlyChart;