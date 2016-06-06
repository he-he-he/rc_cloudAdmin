import React, {Component} from 'react';
import Chart from "./charts";

export default class PlotBar extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            datas: this.props.datas || [],
            stack: this.props.stack || false,
            horizontal: this.props.horizontal || false,
            barWidth: this.props.barWidth || 0.6
        }
    }
    render(){
        return (<div ref="ctx" className="chart"></div>);
    }
    componentDidMount(){
        var options = {
                series:{
                    bars:{show: true},
                    stack: true
                },
                bars:{
                    horizontal: this.state.horizontal,
                    barWidth: this.state.barWidth
                },
                grid:{
                    borderWidth: 0
                },
                colors: ["#DB5E8C", "#F0AD4E", "#5E87B0"],
        };
        $.plot($(this.refs.ctx), this.state.datas, options); 
    }
}