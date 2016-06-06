import React, {Component} from 'react';
import Chart from "./charts";

export default class XChart extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            type: this.props.type, //'line-dotted'  'bar'  'line'
            name: this.props.name,
            datas: this.props.datas,
            xScale: this.props.xScale || "ordinal",
            yScale: this.props.yScale || "linear",
        }
    }
    render(){
        return (
            <figure className="chart" id={this.state.name}></figure>
        );
    }
    componentDidMount(){
        var _this = this;
        var tt = document.createElement('div'),
        leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
        topOffset = -32;
        tt.className = 'ex-tooltip';
        document.body.appendChild(tt);
        var data = {
            xScale: this.state.xScale,
            yScale: this.state.yScale,
            main: this.state.datas
        };
        var opts = {};
        if(this.state.xScale == "time"){
            opts.dataFormatX = function (x) { return d3.time.format('%Y-%m-%d').parse(x); };
            opts.tickFormatX = function (x) { return d3.time.format('%A')(x); };
        }
        if(this.state.type == "line-dotted"){
            opts.mouseover = function (d, i) {
                var pos = $(this).offset();
                $(tt).text(_this.state.xScale == "time" ? d3.time.format('%A')(d.x) + ': ' + d.y : d.x + ":" + d.y).css({top: topOffset + pos.top, left: pos.left + leftOffset}).show();
            };
            opts.mouseout = function (x) { $(tt).hide(); };
        }
        var myChart = new xChart(this.state.type, data, "#" + this.state.name, opts);
    }
}
XChart.propTypes = {
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired
}