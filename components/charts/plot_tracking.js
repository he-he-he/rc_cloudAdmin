import React, {Component} from 'react';
import Chart from "./charts";

export default class PlotTracking extends Chart{
    constructor(props){
        super(props);
        this.initState();
    }
    initState(){
        this.state = {
            datas: this.props.datas || [],
            color: this.props.color || ["blue", "red", "yellow", "green"],
        };
        for(var i = 0, z = this.state.datas.length; i < z; i++){
            this.state.datas[i].label += "=" + 0;
        }
        this.state.color = this.state.color.map((va) => this.rgbColor(va));
    }
    render(){
        return (<div ref="ctx" className="chart"></div>);
    }
    componentDidMount(){
        var plot = $.plot($(this.refs.ctx), this.state.datas, {
            series: {
                lines: {show: true}
            },
            crosshair: {mode: "x"},
            grid: {
                hoverable: true,
                borderWidth: 0,
                autoHighlight: false
            },
            //yaxis: {min: -1.2, max: 1.2},
            colors: this.state.color,
        });

        var legends = $(this.refs.ctx).find(".legendLabel");
        legends.each(function () {
            $(this).css('width', $(this).width());
        });

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
}