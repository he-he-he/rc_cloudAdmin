import React, {Component} from "react";

export default class VFormButton extends Component{
    render(){
        return(
            <button className={"btn btn-" + this.props.className} onClick={this.props.fnClick}>
                <i className={"fa fa-" + this.props.icon}></i> {this.props.text}
            </button>
        );
    }
}
VFormButton.defaultProps = {
    className: "primary",
    icon: "plus",
    text: "",
    fnClick: () => {}
}