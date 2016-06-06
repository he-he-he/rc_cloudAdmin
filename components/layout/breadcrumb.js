import React, {Component} from 'react';

class Breadcrumb extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-header">

                        <ul className="breadcrumb">
                            <li>
                                <i className="fa fa-home"></i>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="#">Form Elements</a>
                            </li>
                            <li>Forms</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;