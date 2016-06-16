import React, {Component} from "react";
import VFormBase from "./vform_base";

export default class VFormItem extends VFormBase{
    constructor(props){
        super(props);
        this.state = {
            value: props.value
        };
    }
    render(){
        return (
            <div className={"form-group " + this.props.className} style={{marginBottom: "5px", display: this.props.type == "hidden" ? "none" : "block"}}>
                <label className={"text-right control-label " + this.props.labelClassName} style={{padding: 0, whiteSpace: "nowrap"}}>{this.props.title}</label>
                <div className={this.props.inputClassName}>
                {this.makeInputElement()}
                </div>
            </div>
        );
        //return <div><input value={this.state.value} onChange={(event) => {this.onChange(event); }}/></div>
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.state.value) this.setState({value: nextProps.value})
    }

    makeInputElement(){        
        switch(this.props.type){
            case "text": 
                return <input 
                    ref="ctx"
                    onChange={(event) => { this.onChange(event); }}
                    type="text" 
                    className="form-control"
                    placeHolder={this.props.placeHolder} 
                    value={this.state.value}
                />;
            case "textarea": 
                return <textarea 
                    ref="ctx"
                    rows={this.props.rows} 
                    onChange={(event) => { this.onChange(event); }}
                    className="form-control"
                    placeHolder={this.props.placeHolder} 
                    value={this.state.value}
                    style={{resize: "none"}}
                />;
            case "select":
                return <select
                    ref="ctx"
                    onChange={(event) => { this.onChange(event); }}
                    value={this.state.value}
                    className="form-control"
                >
                {this.props.list.map((va, i) => <option key={"value_option_" + i} value={va.value}>{va.text}</option> )}
                </select>
            case "radio":
                return this.props.list.map((va, i) => 
                    <label className="radio-inline" key={"input_radio_label_" + i}>
                        <input 
                            ref={"ctx_" + i}
                            type="radio"
                            className="uniform"
                            onChange={(event) => { this.onChange(event); }}
                            name={this.props.field}
                            Checked={this.state.value == va.value}
                            style={{marginTop: "10px"}}
                        /> {va.text} 
                    </label>
                );
            case "checkbox":
                return this.props.list.map((va, i) => 
                    <label className="checkbox-inline" key={"input_checkbox_" + i}>
                        <input 
                            ref={"ctx_" + i}
                            type="checkbox"
                            onChange={(event) => { this.onChange(event); }}
                            name={this.props.field}
                            Checked={this.state.value && this.state.value.toString().split(",").indexOf(va.value.toString()) > -1}
                            style={{marginTop: "10px"}}
                        /> {va.text} 
                    </label>
                );
            case "button": return <CFormButton {...this.props}/>;
            default: return "";
        }
    }

    onChange(event){
        this.setState({value: event.currentTarget.value});
        this.props.fnChange({field: this.props.field, value: event.currentTarget.value, res: true});
    }
}
VFormItem.propTypes = {
    type: React.PropTypes.string.isRequired,
    field: React.PropTypes.string.isRequired
};
VFormItem.defaultProps = {
    title: "",
    value: "",
    className: "col-xs-12",
    labelClassName: "col-xs-2",
    inputClassName: "col-xs-9", 
    placeHolder: "", 
    rows: 5,
    list: [],
    valid: {},
    fnChange: function(){}
};