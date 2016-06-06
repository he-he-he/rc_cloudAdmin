import React, {Component} from 'react';

class MapSearch extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            filter: 'all'
        }
        this.onSearch = this.onSearch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div>
                <div className="well well-sm">
                    <form className="form-horizontal ">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="请输入vin或者车主姓名或Sim卡号"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button" onClick={this.onSearch}>搜索</button>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-5 col-md-offset-3">
                                <div class="form-group">
                                    <label className="col-md-4  control-label">状态筛选：</label>
                                    <div className="col-md-8">
                                        <label className="radio-inline"> <input type="radio" className="uniform" name="mapfilter" value="all" checked={this.state.filter === 'all' ? true : false} onChange = {this.handleChange}/> 全部 </label>
                                        <label className="radio-inline"> <input type="radio" className="uniform" name="mapfilter" value="online" checked={this.state.filter === 'online' ? true : false} onChange = {this.handleChange}/> 在线 </label>
                                        <label className="radio-inline"> <input type="radio" className="uniform" name="mapfilter" value="offline" checked={this.state.filter === 'offline' ? true : false} onChange = {this.handleChange}/> 离线 </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                    <div id={this.props.name} className="map"></div>
            </div>
        );
    }
    componentDidMount() {
        const {name} = this.props;
        this.el = jQuery('#' + name).parents(".box");
        const map = this.map = new BMap.Map(name);
        this.geoc = new BMap.Geocoder();
        map.enableScrollWheelZoom();
        map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 7);
        var menu = new BMap.ContextMenu();
        const txtMenuItem = [
            {
                text: '获取本省',
                callback: (e) => {
                    const pt = new BMap.Point(e.lng, e.lat)
                    this.onGetgeoc(pt, 'province');
                }
            },
            {
                text: '获取本市',
                callback: e => {
                    const pt = new BMap.Point(e.lng, e.lat)
                    this.onGetgeoc(pt, 'city');
                }
            }
        ];
        for (var i = 0; i < txtMenuItem.length; i++) {
            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        map.addContextMenu(menu);
    }
    handleChange(e) {
        this.setState({ filter: e.target.value });
    }
    onSearch() {
        this.setState({ visible: true })
    }
    onClose() {
        this.setState({ visible: false })
    }
    onGetgeoc(pt, local) {
        this.geoc.getLocation(pt, (rs) => {
            const addComp = rs.addressComponents;
            alert(addComp[local])
            // this.getBoundary(addComp[local]) //无法点击
        });
    }
    getBoundary(str) {
        const bdary = new BMap.Boundary();
        const map = this.map;

        bdary.get(str, (rs) => {
            map.clearOverlays();
            var count = rs.boundaries.length;
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: "#ff0000" });
                map.addOverlay(ply);
                pointArray = pointArray.concat(ply.getPath());
            }
            map.setViewport(pointArray);
        });
    }

}

export default MapSearch;
