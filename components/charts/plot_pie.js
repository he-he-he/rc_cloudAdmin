import React, {Component} from 'react';
import Chart from "./charts";

export default class PlotPie extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            datas: this.props.datas || [],
            innerRadius: this.props.innerRadius || 0.6
        }
    }
    render(){
        return (<div ref="ctx" className="chart"></div>);
    }
    componentDidMount(){
        $.plot($(this.refs.ctx), this.state.datas, {
            series: {
                pie: {
                    innerRadius: this.props.innerRadius,
                    show: true
                }
            },
            colors: ["#D9534F", "#A8BC7B", "#F0AD4E", "#70AFC4", "#DB5E8C", "#FCD76A", "#A696CE"]
        });
    }
}