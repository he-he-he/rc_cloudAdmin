import React, {Component} from 'react';
import Chart from "./charts";

export default class PlotLiner extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            datas: this.props.datas || [],
            color: this.props.color || ["blue", "red", "yellow", "green"],
        }
        console.log(this.state.datas);
        this.state.color = this.state.color.map((va) => this.rgbColor(va));
    }
    render(){
        return (<div ref="ctx" className="chart"></div>);
    }
    componentDidMount(){
        var plot = $.plot($(this.refs.ctx), this.state.datas, {
            series: {
                lines: {
                    show: true,
                    lineWidth: 2,
                    fill: true,
                    fillColor: {colors: [{opacity: 0.05}, {opacity: 0.01}]}
                },
                points: {show: true},
                shadowSize: 2,
				grow: { active: false, duration: 1500 }
            },
            grid: {hoverable: true, clickable: true, tickColor: "#eee", borderWidth: 0},
            colors: this.state.color,
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {ticks: 11, tickDecimals: 0}
        });
        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 15,
                border: '1px solid #333',
                padding: '4px',
                color: '#fff',
                'border-radius': '3px',
                'background-color': '#333',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }
        var previousPoint = null;
        $(this.refs.ctx).bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });
    }
}
PlotLiner.propTypes = {
    datas: React.PropTypes.array.isRequired
}