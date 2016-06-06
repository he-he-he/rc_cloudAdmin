import React, {Component} from 'react';
import Chart from "./charts";

export default class EasyChart extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            value: this.props.value || 0,
            lineWidth: this.props.lineWidth || 5,
            barColor: this.props.barColor || "DARKGREY"
        }
    }
    render(){
        return (
            <div ref="ctx" className="piechart">
                <span className="percent"></span>
            </div>
        );
    }
    componentDidMount(){
		var va = $(this.refs.ctx).easyPieChart({
			easing: 'easeOutBounce',
			onStep: function(from, to, percent){
				$(this.el).find('.percent').text(Math.round(percent) + "%");
			},
			lineWidth: this.state.lineWidth,
			barColor: this.rgbColor(this.state.barColor)
		}).data("easyPieChart");
        va.update(this.state.value);
    }
}
EasyChart.propTypes = {
    value: React.PropTypes.string.isRequired
};