import React, {Component} from 'react';

export class Row extends Component {
    render() {
        return (
            <div className="row">
                {this.props.children}
            </div>
        );
    }
}

export class Col extends Component {
    render() {
        const {lg, md, xs, sm} = this.props;
        return (
            <div className={'col-lg-'+lg+' col-md-'+md+' col-xs-'+xs+' col-sm-'+sm}>
                {this.props.children}
            </div>
        );
    }
}
Col.defaultProps = {
    lg: '12',
    md: '12',
    xs: '12',
    sm: '12'
}
Col.propTypes = {
    lg: React.PropTypes.string,
    md: React.PropTypes.string,
    xs: React.PropTypes.string,
    sm: React.PropTypes.string,
};
