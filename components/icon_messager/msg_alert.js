import React, {Component} from "react";
import Item from "./msg_item";

export default class MsgItem extends Item{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <a href="javascript: void(0);" onClick={this.props.click.bind(this, this.props.index)}>
                <span className={"label label-" + this.props.type}><i className={"fa fa-" + this.props.icon}></i></span>
                <span className="body">
                    <span className="message"> {this.props.message} </span>
                    <span className="time">
                        <i className="fa fa-clock-o"></i>
                        <span>  {this.state.timeMsg}</span>
                    </span>
                </span>
            </a>
        );
    }
}
MsgItem.propTypes = {
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    message: React.PropTypes.string
};
MsgItem.defaultProps = {    
    index: 0,
    type: "default",
    icon: "bell",
    message: "",
    click: function(){ }
};