import './style/index.less'
import React, {Component} from 'react';

export default class Map extends Component {
    constructor() {
        super();
        this.markers = [];
    }
    render(){
        return (
            <div id={this.props.name} className={"map " + this.props.className}></div>
        );
    }
    componentDidMount() {
        this.el = jQuery('#' + this.props.name).parents(".box");
        const map = this.map = new BMap.Map(this.props.name);
        const clu = this.clu = new BMapLib.MarkerClusterer(map, {maxZoom: this.props.markers.zoom !== false ? this.props.markers.zoom : 1});
        const menu = this.menu = new BMap.ContextMenu();
        this.geoc = new BMap.Geocoder();

        map.enableScrollWheelZoom();
        map.centerAndZoom(new BMap.Point(this.props.init.longitude, this.props.init.latitude), this.props.init.zoom);
        if(this.props.markers.show){
            this.clearMarkers();
            this.makeMarkers();
        }
        if(this.props.menus.show) this.makeMenus();
    }
    componentDidUpdate(){
        if(this.props.markers.show) this.makeMarkers();
    }

    panToCenter(point){
        this.map.panTo(point);
    }
    makeMarkers(){
        this.clearMarkers();
        for (let i = 0; i < this.props.data.length; i++) {
            let o = this.props.data[i];
            if(!o.longitude || !o.latitude) continue;
            let pt = new BMap.Point(o.longitude, o.latitude);
            let marker = new BMap.Marker(pt);
            this.markers.push(marker);
            marker.addEventListener("click", (e) => {
                this.getMarkerInfo(o, pt);
            });
        }
        this.clu.addMarkers(this.markers);
    }
    clearMarkers(){
        this.markers = [];
        this.clu.clearMarkers();
    }

    getMarkerInfo(obj, pt){
        App.blockUI(this.el);
        setTimeout(() => {
            App.unblockUI(this.el);
            const opts = {
                width: 100,
                height: 80,
                title: obj.carPlate
            }
            var str = "<span>" + obj.carCode + "</span>";
            const infoWindow = new BMap.InfoWindow(str, opts);
            this.map.openInfoWindow(infoWindow, pt);
        }, 200);
    }

    makeMenus(){
        if(!this.props.menus.list) return;
        var txtMenuItem = [];
        for(var i = 0, z = this.props.menus.list.length; i < z; i++){
            var o = this.props.menus.list[i];
            txtMenuItem.push({
                text: o.text,
                callback: (e) => {
                    const pt = new BMap.Point(e.lng, e.lat)
                    this.onMenuClick(pt, o.type);
                }
            });
        }
        for (var i = 0; i < txtMenuItem.length; i++) {
            this.menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        this.map.addContextMenu(this.menu);
    }
    onMenuClick(point, type){
        //this.panToCenter(point);
        this.geoc.getLocation(point, (rs) => {
            const addComp = rs.addressComponents;
            if(this.props.menus.fnMenuClick) 
                this.props.menus.fnMenuClick({longitude: point.lng, latitude: point.lat, province: addComp.province, city: addComp.city}, type);
        });
    }
}
Map.defaultProps = {
    init: {longitude: 116.417854, latitude: 39.921988, zoom: 7},
    data: [],
    markers: {show: false, zoom: 7},
    menus: {show: false, fnMenuClick: function(){}},
};
Map.propTypes = {
    name: React.PropTypes.string.isRequired
};