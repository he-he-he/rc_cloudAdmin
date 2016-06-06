import React, {Component} from 'react';
import Chart from "./charts";

export default class SparkingLine extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            title: this.props.title || "",
            value: this.props.value || "",
            datas: this.props.datas || [],
            width: this.props.width || "150",
            height: this.props.height || "18",
            minSpotColor: this.props.minSpotColor || "BLUE",
            maxSpotColor: this.props.maxSpotColor || "BLUE",
            spotRadius: this.props.spotRadius || 3,
            lineColor: this.props.lineColor || "DARKBLUE",
            fillColor: this.props.fillColor || "BLUE",
            lineWidth: this.props.lineWidth || 1.2,
            highlightLineColor: this.props.highlightLineColor || "DARKGREY",
            highlightSpotColor: this.props.highlightSpotColor || "DARKGREY",
        }
        var i = 1;
        this.state.datas = this.state.datas.map((va) => i++ + ":" + va);
    }
    render(){
        return (
            <div className="sparkline-row">
                <span className="title">{this.state.title}</span>
                <span className="value">{this.state.value}</span>
                <div ref="ctx" className="linechart">{Array.prototype.join.call(this.state.datas, ",")}</div>
            </div>
        );
    }
    componentDidMount(){
        $(this.refs.ctx).sparkline("html", {
            type: "line",
            height: this.state.height,
            width: this.state.width,
            minSpotColor: this.rgbColor(this.state.minSpotColor),
            maxSpotColor: this.rgbColor(this.state.maxSpotColor),
            spotRadius: 3,
            lineColor: this.rgbColor(this.state.lineColor),
            fillColor: this.rgbColor(this.state.fillColor, {type: "rgba", a: 0.1}),
            lineWidth: this.state.lineWidth,
            highlightLineColor: this.rgbColor(this.state.highlightLineColor),
            highlightSpotColor: this.rgbColor(this.state.highlightSpotColor),
        });
    }
}
SparkingLine.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired,
};