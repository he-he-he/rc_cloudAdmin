import React, {Component} from "react";
import MenuItem from "./menu_item";

export default class MenuList extends Component{
    constructor(){
        super();
        this.state = {
            active: 0
        };
    }
    render(){
        return (
            <div className={this.props.className}>
                <div className="list-group">
                    <MenuItem text={this.props.title} className="title" icon="plus" fnBTClick={this.props.fnTitleBTClick}/>
                    {this.props.list.map((item, i) => 
                        <MenuItem 
                            key={"item_" + i} 
                            text={item.text} 
                            className={this.state.active == i ? "active" : ""} 
                            icon={item.icon} 
                            fnClick={() => {this.onClick(item.item, i)}}
                            fnBTClick={() => {this.onBTClick(item.item, i)}}
                        />
                    )}
                </div>
            </div>
        );
    }
    
    onClick(item, index){
        console.log(1, item, index);
        this.setState({active: index});
        this.props.fnItemClick(item, index);
    }
    onBTClick(item, index){
        console.log(2, item, index);
        this.props.fnItemBTClick(item, index);
    }
}
MenuList.defaultProps = {
    className: "",
    title: "",
    list: [],
    fnTitleBTClick: function(){},
    fnItemClick: function(){},
    fnItemBTClick: function(){}
};