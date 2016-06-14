import React, {Component} from "react";

export default class MsgItem extends Component{
    constructor(){
        super();
        this.state = {
            time: new Date(),
            timeMsg: "刚刚"
        }
    }
    componentDidMount(){
        this.makeTimeMsg();
    }
    componentWillUnmount(){
        clearTimeout(this.t);
    }

    makeTimeMsg(){
        this.t = setTimeout(() => {
            var str = "";
            var time = Math.round((new Date() - this.state.time) / 1000);
            if(time > 3600){
                str += (time / 3600).toFixed(0) + " 小时 ";
                time = time % 3600;
            }
            if(time > 60){
                str += (time / 60).toFixed(0) + " 分钟";
                time = time % 60;
            }
            str = str.length > 0 ? str + "前" : "刚刚";
            this.setState({timeMsg: str});
            this.makeTimeMsg();
        }, 60000);
    }
}