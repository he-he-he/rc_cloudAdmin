import React, {Component} from "react";
import VFormBase from "./vform_base";
import VFormItem from "./vform_item";
import VFormButton from "./vform_buttons";

export default class VForm extends VFormBase{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    render(){
        return (
            <div className={this.props.className} style={{lineHeight: "34px"}}>
                {this.props.columns.map((item, i) => <VFormItem key={"item" + i} {...item} fnChange={this.onChange}/>)}
                <div className="clearfix"/>
                <div className="form-group col-xs-12" style={{padding: "0 15px"}}>
                    <label className="col-xs-2"/>
                    <div className="col-xs-9">
                    {this.props.buttons.map((item, i) => 
                        <VFormButton key={"button_" + i} {...item} fnClick={item.type == "submit" ? this.onSubmit : item.fnClick}/>
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
