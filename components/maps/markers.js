import './style/index.less'
import React, {Component} from 'react';

class Markers extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id={this.props.name} className="map"></div>
        );
    }
    componentDidMount() {
        const {name, data} = this.props;
        this.el = jQuery('#' + name).parents(".box");
        const map = this.map = new BMap.Map(name);
        const markers = []
        map.enableScrollWheelZoom();
        map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 7);
        for (let i = 0; i < data.length; i++) {

            let pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
            let marker = new BMap.Marker(pt);
            markers.push(marker);
            marker.addEventListener("click", (e) => {
                this.getMarkerInfo(data[i].id,pt)
            });

        }
        new BMapLib.MarkerClusterer(map, { markers: markers });
    }

    getMarkerInfo(id,pt) {
        App.blockUI(this.el);
        setTimeout(() => {
            App.unblockUI(this.el);
            const opts = {
                width: 100,
                height: 80,
                title: 'title'
            }
            const infoWindow = new BMap.InfoWindow('asdfd@@@', opts);
            this.map.openInfoWindow(infoWindow, pt);
        }, 2000)

    }

}

export default Markers;