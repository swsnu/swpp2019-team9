import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import PropTypes from 'prop-types';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ColumnChart extends Component {
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
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: this.props.title,
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
            data: this.props.data
        }

        return (
            <div className='StackedColumnChart'>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

ColumnChart.propTypes={
    title:PropTypes.string,
    data:PropTypes.array,
}

export default ColumnChart;