import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <header className="navbar clearfix" id="header">
                <div className="container">
                    <div className="navbar-brand">
                        <a href="index.html">
                            <img src="static/img/logo/logo.png" alt="Cloud Admin Logo" className="img-responsive" height="30" width="120"/>
                        </a>
                        <div className="visible-xs">
                            <a href="#" className="team-status-toggle switcher btn dropdown-toggle">
                                <i className="fa fa-users"></i>
                            </a>
                        </div>
                        <div id="sidebar-collapse" className="sidebar-collapse btn">
                            <i className="fa fa-bars"
                                data-icon1="fa fa-bars"
                                data-icon2="fa fa-bars" ></i>
                        </div>
                    </div>
                    <ul className="nav navbar-nav pull-left hidden-xs" id="navbar-left">
                        <li className="dropdown">
                            <a href="#" className="team-status-toggle dropdown-toggle tip-bottom" data-toggle="tooltip" title="Toggle Team View">
                                <i className="fa fa-users"></i>
                                <span className="name">Team Status</span>
                                <i className="fa fa-angle-down"></i>
                            </a>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-cog"></i>
                                <span className="name">Skins</span>
                                <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="dropdown-menu skins">
                                <li className="dropdown-title">
                                    <span><i className="fa fa-leaf"></i> Theme Skins</span>
                                </li>
                                <li><a href="#" data-skin="default">Subtle (default ) </a></li>
                                <li><a href="#" data-skin="night">Night</a></li>
                                <li><a href="#" data-skin="earth">Earth</a></li>
                                <li><a href="#" data-skin="utopia">Utopia</a></li>
                                <li><a href="#" data-skin="nature">Nature</a></li>
                                <li><a href="#" data-skin="graphite">Graphite</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav pull-right">
                        <li className="dropdown" id="header-notification">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-bell"></i>
                                <span className="badge">7</span>
                            </a>
                            <ul className="dropdown-menu notification">
                                <li className="dropdown-title">
                                    <span><i className="fa fa-bell"></i> 7 Notifications</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="label label-success"><i className="fa fa-user"></i></span>
                                        <span className="body">
                                            <span className="message">5 users online.</span>
                                            <span className="time">
                                                <i className="fa fa-clock-o"></i>
                                                <span>Just now</span>
                                            </span>
                                        </span>
                                    </a>
                                </li>                      
                                <li className="footer">
                                    <a href="#">See all notifications <i className="fa fa-arrow-circle-right"></i></a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown" id="header-message">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-envelope"></i>
                                <span className="badge">3</span>
                            </a>
                            <ul className="dropdown-menu inbox">
                                <li className="dropdown-title">
                                    <span><i className="fa fa-envelope-o"></i> 3 Messages</span>
                                    <span className="compose pull-right tip-right" title="Compose message"><i className="fa fa-pencil-square-o"></i></span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="static/img/avatars/avatar2.jpg" alt="" />
                                        <span className="body">
                                            <span className="from">Jane Doe</span>
                                            <span className="message">
                                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse mole ...
                                            </span>
                                            <span className="time">
                                                <i className="fa fa-clock-o"></i>
                                                <span>Just Now</span>
                                            </span>
                                        </span>

                                    </a>
                                </li>                            
                                <li className="footer">
                                    <a href="#">See all messages <i className="fa fa-arrow-circle-right"></i></a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown" id="header-tasks">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-tasks"></i>
                                <span className="badge">3</span>
                            </a>
                            <ul className="dropdown-menu tasks">
                                <li className="dropdown-title">
                                    <span><i className="fa fa-check"></i> 6 tasks in progress</span>
                                </li>
                                <li className="footer">
                                    <a href="#">See all tasks <i className="fa fa-arrow-circle-right"></i></a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown user" id="header-user">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img alt="" src="static/img/avatars/avatar3.jpg" />
                                <span className="username">John Doe</span>
                                <i className="fa fa-angle-down"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="#"><i className="fa fa-user"></i> My Profile</a></li>
                                <li><a href="#"><i className="fa fa-cog"></i> Account Settings</a></li>
                                <li><a href="#"><i className="fa fa-eye"></i> Privacy Settings</a></li>
                                <li><a href="login.html"><i className="fa fa-power-off"></i> Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="container team-status" id="team-status">
                    <div id="scrollbar">
                        <div className="handle">
                        </div>
                    </div>
                    <div id="teamslider">
                        <ul className="team-list">
                            <li className="current">
                                <a href="javascript:void(0);">
                                    <span className="image">
                                        <img src="static/img/avatars/avatar3.jpg" alt="" />
                                    </span>
                                    <span className="title">
                                        You
                                    </span>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-success" >
                                            <span className="sr-only">35% Complete (success) </span>
                                        </div>
                                        <div className="progress-bar progress-bar-warning" >
                                            <span className="sr-only">20% Complete (warning) </span>
                                        </div>
                                        <div className="progress-bar progress-bar-danger" >
                                            <span className="sr-only">10% Complete (danger) </span>
                                        </div>
                                    </div>
                                    <span className="status">
                                        <div className="field">
                                            <span className="badge badge-green">6</span> completed
                                            <span className="pull-right fa fa-check"></span>
                                        </div>
                                        <div className="field">
                                            <span className="badge badge-orange">3</span> in-progress
                                            <span className="pull-right fa fa-adjust"></span>
                                        </div>
                                        <div className="field">
                                            <span className="badge badge-red">1</span> pending
                                            <span className="pull-right fa fa-list-ul"></span>
                                        </div>
                                    </span>
                                </a>
                            </li>           
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
    
    componentDidMount() {
        handleTeamView();
        handleThemeSkins();
    }
    
}

export default Header;