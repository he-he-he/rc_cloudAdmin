import React, {Component} from "react";

export default class Button extends Component{
    render(){
        return(
            <button className={"btn btn-" + this.props.className} onClick={this.props.fnClick} style={{marginRight: "10px"}}>
                <i className={"fa fa-" + this.props.icon}></i> {this.props.text}
            </button>
        );
    }
}
Button.defaultProps = {
    className: "primary",
    icon: "plus",
    text: "",
    fnClick: () => {}
}