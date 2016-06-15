import React, {Component} from "react";

export default class VFormButton extends Component{
    render(){
        return(
            <button className={"btn btn-" + this.props.className} onClick={this.onClick.bind(this)}>
                <i className={"fa fa-" + this.props.icon}></i> {this.props.text}
            </button>
        );
    }

    onClick(){
        this.props.fnClick();
    }
}
VFormButton.defaultProps = {
    className: "primary",
    icon: "plus",
    text: "",
    fnClick: function(){}
}