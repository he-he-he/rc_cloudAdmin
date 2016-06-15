import React, {Component} from "react";

export default class MenuItem extends Component{
    render(){
        return (
            <span className={"list-group-item " + this.props.className} onClick={(event) => {this.props.fnClick();}}  style={{cursor: "pointer"}}>
                <span className="list-group-item-text" style={{float: "left"}}>{this.props.text}</span>
                <a 
                    href="javascript: void(0);" 
                    onClick={(event) => {this.props.fnBTClick(); event.stopPropagation();}} 
                    className="list-group-item-bt" 
                    style={{float: "right"}}>
                    <i className={"fa fa-" + this.props.icon}/>
                </a>
                <span className="clearfix"/>
            </span>
        );
    }
}
MenuItem.defaultProps = {
    text: "",
    className: "",
    icon: "remove",
    fnClick: function(){},
    fnBTClick: function(){}
};