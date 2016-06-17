import React, {Component} from "react";
import CFormItem from "./cformitem";
import CFormButton from "./cformButton";

export default class CForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            values: {}
        }
        for(var i = 0, z = this.props.columns.length; i < z; i++){
            var o = this.props.columns[i];
            this.state.values[o.filed] = o.defaultValue ? o.defaultValue : "";
        }
    }
    render(){
        var bts = [];
        return (
            <div className={this.props.className} style={{lineHeight: "34px"}}>
                {this.props.columns.map((item, i) => <CFormItem key={"item" + i} {...item} fnChange={item.fnChange ? item.fnChange : this.onChange.bind(this)}/>)}
                {/*<div className="clearfix"/>*/}
                {/*<div className="form-group" style={{padding: "0 15px"}}>*/}
                    {/*<div className={this.props.buttonsClassName}>*/}
                        {this.props.buttons.map((item, i) => 
                            <CFormButton key={"button_" + i} {...item} fnClick={item.type == "submit" ? this.onSubmit.bind(this) : item.fnClick}/>
                        )}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="clearfix"/>
            </div>
        );
    }

    onChange(va){
        var values = Object.assign({}, this.state.values, va);
        this.setState({values: values});
    }
    onSubmit(){
        this.props.fnSubmit(this.state.values);
    }
}
CForm.propTypes = {
    columns: React.PropTypes.array.isRequired,
    buttons: React.PropTypes.array.isRequired
};
CForm.defaultProps = {
    className: "well well-sm",
    fnSubmit: function(){},
    buttonsClassName: "col-xs-12 btn-toolbar text-right"
};