import React, {Component} from 'react';
import Chart from "./charts";

export default class Plot extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            type: this.props.type, //bar line pie
            datas: this.props.datas || [],
            stack: this.props.stack || false,
            color: this.props.color || ["#DB5E8C", "#F0AD4E", "#5E87B0", "blue", "red", "yellow", "green", "darkblue", "scalet", "gold", "seagreen"],
            opacity: this.props.opacity || 1,
            crosshair: this.props.crosshair || "", //"x" "xy" "y"
            shadowSize: this.props.shadowSize || 0,
            //grow
            active: this.props.active || false,
            duration: this.props.duration || 500,
            //grid
            hoverable: this.props.hoverable || true,
            tickColor: this.props.tickColor || "grey",
            //legend
            legend: this.props.legend || this.props.type == "line" ? false : true,
            //line
            lineWidth: this.props.lineWidth || 2,
            fill: this.props.fill || false,
            points: this.props.points || false,
            fillColor: this.props.fillColor || ["grey", "grey"],
            hover: this.props.hover || true,
            //pie
            innerRadius: this.props.innerRadius || 0.6,
            //bar
            horizontal: this.props.horizontal || false,
            barWidth: this.props.barWidth || 0.6,
            //axis
            fontColor: this.props.fontColor || "black"
        }
        this.state.color = this.state.color.map((va) => this.rgbColor(va));
        this.state.tickColor = this.rgbColor(this.state.tickColor, {type: "rgba", a: 0.4});
        this.state.fillColor = this.state.fillColor.map((va) => this.rgbColor(va, {type: "rgba", a: 0.1}));
        if(this.state.crosshair){
            for(var i = 0, z = this.state.datas.length; i < z; i++){
                this.state.datas[i].label += "=" + 0;
            }
        }
    }
    render(){
        return (<div ref="ctx" className="chart"></div>);
    }
    componentDidMount(){
        var option = {
            series: {
                lines: {
                    show: this.state.type == "line",
                    lineWidth: this.state.lineWidth,
                    fill: this.state.fill,
                    fillColor: {colors: this.state.fillColor}
                },
                points: {show: this.state.points},
                
                pie: {
                    innerRadius: this.props.innerRadius,
                    show: this.state.type == "pie"
                },
                
                bars:{show: this.state.type == "bar"},
                
				grow: { active: this.state.active, duration: this.state.duration },
                shadowSize: this.state.shadowSize,
                stack: this.state.stack
            },
            bars:{
                horizontal: this.state.horizontal,
                barWidth: this.state.barWidth
            },
                
            crosshair: {mode: this.state.crosshair},
            grid:{
                borderWidth: 0,
                hoverable: this.state.hoverable, 
                clickable: false, 
                tickColor: this.state.tickColor
            },
            colors: this.state.color,
            xaxis: {
                font: {
                    color: this.state.fontColor
                }
            },
            yaxis: {
                font: {
                    color: this.state.fontColor
                }
            },
            legend: {show: true}
        };
        var plot = $.plot($(this.refs.ctx), this.state.datas, option);
        
        switch(this.state.type){
            case "line":
                if(this.state.hover){
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
                                var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
                                showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });
                }
                if(this.state.crosshair){
                    var legends = $(this.refs.ctx).find(".legendLabel");
                    legends.each(function(){ $(this).css('width', $(this).width()); });

                    var updateLegendTimeout = null;
                    var latestPosition = null;

                    function updateLegend() {
                        updateLegendTimeout = null;
                        var pos = latestPosition;
                        var axes = plot.getAxes();
                        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max || pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) return;

                        var i, j, dataset = plot.getData();
                        for (i = 0; i < dataset.length; ++i) {
                            var series = dataset[i];
                            for (j = 0; j < series.data.length; ++j)
                                if (series.data[j][0] > pos.x) break;
                            var y, p1 = series.data[j - 1],
                                p2 = series.data[j];
                            if (p1 == null) y = p2[1];
                            else if (p2 == null) y = p1[1];
                            else y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
                            legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
                        }
                    }

                    $(this.refs.ctx).bind("plothover", function (event, pos, item) {
                        latestPosition = pos;
                        if (!updateLegendTimeout) updateLegendTimeout = setTimeout(updateLegend, 50);
                    });
                }
                break;
            default: break;
        }
    }
}
Plot.propTypes = {
    type: React.PropTypes.string.isRequired,
    datas: React.PropTypes.array.isRequired,
};