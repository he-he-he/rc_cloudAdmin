import React, {Component} from 'react';
import {Layout, Boxs, Charts} from '../../../components';
const {Row, Col} = Layout;
const {Box, BoxTab,DashBox} = Boxs;
const {EasyChart, SparkingBar, SparkingLine, SparkingPie, Gage, PlotLiner, PlotTracking, PlotBar, PlotPie, XChart} = Charts;

export default class Index extends Component {
    render() {
        var plot_line_datas = [
            {label: "一季度", data: []},
            {label: "二季度", data: []},
            {label: "三季度", data: []},
            {label: "四季度", data: []}
        ];
        for(var i = 0, z = plot_line_datas.length; i < z; i++){
            plot_line_datas[i].data = plot_line_datas[i].data || [];
            for(var _i = 1; _i <= 30; _i++) {
                plot_line_datas[i].data.push([_i, parseInt(Math.random() * 100)]);
            }
        }
        
        var plot_bar_datas = [
            {label: "1", data: []},
            {label: "2", data: []},
            {label: "3", data: []},
            {label: "4", data: []}
        ];
        for(var i = 0, z = plot_bar_datas.length; i < z; i++){
            plot_line_datas[i].data = plot_line_datas[i].data || [];
            for(var _i = 1; _i <= 20; _i++) {
                plot_bar_datas[i].data.push([_i, parseInt(Math.random() * 100)]);
            }
        }
        
        var d1 = [];
        for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);
        var d2 = [];
        for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);
        var d3 = [];
        for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);
            
        var d4 = [];
        for (var i = 0; i <= 14; i += 1)
            d4.push([parseInt(Math.random() * 30), i]);
        var d5 = [];
        for (var i = 0; i <= 14; i += 1)
            d5.push([parseInt(Math.random() * 30), i]);
        var d6 = [];
        for (var i = 0; i <= 14; i += 1)
            d6.push([parseInt(Math.random() * 30), i]);
        
        var plot_pie_datas = [
            {label: "Series1", data: Math.floor(Math.random() * 100)},
            {label: "Series2", data: Math.floor(Math.random() * 100)},
            {label: "Series3", data: Math.floor(Math.random() * 100)},
            {label: "Series4", data: Math.floor(Math.random() * 100)},
            {label: "Series5", data: Math.floor(Math.random() * 100)},
            {label: "Series6", data: Math.floor(Math.random() * 100)},
            {label: "Series7", data: Math.floor(Math.random() * 100)},
            {label: "Series8", data: Math.floor(Math.random() * 100)},
            {label: "Series9", data: Math.floor(Math.random() * 100)},
        ];
        
        var xchart_datas = [
            {
                className: ".pizza",
                data: [
                    {"x": "2012-11-05", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-06", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-07", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-08", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-09", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-10", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-11", "y": Math.floor(Math.random() * 100)}
                ]
            },
            {
                className: ".ffff",
                data: [
                    {"x": "2012-11-05", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-06", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-07", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-08", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-09", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-10", "y": Math.floor(Math.random() * 100)},
                    {"x": "2012-11-11", "y": Math.floor(Math.random() * 100)}
                ]
            }
        ];
        return (
            <div>
                <Row>
                    <Col lg="12" md="6">
                        <Box title="折线图 - dotted 模式下后面那条线上的点 hover 事件会被挡住">
                            <XChart datas={xchart_datas} name="x1" type="line-dotted" xScale="ordinal"/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="6">
                        <Box title="柱状图 - 不支持提示框">
                            <XChart datas={xchart_datas} name="x2" type="bar" xScale="ordinal"/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="6">
                        <Box title="折线图 - 要求数据顺序 与追踪折线图存在数据污染这两个折线图不要在同一个数据源使用">
                            <PlotLiner datas={plot_line_datas}/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="6">
                        <Box title="追踪折线图 - 要求数据顺序 与折线图存在数据污染这两个折线图不要在同一个数据源使用">
                            <PlotTracking datas={plot_bar_datas}/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" md="6">
                        <Box title="垂直柱形图 - 要求数据顺序 按照第一个参数排序 d1 中的 i 的位置">
                            <PlotBar datas={[d1, d2, d3]}/>
                        </Box>
                    </Col>
                    <Col lg="6" md="6">
                        <Box title="水平柱形图 - 要求数据顺序 按照第二个参数排序 d4 中的 i 的位置">
                            <PlotBar horizontal={true} datas={[d4, d5, d6]}/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" md="6">
                        <Box title="饼图 - 不支持多组数据">
                            <PlotPie datas={plot_pie_datas}/>
                        </Box>
                    </Col>
                    <Col lg="6" md="6">
                        <Box title="环形饼图 - 不支持多组数据">
                            <PlotPie innerRadius="0.4" datas={plot_pie_datas}/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" md="6">
                        <Box title="环形进度图">
                            <EasyChart value="53" barColor="DEEPPINK" lineWidth="1"/>
                            <EasyChart value="4" barColor="ORANGERED" lineWidth="2"/>
                            <EasyChart value="98" barColor="DARKGREY" lineWidth="3"/>
                            <EasyChart value="76" barColor="SCARLET" lineWidth="4"/>
                            <EasyChart value="53" barColor="GREEN" lineWidth="5"/>
                            <EasyChart value="4" barColor="HOTPINK" lineWidth="6"/>
                            <EasyChart value="98" barColor="MAGENTA" lineWidth="7"/>
                            <EasyChart value="76" barColor="DARKBLUE" lineWidth="8"/>
                            <EasyChart value="76" barColor="GOLD" lineWidth="9"/>
                            <EasyChart value="53" barColor="CYAN" lineWidth="10"/>
                        </Box>
                    </Col>
                    <Col lg="6" md="6">
                        <Box title="说明图">
                            <SparkingBar title="450" value="233" height="55" barColor="gold" datas={[1, 3, 4, 5, 6, 7, 1, 4, 7, 3, 10]}/>
                            <SparkingLine title="450" value="233" height="55" datas={[1, 3, 4, 5, 6, 7, 1, 4, 7, 3, 10]}/>
                            <SparkingPie title="450" value="233" height="55" sliceColors={["red", "blue", "yellow"]} datas={[20, 70, 45]}/>
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12" md="6">
                        <Box title="标题">
                            <div style={{width: "200px", height: "150px", display: "inline-block"}}><Gage name="g1" title="g1"gaugeWidthScale="0.2" value={Math.round(Math.random() * 100)}/></div>
                            <div style={{width: "200px", height: "150px", display: "inline-block"}}><Gage name="g2" title="g2" gaugeWidthScale="0.6" value={Math.round(Math.random() * 100)}/></div>
                            <div style={{width: "200px", height: "150px", display: "inline-block"}}><Gage name="g3" title="g3" gaugeWidthScale="1" shadowOpacity="1"  gaugeWidthScale="1.2" value={Math.round(Math.random() * 100)}/></div>
                            <div style={{width: "200px", height: "150px", display: "inline-block"}}><Gage name="g4" title="g4" gaugeWidthScale="0.8" value={Math.round(Math.random() * 100)}/></div>
                            <div style={{width: "200px", height: "150px", display: "inline-block"}}><Gage name="g5" title="g5" min="50" max="100" showMinMax={true} value={Math.round(Math.random() * 100)}/></div>
                        </Box>
                    </Col>
                </Row>
            </div>
        )
    }
}