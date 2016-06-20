import React, {Component} from "react";
import VFormBase from "./vform_base";
import VFormItem from "./vform_item";
import Button from "./buttons";

export default class VForm extends VFormBase{
    constructor(props){
        super(props);
        this.state = {
            columns: props.columns
        };

        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render(){
        return (
            <div className={this.props.className} style={{lineHeight: "34px"}}>
                {this.state.columns.map((item, i) => <VFormItem key={"item" + i} {...item} fnChange={this.onChange}/>)}
                <div className="clearfix"/>
                <div className="form-group col-xs-12" style={{padding: "0 15px"}}>
                    <label className="col-xs-2"/>
                    <div className="col-xs-9">
                        <Button text="保存" icon="save" className="primary" fnClick={this.onSubmit}/>
                        <Button text="重置" icon="refresh" className="default" fnClick={this.onReset}/>
                    {this.props.buttons.map((item, i) => 
                        <Button key={"button_" + i} {...item} fnClick={item.fnClick ? item.fnClick : () => {}}/>
                    )}
                    </div>
                </div>
                <div className="clearfix"/>
            </div>
        );
    }
    componentDidMount(){
        this.makeValues();
    }
    componentDidUpdate(){
        this.makeValues();
    }

    makeValues(){
        var values = {};
        for(var i = 0, z = this.props.columns.length; i < z; i++)
            values[this.props.columns[i].field] = this.props.columns[i].value;
        this.values = values;
    }

    onChange(value){
        var va = {};
        va[value.field] = value.value;
        this.values =Object.assign({}, this.values, va);
        this.props.fnChange(value);
    }
    onReset(){
        this.setState({columns: this.props.columns})
    }
    onSubmit(){
        this.props.fnSubmit(this.values);
    }
}
VForm.propTypes = {
    columns: React.PropTypes.array.isRequired
};
VForm.defaultProps = {
    buttons: [],
    className: "",
    buttonsClassName: "col-xs-12 form-group",
    fnChange: function(){},
    fnSubmit: function(){}
};
