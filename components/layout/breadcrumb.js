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
                                <a href="index.html">主页</a>
                            </li>
                            <li>
                                <a href="#">二级目录</a>
                            </li>
                            <li>当前目录</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;