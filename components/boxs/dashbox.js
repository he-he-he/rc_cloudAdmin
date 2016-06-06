import React, {Component} from 'react';

class DashBox extends Component {
    render() {
        const{number,title,info}=this.props;
        return (
            <div className="dashbox panel panel-default">
                <div className="panel-body">
                    <div className="panel-left red">
                        <i className="fa fa-instagram fa-3x"></i>
                    </div>
                    <div className="panel-right">
                        <div className="number">{number}</div>
                        <div className="title">{title}</div>
                        <span className="label label-success">
                            {info}
                            <i className="fa fa-arrow-up"></i>
                        </span>
                    </div>
                </div>
            </div>

        );
    }
}
DashBox.propTypes = {
    title: React.PropTypes.string,
    number:React.PropTypes.number,
    info: React.PropTypes.string
};
export default DashBox;