import React, {Component} from 'react';
import {Layout, Boxs, Maps, Forms} from '../../../components'
const {Row, Col} = Layout;
const {Box} = Boxs;
const {MapSearch, Map} = Maps;

export default class Baimap extends Component {
    constructor(){
        super();
        this.state = {
            url: "rtGpsData",
            map: {
                data: [],
                name: "bmap",
                markers: {show: true, zoom: 8},
                menus: {show: true}
            },
            search: {
                columns: [
                    {type: "text", labelText: "VIN码", fieldName: "carCode"},
                    {type: "text", labelText: "车牌号", fieldName: "carPlate"},
                    {type: "text", labelText: "SIM卡号", fieldName: "simNumber"},
                    {type: "select", labelText: "ACC状态", fieldName: "accStatus", defaultValue: -1, inputList: [{value: -1, text: "全部"}, {value: 1, text: "开"}, {value: 0, text: "关"}]}
                ],
                buttons: [{type: "submit", className: "info", text: "搜索"}]
            },
            listParam: {
                carCode: "",
                carPlate: "",
                simNumber: "",
                accStatus: "-1",
                longitude: "",
                latitude: ""
            }
        };
        // this.state.listParam.isPaging = this.state.listParam.isPaging || true;
        // this.state.listParam.pageNo = this.state.listParam.pageNo || 1;
        // this.state.listParam.pageSize = this.state.listParam.pageSize || 10;
    }
    render(){
        return (
            <Row>
                <Col>
                    <Box title="地图">
                        <Forms.CForm {...this.state.search} fnSubmit={this.onSearch.bind(this)}/>
                        <Map {...this.state.map} fnMenuClick={this.onMenuClick.bind(this)}/>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.getGpsInfo();
    }

    getGpsInfo(param){
        $.ajax({
            type: "get",
            url: this.state.url,
            data: param,
            dataType: "json",
            success: (data) => {
                let map = Object.assign({}, this.state.map);
                map.data = data.list;
                this.setState({map: map, listParam: param});
            }
        });
    }

    onSearch(param){
        param = Object.assign({}, this.state.listParam, param);
        if(param.accStatus < 0) delete param.accStatus;
        this.getGpsInfo(param);
    }

    onMenuClick(point, type){
        this.onSearch(point);
    }
}