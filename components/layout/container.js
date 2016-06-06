import React, {Component} from 'react';

class Container extends Component {
    render() {
        return (
            <div id="main-content">
                <div className="container">
                    <div className="row">
                        <div id="content" className="col-lg-12">
                            {this.props.children}
                            <div className="footer-tools">
                                <span className="go-top">
                                    <i className="fa fa-chevron-up"></i>
                                    Top
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
    
}

export default Container;