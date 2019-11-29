import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import PropTypes from 'prop-types';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Categories"
			},
			data: [{
				type: "pie",
				startAngle: 270,
				toolTipContent: "<b>{label}</b>: {y}h",
				showInLegend: "true",
				legendText: "{label}",
				yValueFormatString: "#,##0.00",
				indexLabelFontSize: 16,
				indexLabel: "{label} {y}h",
				dataPoints: [
					{ y: this.props.category_time[0]/3600, color: '#02bbca', label: "Study" },
					{ y: this.props.category_time[1]/3600, color: '#f2d352', label: "Work" },
					{ y: this.props.category_time[2]/3600, color: '#175a9e', label: "Read" },
					{ y: this.props.category_time[3]/3600, color: '#f2f2f2', label: "Etc." },
				].filter(data => data.y>0)
			}]
		}
	
		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

PieChart.propTypes={
    category_time:PropTypes.array,
}

export default PieChart;     