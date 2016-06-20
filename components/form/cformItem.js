import 'rc-calendar/assets/index.css';
import React, {Component} from "react";
import Calendar from "rc-calendar";
import DatePicker from 'rc-calendar/lib/Picker';
import CFormButton from "./cformButton";
import DateTimeFormat from 'gregorian-calendar-format';

const dateFormatter = new DateTimeFormat('yyyy-MM-dd');

export default class CFormItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            calendarValue: props.defaultValue
        }

        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    render(){
        return(
            <div className={"form-group " + this.props.className} style={{marginBottom: "5px"}}>
                {/*<label className={"control-label " + this.props.labelClassName} style={{padding: 0, whiteSpace: "nowrap"}}>{this.props.labelText}</label>*/}
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
                    onChange={this.onChange}
                    type="text" 
                    className="form-control"
                    placeholder={this.props.placeHolder} 
                    defaultValue={this.props.defaultValue}
                    style={{height: "36px"}}
                />;
            case "textarea": 
                return <textarea 
                    ref="ctx"
                    rows={this.props.inputRows} 
                    onChange={this.onChange}
                    className="form-control"
                    placeholder={this.props.placeHolder} 
                    defaultValue={this.props.defaultValue}
                    style={{resize: "none"}}
                />;
            case "select":
                return <select
                    ref="ctx"
                    onChange={this.onChange}
                    defaultValue={this.props.defaultValue}
                    className="form-control"
                    style={{height: "36px"}}
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
                            onChange={this.onChange}
                            name={this.props.filed}
                            defaultValue={va.value}
                            defaultChecked={this.props.defaultValue == va.value}
                            style={{marginTop: "10px", height: "36px"}}
                        /> {va.text} 
                    </label>
                );
            case "checkbox":
                return this.props.inputList.map((va, i) => 
                    <label className="checkbox-inline" key={"input_checkbox_" + i}>
                        <input 
                            ref={"ctx_" + i}
                            type="checkbox"
                            onChange={this.onChange}
                            name={this.props.filed}
                            defaultValue={va.value}
                            defaultChecked={this.props.defaultValue && this.props.defaultValue.toString().split(",").indexOf(va.value.toString()) > -1}
                            style={{marginTop: "10px", height: "36px"}}
                        /> {va.text} 
                    </label>
                );
            case "datetime": 
                var calendar = <Calendar/>; 
                return <DatePicker onChange={this.onCalendarChange} calendar={calendar}>
                {
                    ({value}) => <input 
                        ref="ctx"
                        onChange={this.onChange}
                        type="text" 
                        className="form-control"
                        placeholder={this.props.placeHolder} 
                        value={value && dateFormatter.format(value)}
                        defaultValue={this.props.defaultValue}
                        style={{height: "36px"}}
                    />
                }
            </DatePicker>; 
            case "button": return <CFormButton {...this.props}/>;
            default: return "";
        }
    }

    onCalendarChange(value){
        var va = {}, value = dateFormatter.format(value);
        va[this.props.filed] = value;
        this.setState({calendarValue: value});
        this.props.fnChange(va);
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
        va[this.props.filed] = value;
        this.props.fnChange(va);
    }
}
CFormItem.defaultProps = {
    className: "col-lg-2 col-md-4 col-xs-6", //col-xs-12 col-md-6 col-lg-4",
    labelText: "",
    labelClassName: "col-xs-3",
    inputClassName: "", //"col-xs-9", 
    filed: "",

    defaultValue: "", 
    type: "text", 

    placeHolder: "", 

    inputRows: 5,
    inputCols: 30,

    inputList: [],

    fnChange: function(){}
}