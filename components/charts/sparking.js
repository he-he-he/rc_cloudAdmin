import React, {Component} from 'react';
import Chart from "./charts";

export default class SparkingBar extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            type: this.props.type,
            value: this.props.value,
            datas: this.props.datas,
            title: this.props.title || "",
            width: this.props.width || 150,
            height: this.props.height || 18,
            
            //bar
            barWidth: this.props.barWidth || 5,
            barColor: this.props.barColor || "BLUE",
            barSpacing: this.props.barSpacing || "2",
            
            //line
            minSpotColor: this.props.minSpotColor || "BLUE",
            maxSpotColor: this.props.maxSpotColor || "BLUE",
            spotRadius: this.props.spotRadius || 3,
            lineColor: this.props.lineColor || "DARKBLUE",
            fillColor: this.props.fillColor || "BLUE",
            lineWidth: this.props.lineWidth || 1.2,
            highlightLineColor: this.props.highlightLineColor || "DARKGREY",
            highlightSpotColor: this.props.highlightSpotColor || "DARKGREY",
            
            //pie
            sliceColors: this.props.sliceColors || [],
        }
    }
    render(){
        var className = "";
        switch(this.state.type){
            case "line": 
                className = "linechart"; 
                var i = 1;
                this.state.datas = this.state.datas.map((va) => i++ + ":" + va);
                break;
            case "bar": 
                className = "sparkline"; 
                break;
            case "pie": 
                className = "sparklinepie"; 
                this.state.sliceColors = this.state.sliceColors.map((va) => this.rgbColor(va));
                break;
            default: break;
        }
        return (
            <div className="sparkline-row">
                <span className="title">{this.state.title}</span>
                <span className="value">{this.state.value}</span>
                <span ref="ctx" className={className} data-color="blue">{Array.prototype.join.call(this.state.datas, ",")}</span>
            </div>
        );
    }
    componentDidMount(){
        $(this.refs.ctx).sparkline("html", {
            type: this.state.type,
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
            
            barColor: this.rgbColor(this.state.barColor),
            barWidth: this.state.barWidth,
            barSpacing: this.state.barSpacing,
            zeroAxis: false,
            
            sliceColors: this.state.sliceColors
        });
    }
}
SparkingBar.propTypes = {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired,
};