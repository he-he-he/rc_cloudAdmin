import React, {Component} from 'react';
import Chart from "./charts";

export default class Gage extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            name: this.props.name,
            value: this.props.value,
            min: this.props.min || 0,
            max: this.props.max || 100,
            title: this.props.title || "",
            width: this.props.width || "150",
            height: this.props.height || "150",
            showMinMax: this.props.showMinMax || false,
            gaugeWidthScale: this.props.gaugeWidthScale || 1.2,
            shadowOpacity: this.props.shadowOpacity || 0,
            levelColors: this.props.levelColors || ["blue", "red", "yellow", "green"],
        }
        this.state.levelColors = this.state.levelColors.map((va) => this.rgbColor(va, {type: "r16"}));
    }
    render(){
        return (<div ref="ctx" id={this.state.name}></div>);
    }
    componentDidMount(){
        new JustGage({
            id: this.state.name,
            value: this.state.value,
            min: this.state.min,
            max: this.state.max,
            title: this.state.title,
            width: this.state.width,
            height: this.state.height,
            showMinMax: this.state.showMinMax,
            gaugeWidthScale: this.state.gaugeWidthScale,
            shadowOpacity: this.state.shadowOpacity,
            shadowSize: 4,
            shadowVerticalOffset: 0,
            levelColors: this.state.levelColors
        });
    }
}
JustGage.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
}