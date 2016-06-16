import React, {Component} from 'react';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            account: "",
            password: "",
            accountRes: "",
            passwordRes: "",
            remember: false
        };
    }
    render(){
        return (
            <div className="login">
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <div id="logo">
                                    <a href="index.html"><img src="static/img/logo/logo-alt.png" height="40" alt="logo name" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section id="login" className="visible">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="login-box-plain">
                                    <h2 className="bigintro">登 录</h2>
                                    <div className="divide-40"></div>
                                    <form role="form" onSubmit={(event) => {this.onSubmit(event); event.preventDefault();}}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">用户名</label>
                                        <i className="fa fa-envelope"></i>
                                        <input type="text" className="form-control" id="exampleInputEmail1" onChange={(event) => {this.setState({account: event.currentTarget.value});}} defaultValue={this.state.account}/><br/>
                                        <span className="text-danger">{this.state.accountRes}</span>
                                    </div>
                                    <div className="form-group"> 
                                        <label for="exampleInputPassword1">登录密码</label>
                                        <i className="fa fa-lock"></i>
                                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(event) => {this.setState({password: event.currentTarget.value});}} defaultValue={this.state.password}/><br/>
                                        <span className="text-danger">{this.state.passwordRes}</span>
                                    </div>
                                    <div className="form-actions">
                                        <label className="checkbox"><input type="checkbox" className="uniform" onChange={(event) => {this.setState({remember: event.currentTarget.checked});}} defaultChecked={this.state.remember}/> 记住登录</label>
                                        <button type="submit" className="btn btn-danger">登录</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    componentDidMount(){
        $(".uniform").uniform();
    }
    
    onSubmit(){
        console.log(this.state);
        var bo = true, value = {};
        if(this.state.account.length < 1) { value.accountRes = "请填写登录名"; bo = false; }
        else value.accountRes = "";
        if(this.state.password.length < 1) { value.passwordRes = "请填写登陆密码"; bo = false; }
        else value.passwordRes = "";
        if(bo) {
            setTimeout(() => {
                if(this.state.account == "admin" && this.state.password == "admin") window.location.href = "/";
                else { this.setState({passwordRes: "登陆失败 用户名或密码错误"}); }
            }, 500);
        }
        this.setState(value);
    }
}