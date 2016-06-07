import React, {Component} from "react";

export default class MsgHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            icon: this.props.icon || "bell",
            title: this.props.title || "",
            ex: this.props.ex || false,
            exicon: this.props.exicon || "pencil-square-o",
            extitle: this.props.extitle || "",
        }
    }
    render(){
        var ex = this.state.ex ? <span className="compose pull-right tip-right" title={this.state.extitle}><i className={"fa fa-" + this.state.exicon}></i></span> : "";
        return (
            <li className="dropdown-title">
                <span><i className={"fa fa-" + this.state.icon}></i>{this.state.title}</span>
                {ex}
            </li>
        );
    }
}