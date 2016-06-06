import React, {Component} from 'react';
import { Link } from 'react-router'
class Sidebar extends Component {
    constructor() {
        super()
    }
    render() {
        const {menus} = this.props;
        return (
            <div id="sidebar" className="sidebar">
                <div className="sidebar-menu nav-collapse">
                    <div className="divide-20"></div>
                    <div id="search-bar">
                        <input className="search" type="text" placeholder="Search"/>
                        <i className="fa fa-search search-icon"></i>
                    </div>
                    <ul>
                        {menus.map((item, index) => {
                            if (item.childs.length === 0) {
                                return (
                                    <li key={index}>
                                        <Link to={item.link}>
                                            <i className="fa fa-tachometer fa-fw"></i>
                                            <span className="menu-text">{item.name}</span>
                                            <span className="selected"></span>
                                        </Link>
                                    </li>)
                            } else {
                                return (
                                    <li key={index} className="has-sub">
                                        <a href="javascript:;">
                                            <i className="fa fa-bookmark-o fa-fw"></i>
                                            <span className="menu-text">{item.name}</span>
                                            <span className="arrow"></span>
                                        </a>
                                        <ul className="sub">
                                            {item.childs.map((child, childIndex) => {
                                                return (<li key={childIndex}><Link to={child.link}>
                                                    <span className="sub-menu-text">{child.name}</span>
                                                </Link>
                                                </li>)
                                            }) }
                                        </ul>
                                    </li>)
                            }
                        }) }
                    </ul>
                </div>
            </div>
        );
    }
    componentDidMount() {
        handleSidebar();
        handleSidebarCollapse();
        handleSidebarAndContentHeight();
    }

}
Sidebar.propTypes = {
    menus:React.PropTypes.array
}
export default Sidebar;


// var a = [
//     { id: 1, parentid: 0, name: '1', link: '/index' },
//     { id: 2, parentid: 0, name: '2', link: '' },
//     { id: 3, parentid: 0, name: '3' },
//     { id: 4, parentid: 1, name: '4' },
//     { id: 5, parentid: 1, name: '5' },
//     { id: 6, parentid: 1, name: '6' },
//     { id: 7, parentid: 2, name: '7' }
// ];
// var b=[];
// for(var i=0;i<a.length;i++){
//  if(a[i].parentid===0){
//    b[i]={id:a[i].id,name:a[i].name,childs:[]};
//  } else{
//    b[(a[i].parentid)-1].childs.push({id:a[i].id,name:a[i].name});
//  }
// }