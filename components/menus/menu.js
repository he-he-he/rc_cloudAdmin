import React, {Component} from "react";
import MenuItem from "./menu_item";

export default class MenuList extends Component{
    render(){
        return (
            <div className={this.props.className}>
                <div className="list-group">
                    <MenuItem text={this.props.title} className="title" icon="plus" fnBTClick={this.props.fnTitleBTClick}/>
                    {this.props.list.map((item, i) => 
                        <MenuItem 
                            key={"item_" + i} 
                            text={item.text} 
                            className={this.props.active == i ? "active" : ""} 
                            icon={item.icon} 
                            fnClick={() => {this.onClick(item.item, i)}}
                            fnBTClick={() => {this.onBTClick(item.item, i)}}
                        />
                    )}
                </div>
            </div>
        );
    }
    componentDidMount(){
        if(this.props.auto && this.props.list[this.props.active]){
            this.onClick(this.props.list[this.props.active].item, this.props.active);
        }
    }
    
    onClick(item, index){
        this.setState({active: index});
        this.props.fnItemClick(item, index);
    }
    onBTClick(item, index){
        this.props.fnItemBTClick(item, index);
    }
}
MenuList.defaultProps = {
    active: 0,
    auto: false,
    className: "",
    title: "",
    list: [],
    fnTitleBTClick: function(){},
    fnItemClick: function(){},
    fnItemBTClick: function(){}
};