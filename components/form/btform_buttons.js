import React, {Component} from "react";

export default class BTFormButton extends Component{
    render(){
        return(
            <button className={"btn btn-" + this.props.className} onClick={this.props.fnClick} style={{marginRight: "10px"}}>
                <i className={"fa fa-" + this.props.icon}></i> {this.props.text}
            </button>
        );
    }
}
BTFormButton.defaultProps = {
    className: "primary",
    icon: "plus",
    text: "",
    fnClick: () => {}
}