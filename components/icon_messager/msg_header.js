import React, {Component} from "react";

export default class MsgHeader extends Component{
    render(){
        var ex = this.props.ex ? <span className="compose pull-right tip-right" title={this.props.extitle}><i className={"fa fa-" + this.props.exicon}></i></span> : "";
        return (
            <li className="dropdown-title">
                <span><i className={"fa fa-" + this.props.icon}></i>{this.props.title}</span>
                {ex}
            </li>
        );
    }
}
MsgHeader.defaultProps = {            
    icon: "bell",
    title: "",
    ex: false,
    exicon: "pencil-square-o",
    extitle: ""
};