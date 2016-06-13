import React, {Component} from "react";

export default class CFormItem extends Component{
    render(){
        return(
            <div className={"form-group " + this.props.className} style={{marginBottom: "5px"}}>
                <label className={"control-label " + this.props.labelClassName} style={{padding: 0, whiteSpace: "nowrap"}}>{this.props.labelText}</label>
                <div className={this.props.inputClassName}>
                {this.makeInputElement()}
                </div>
            </div>
        );
    }
    makeInputElement(){
        switch(this.props.type){
            case "text": 
                return <input 
                    ref="ctx"
                    onChange={this.onChange.bind(this)}
                    type="text" 
                    className="form-control"
                    placeHolder={this.props.inputPlaceHolder} 
                    defaultValue={this.props.defaultValue}
                />;
            case "textarea": 
                return <textarea 
                    ref="ctx"
                    rows={this.props.inputRows} 
                    onChange={this.onChange.bind(this)}
                    className="form-control"
                    placeHolder={this.props.inputPlaceHolder} 
                    defaultValue={this.props.defaultValue}
                    style={{resize: "none"}}
                />;
            case "select":
                return <select
                    ref="ctx"
                    onChange={this.onChange.bind(this)}
                    defaultValue={this.props.defaultValue}
                    className="form-control"
                >
                {this.props.inputList.map((va, i) => <option key={"value_option_" + i} value={va.value}>{va.text}</option> )}
                </select>
            case "radio":
                return this.props.inputList.map((va, i) => 
                    <label className="radio-inline" key={"input_radio_label_" + i}>
                        <input 
                            ref={"ctx_" + i}
                            type="radio"
                            className="uniform"
                            onChange={this.onChange.bind(this)}
                            name={this.props.fieldName}
                            defaultValue={va.value}
                            defaultChecked={this.props.defaultValue == va.value}
                            style={{marginTop: "10px"}}
                        /> {va.text} 
                    </label>
                );
            case "checkbox":
                return this.props.inputList.map((va, i) => 
                    <label className="checkbox-inline" key={"input_checkbox_" + i}>
                        <input 
                            ref={"ctx_" + i}
                            type="checkbox"
                            onChange={this.onChange.bind(this)}
                            name={this.props.fieldName}
                            defaultValue={va.value}
                            defaultChecked={this.props.defaultValue && this.props.defaultValue.toString().split(",").indexOf(va.value.toString()) > -1}
                            style={{marginTop: "10px"}}
                        /> {va.text} 
                    </label>
                );
            default: return "";
        }
    }

    onChange(){
        var value = "";
        switch(this.props.type){
            case "text": 
            case "textarea": 
            case "select": value = this.refs.ctx.value ? $.trim(this.refs.ctx.value) : ""; break;
            case "radio": 
                for(var i in this.refs)
                    if(this.refs[i].checked) value = this.refs[i].value;
                break;
            case "checkbox":
                for(var i in this.refs)
                    if(this.refs[i].checked) value += this.refs[i].value + ",";
                if(value.length > 0) value = value.substr(0, value.length - 1);
                break;
            default: break;
        }
        var va = {};
        va[this.props.fieldName] = value;
        this.props.fnChange(va);
    }
}
CFormItem.defaultProps = {
    className: "col-xs-12 col-md-6 col-lg-4",
    labelText: "",
    labelClassName: "col-xs-3",
    inputClassName: "col-xs-9", 
    fieldName: "",

    defaultValue: "", 
    type: "text", 

    inputPlaceHolder: "", 

    inputRows: 5,
    inputCols: 30,

    inputList: [],

    fnChange: function(){}
}