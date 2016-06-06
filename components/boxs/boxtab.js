import React, {Component} from 'react';

class BoxTab extends Component {
    render() {
        const {tabs, title} = this.props;
        return (
            <div className="box border pink">
                <div className="box-title">
                    <h4>
                        <i className="fa fa-columns"></i>
                        <span className="hidden-inline-mobile">{title}</span>
                    </h4>

                </div>
                <div className="box-body">
                    <div className="tabbable header-tabs">
                        <ul className="nav nav-tabs">
                            {tabs.map((item, index) => {
                                return (
                                    <li key={index} className={index===0 ? 'active' : ''}>
                                        <a href={'#' + item.name} data-toggle="tab">
                                            <i className="fa fa-circle-o"></i>
                                            <span className="hidden-inline-mobile">{item.name}</span>
                                        </a>
                                    </li>)
                            }) }

                        </ul>
                        <div className="tab-content">
                            {tabs.map((item, index) => {
                                return (
                                    <div key={index} className={index===0 ? 'tab-pane fade in active' : 'tab-pane fade'} id={item.name}>
                                        {item.content}
                                    </div>)
                            }) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
BoxTab.propTypes = {
    title: React.PropTypes.string,
    tabs:React.PropTypes.any.isRequired
};

export default BoxTab;