import React, {Component} from "react";
import BTFormButton from "./btform_buttons";

export default class BTForm extends Component{
    render(){
        return (
            <div className={this.props.className} style={{lineHeight: "34px", padding: 0}}>
                {this.props.buttons.map((item, i) => <BTFormButton key={"bt" + i} {...item} style={{marginRight: "10px"}}/>)}
                <div className="clearfix"/>
            </div>
        );
    }
}
BTForm.defaultProps = {
    columns: [],
    buttons: [],
    className: "", //"col-xs-12 form-group"
};
