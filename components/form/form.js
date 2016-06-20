import React, {Component} from 'react';
import Formsy from 'formsy-react';
import MyInput from'./form_item'

export default class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            values: {}
        }
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        for(var i = 0, z = props.columns.length; i < z; i++)
            this.state.values[props.columns[i].dataField] = props.columns[i];
        
        this.onChange = this.onChange.bind(this);
    }

    enableButton() {
        this.setState({ canSubmit: true })
    }
    disableButton() {
        this.setState({ canSubmit: false })
    }
    submit(model) {
        console.log(model)
    }
    
    render() {
        return (
            <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-horizontal" role="form">
                {this.props.columns.map((item, i) =>                 
                    <MyInput 
                        key={i} 
                        defaultValue={item.value} 
                        name={item.dataField} 
                        title={item.name} 
                        validations={item.valid} 
                        validationError={item.validError} 
                        required={item.require} 
                        type={item.type}
                        fnChange={this.onChange}
                    />
                )}
                <div className="form-group">
                    <label className="col-sm-2 control-label"></label>
                    <div className="col-md-9">
                        <button type="submit" className="btn btn-success" disabled={!this.state.canSubmit}>保存</button>
                    </div>
                </div>
                <div className="clearfix"></div>
            </Formsy.Form>
        )
    }

    canSubmit(){
        var bo = true;
        for(var i in this.state.values)
            bo == bo && this.state.values[i].res;
        return bo;
    }

    onChange(data){
        this.props.fnChange(data);
        /*
        var {dataField, value, res} = data;
        var va = {};
        va[dataField] = Object.assign({}, this.state.values[dataField], {value: value, res: res});
        va = Object.assign({}, this.state.values, va);
        this.setState({values: va});
        */
    }
}
MyForm.propTypes = {
    columns: React.PropTypes.array.isRequired
};
MyForm.defaultProps = {
    fnChange: function(){}
};