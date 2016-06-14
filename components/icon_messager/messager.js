import React, {Component} from "react";
import Header from "./msg_header";
import Alert from "./msg_alert";
import Msg from "./msg_message";
import Scroll from "./msg_scroll";

export default class HeaderMessager extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: props.list
        }
    }
    render(){
        return (
            <li className="dropdown" id={"header-" + this.props.type}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className={"fa fa-" + this.getFrontClassName()}></i>
                    {this.makeBadge()}
                </a>
                <ul className={"dropdown-menu " + this.getUlClassName()}>
                    <Header ex={this.props.type == "message"} icon={this.getHeaderIcon()} title={this.state.list.length + " " + this.props.title}/>
                    {this.makeItem()}
                    <li className="footer" onClick={() => this.fnClick(this.props.type, "all", this.props.param)}>
                        <a href="#"> 查看所有{this.props.title} <i className="fa fa-arrow-circle-right"></i></a>
                    </li>
                </ul>
            </li>
        );
    }
    componentDidMount(){
        if(this.props.autoUpdate){
            setTimeout(() => {
                var list = this.state.list, len = this.state.list.length;
                list.push({message: "这是第" + (++len) + "个提示", type: "success"});
                this.setState({list: list});
            }, 5000);
        }
    }
    
    makeBadge(){
        return this.state.list.length > 0 ? <span className="badge">{this.state.list.length}</span> : "";
    }
    makeItem(){
        return this.state.list.map((va, i) => {
            switch(this.props.type){
                case "notification": return (<Alert {...va}/>);
                case "message": return (<Msg {...va}/>);
                case "tasks": return (<Scroll {...va}/>);
                default: return false;
            }
        }).map((va, i) => <li key={i} onClick={this.fnClick.bind(this, this.props.type, i, this.props.param)}>{va}</li>);
    }
    fnClick(type, index, param){
        this.props.click(type, index, param);
    }
    getFrontClassName(){
        switch(this.props.type){
            case "notification": return "bell";
            case "message": return "envelope";
            case "tasks": return "tasks";
            default: return "";
        };
    }
    getHeaderIcon(){
        switch(this.props.type){
            case "notification": return "bell";
            case "message": return "envelope-o";
            case "tasks": return "check";
            default: return "";
        };
    }
    getUlClassName(){
        switch(this.props.type){
            case "notification": return "notification";
            case "message": return "inbox";
            case "tasks": return "tasks";
            default: return "";
        };
    }
}
HeaderMessager.propTypes = {
    type: React.PropTypes.string.isRequired, //notification message task 必要保证全局唯一
    list: React.PropTypes.array,
    url: React.PropTypes.string
};
HeaderMessager.defaultProps = {
    url: "",
    type: "",
    title: "",
    list: [],
    autoUpdate: false,
    click: function(){},
    param: {}
};