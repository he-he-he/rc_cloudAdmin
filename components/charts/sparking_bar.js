import React, {Component} from 'react';
import Chart from "./charts";

export default class SparkingBar extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            title: this.props.title || "",
            value: this.props.value || "",
            datas: this.props.datas || [],
            height: this.props.height || "18",
            barWidth: this.props.barWidth || 5,
            barColor: this.props.barColor || "BLUE",
            barSpacing: this.props.barSpacing || "2"
        }
    }
    render(){
        return (
            <div className="sparkline-row">
                <span className="title">{this.state.title}</span>
                <span className="value">{this.state.value}</span>
                <span ref="ctx" className="sparkline" data-color="blue">{Array.prototype.join.call(this.state.datas, ",")}</span>
            </div>
        );
    }
    componentDidMount(){
        $(this.refs.ctx).sparkline("html", {
            type: "bar",
            barColor: this.rgbColor(this.state.barColor),
            height: this.state.height,
            barWidth: this.state.barWidth,
            barSpacing: this.state.barSpacing,
            zeroAxis: false
        });
    }
}
SparkingBar.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired,
};