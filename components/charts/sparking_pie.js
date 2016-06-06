import React, {Component} from 'react';
import Chart from "./charts";

export default class SparkingPie extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            title: this.props.title || "",
            value: this.props.value || "",
            datas: this.props.datas || [],
            height: this.props.height || "50",
            sliceColors: this.props.sliceColors || [],
        }
        this.state.sliceColors = this.state.sliceColors.map((va) => this.rgbColor(va));
    }
    render(){
        return (
            <div className="sparkline-row">
                <span className="title">{this.state.title}</span>
                <span className="value">{this.state.value}</span>
                <span ref="ctx" className="sparklinepie">{Array.prototype.join.call(this.state.datas, ",")}</span>
            </div>
        );
    }
    componentDidMount(){
        $(this.refs.ctx).sparkline("html", {
            type: "pie",
            height: this.state.height,
            sliceColors: this.state.sliceColors
        });
    }
}
SparkingPie.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired,
};