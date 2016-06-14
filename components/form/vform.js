import React, {Component} from "react";
import VFormBase from "./vform_base";

export default class VForm extends VFormBase{
    constructor(props){
        super(props);
        this.state = {
            value: props.value
        };
    }
    render(){
        return <div><input value={this.state.value} onChange={(event) => {this.onChange(event); }}/></div>
    }
    componentDidMount(){}
    componentWillReceiveProps(nextProps){
        if(this.props.value != nextProps.value) this.setState({value: nextProps.value})
    }

    onChange(event){
        this.setState({value: event.currentTarget.value});
        this.props.fnChange({name: this.props.name, value: event.currentTarget.value});
    }
}
VForm.defaultProps = {
    name: "",
    value: "",
    fnChange: function(){}
}