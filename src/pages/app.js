import React, {Component} from 'react';
import {Layout} from '../../components'
const {Header, Siedbar, Container, Breadcrumb} = Layout;


const menus=[
    {id:1,name:'首页',link:'/index',childs:[]},
     {id:1,name:'二级',link:'',childs:[
         {name:'地图',link:'/map'},
         {name:'增删改',link:'/curd'}
     ]},
]
class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Container>
                    <Siedbar menus={menus}/>
                    <Breadcrumb/>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default App;