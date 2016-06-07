import React, {Component} from "react";
import Item from "./msg_item";

export default class MsgItem extends Item{
    render(){
        return (
            <a href="javascript: void(0);" onClick={() => this.props.click(this.props.index) }>
                <img src={this.props.img} alt="" />
                <span className="body">
                    <span className="from">{this.props.title}</span>
                    <span className="message">{this.props.message}</span>
                    <span className="time">
                        <i className="fa fa-clock-o"></i>
                        <span>  {this.state.timeMsg}</span>
                    </span>
                </span>
            </a>
        );
    }
}
MsgItem.defaultProps = {
    index: 0,
    img: "static/img/avatars/avatar.jpg",
    title: "",
    message: "",
    click: function(){}
};