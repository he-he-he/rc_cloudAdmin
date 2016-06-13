import React from 'react';
import Formsy from 'formsy-react';

const MyInput = React.createClass({
    mixins: [Formsy.Mixin],
    changeValue(event){
        this.setValue(event.currentTarget.value);
    },
    render(){
        const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
        return (
            <div className={className}>
                <label htmlFor={this.props.name} className="col-sm-3 control-label">{this.props.title}</label>
                <div className="col-sm-8">
                    <div>{this.makeInput()}</div>
                    <div className='text-danger text-left'>{this.getErrorMessage()}</div>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    },
    componentWillReceiveProps(nextProps){
        console.log(this.props, nextProps);
    },
    componentWillUnmount(){
        console.log(2);
    },
    makeInput(){
        switch(this.props.type){
            case "text": 
                return <input
                    ref="ctx"
                    className="form-control"
                    type={this.props.type || 'text'}
                    name={this.props.name}
                    onChange={this.changeValue}
                    checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
                    value={this.getValue()}
                />;
            case "textarea": 
                return <textarea
                    ref="ctx"
                    className="form-control"
                    rows="3" cols="5"
                    name={this.props.name}
                    onChange={this.changeValue}
                    style={{resize: "none"}}
                    value={this.getValue()}
                ></textarea>;
        }
    }
});
export default MyInput;