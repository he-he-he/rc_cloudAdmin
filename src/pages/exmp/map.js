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
                menus: {
                    show: true, 
                    fnMenuClick: this.onMenuClick.bind(this),
                    list: [
                        {type: "address", text: "获取坐标信息"}
                    ]
                }
            },
            filter: -1,
            carCode: "",
            list: []
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
                        <div style={{position: "relative"}}>
                            <Map {...this.state.map}/>
                            <div className="well well-sm" style={{position: "absolute", top: 0, left: 0, background: "#ffffff", opacity: "0.8"}}>
                                <form className="form-horizontal ">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <input type="text" ref="ctx_input" className="form-control" onChange={(event) => { this.onSearchChange(event.currentTarget.value); }} placeholder="请输入vin或者车主姓名或Sim卡号"/>
                                                <span className="input-group-btn">
                                                    <button className="btn btn-default" type="button" onClick={this.onSearch.bind(this)}>搜索</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-offset-3">
                                            <div class="form-group">
                                                <label className="col-md-4  control-label">状态筛选：</label>
                                                <div className="col-md-8">
                                                    <label className="radio-inline">
                                                        <input type="radio" className="uniform" name="mapfilter" value="all" checked={this.state.filter == -1} onChange={this.onFilterChange.bind(this, -1)}/>
                                                         全部 
                                                    </label>
                                                    <label className="radio-inline"> 
                                                        <input type="radio" className="uniform" name="mapfilter" value="online" checked={this.state.filter == 1} onChange={this.onFilterChange.bind(this, 1)}/>
                                                         在线 
                                                    </label>
                                                    <label className="radio-inline"> 
                                                        <input type="radio" className="uniform" name="mapfilter" value="offline" checked={this.state.filter == 0} onChange={this.onFilterChange.bind(this, 0)}/>
                                                         离线 
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.getGpsInfo(this.state.listParam);
    }

    getGpsInfo(){
        $.ajax({
            type: "get",
            url: this.state.url,
            data: {carCode: this.state.carCode},
            dataType: "json",
            success: (data) => {
                let map = Object.assign({}, this.state.map);
                map.data = this.filterData(data.list);
                this.setState({map: map, list: data.list});
            }
        });
    }
    filterData(data, filter){
        filter = filter !== undefined ? filter : this.state.filter;
        var list = [];
        for(var i = 0, z = data.length; i < z; i++){
            if(filter == -1 || data[i].isOntime == filter) list.push(data[i]);
        }
        return list;
    }

    onSearch(){
        this.getGpsInfo();
    }
    onSearchChange(value){
        var value = $.trim(value);
        this.setState({carCode: value});
    }
    onFilterChange(type){
        let map = Object.assign({}, this.state.map);
        map.data = this.filterData(this.state.list, type);
        this.setState({map: map, filter: type});
    }
    onMenuClick(obj){
        console.log(obj);
        alert("lng: " + obj.longitude + " lat: " + obj.latitude + " province: " + obj.province + " city: " + obj.city);
    }
}