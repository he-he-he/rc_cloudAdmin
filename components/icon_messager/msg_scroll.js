import React, {Component} from "react";

export class Scroll extends Component{
    render(){
        return (
            <div className={"progress-bar progress-bar-" + this.props.type} style={{width: this.props.value + "%"}}></div>
        );
    }
}
Scroll.defaultProps = {
    type: "",
    value: 0
};

export default class Item extends Component{
    render(){
        var list = this.props.list.map((va, i) => <Scroll key={i} {...va}/>);
        return (
            <a href="javascript: void(0);" onClick={() => this.props.click(this.props.index) }>
                <span className="header clearfix">
                    <span className="pull-left">{this.props.title}</span>
                    <span className="pull-right">{this.props.message}%</span>
                </span>
                <div className="progress">{list}</div>
            </a>
        );
    }
}
Item.propTypes = {
    list: React.PropTypes.array.isRequired
};
Item.defaultProps = {
    index: 0,
    title: "",
    message: "",
    list: [],
    click: function(){}
};