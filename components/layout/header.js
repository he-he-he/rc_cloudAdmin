import React, {Component} from 'react';
import {HeadMessager} from "../icon_messager";

class Header extends Component {
    constructor(){
        super();
        this.state = {
            notification: {
                type: "notification",
                title: "notifications",
                autoUpdate: true,
                list: [
                    {message: "这是第1个提示", type: "success"},
                    {message: "这是第2个提示", type: "warning"},
                    {message: "这是第3个提示", type: "danger"},
                    {message: "这是第4个提示", type: "info"}
                ],
                click: (type, index, param) => this.spliceListItem(type, index, param)
            },
            message: {
                type: "message",
                title: "messages",
                list: [
                    {message: "这是第1个提示", title: "success"},
                    {message: "这是第2个提示", title: "warning"},
                    {message: "这是第3个提示", title: "danger"},
                    {message: "这是第4个提示", title: "info"}
                ],
                click: (type, index, param) => this.spliceListItem(type, index, param)
            },
            tasks: {
                type: "tasks",
                title: "tasks in program",
                list: [
                    {title: "这是第1个提示", message: "40", list: [{type: "success", value: 10}, {type: "warning", value: 30}]},
                    {title: "这是第2个提示", message: "70", list: [{type: "danger", value: 70}]},
                    {title: "这是第3个提示", message: "15", list: [{type: "info", value: 15}]}
                ],
                click: (type, index, param) => this.spliceListItem(type, index, param)
            }
        };
    }
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
                        <HeadMessager {...this.state.notification}/>
                        <HeadMessager {...this.state.message}/>
                        <HeadMessager {...this.state.tasks}/>
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
        var i = this.state.message.list.length;
        setTimeout(() => {
            var msg = this.state.notification;
            msg.list.push({message: "这是第" + (++i) + "个提示", type: "success"});
            this.setState({notification: msg});
        }, 2000);
    }

    spliceListItem(type, i, param){
        var msg = this.state[type], obj = {};
        if(i != "all"){
            msg.list.splice(i, 1);
            obj[type] = msg;
            this.setState(obj);
        }
        else alert(i);
    }
}

export default Header;