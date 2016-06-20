import React, {Component} from "react";

export default class CFormButton extends Component{
    render(){
        return(
            <button className={"btn btn-" + this.props.className} onClick={this.props.onClick}>
                <i className={"fa fa-" + this.props.icon}></i> {this.props.text}
            </button>
        );
    }
}
CFormButton.defaultProps = {
    className: "primary",
    icon: "plus",
    text: "",
    fnClick: () => {}
}