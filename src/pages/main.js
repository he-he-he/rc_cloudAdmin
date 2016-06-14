import React, {Component} from 'react';
import {Layout} from '../../components'
const {Header, Sidebar, Container, Breadcrumb} = Layout;

const menus = [
    { 
        id: 1, link: '', name: '概览', childs: [
            { id: 3, link: '/index', name: '首页' },
            { id: 4, link: '', name: '车辆分步' }
        ] 
    },
    { 
        id: 1, link: '', name: '车辆定位管理', childs: [
            { id: 3, link: '', name: '车辆分步' },
            { id: 4, link: '', name: '车辆定位' },
            { id: 4, link: '', name: '历史轨迹' },
            { id: 4, link: '', name: '车辆上下线历史纪录' },
            { id: 4, link: '', name: '定位参数管理' }
        ] 
    },
    { 
        id: 1, link: '', name: '车辆CAN管理', childs: [
            { id: 3, link: '', name: '实时CAN' },
            { id: 4, link: '', name: '历史CAN' },
            { id: 4, link: '', name: 'CAN数据管理' }
        ] 
    },
    { 
        id: 1, link: '', name: '车辆报警管理', childs: [
            { id: 3, link: '', name: '实时报警提醒' },
            { id: 4, link: '', name: '实时报警' },
            { id: 4, link: '', name: '历史报警' },
            { id: 4, link: '', name: '报警参数管理' }
        ] 
    },
    { 
        id: 1, link: '', name: '维保升级管理', childs: [
            { 
                id: 3, link: '', name: '车辆维保管理', childs: [
                    { id: 4, link: '', name: '车辆维保记录' },
                    { id: 4, link: '', name: '车辆保养提醒' },
                    { id: 4, link: '', name: '车辆设备维修记录' },
                    { id: 4, link: '', name: '保养参数管理' }
                ] 
            },
            { 
                id: 4, link: '', name: '车辆升级管理', childs: [
                    { id: 4, link: '', name: '升级任务' },
                    { id: 4, link: '', name: '车辆升级记录' },
                    { id: 4, link: '', name: '升级参数管理' }
                ] 
            },
            { id: 4, link: '', name: '车辆检测历史纪录' }
        ] 
    },
    { 
        id: 1, link: '', name: '统计分析', childs: [
            { 
                id: 3, link: '', name: '车辆统计', childs: [
                    { id: 4, link: '', name: '注册车辆管理' }
                ] 
            },
            { id: 4, link: '', name: '历程统计' },
            { id: 4, link: '', name: '报警统计' },
            { id: 4, link: '', name: '电池包统计' },
            { id: 4, link: '', name: '维保统计' },
            { id: 4, link: '', name: '升级统计' }
        ] 
    },
    { 
        id: 1, link: '', name: '基础数据管理', childs: [
            { id: 3, link: '', name: '经销商管理' },
            { id: 4, link: '', name: '供应商管理' },
            { id: 4, link: '', name: '车辆管理' },
            { id: 4, link: '', name: '车辆设备管理' },
            { id: 4, link: '', name: '车主管理' },
            { id: 4, link: '', name: '服务站管理' }
        ] 
    },
    { 
        id: 1, link: '', name: '系统管理', childs: [
            { id: 3, link: '', name: '登陆管理' },
            { id: 4, link: '', name: '角色管理' },
            { id: 4, link: '', name: '权限管理' },
            { id: 4, link: '', name: '机构管理' },
            { id: 4, link: '', name: '应用系统管理' },
            { id: 4, link: '', name: '用户权限管理' },
            { id: 4, link: '', name: '日志管理' },
            { 
                id: 4, link: '', name: '系统参数管理', childs: [
                    { id: 4, link: '', name: '定位参数管理' },
                    { id: 4, link: '', name: 'CAN参数管理' },
                    { id: 4, link: '', name: '报警参数管理' },
                    { id: 4, link: '', name: '保养参数管理' },
                    { id: 4, link: '', name: '升级参数管理' }
                ] 
            },
            { id: 4, link: '', name: '字典管理' },
            { id: 4, link: '', name: '公告通知管理' }
        ] 
    },
    {
        id: 2, link: '', name: '示例', childs: [
            { id: 3, link: '/exmp/map', name: '搜索地图' },
            { id: 4, link: '/exmp/map2', name: '概览地图' },
            { id: 5, link: '/exmp/curd', name: '字典表' },
            { id: 6, link: '/exmp/charts', name: '图表' }
        ]
    }
]
export default class Index extends Component {
    constructor() {
        super();
        this.t = -1;
    }

    render() {
        return (
            <div>
                <Header/>
                <section id="page">
                    <Sidebar menus={menus}/>
                    <Container>
                        <Breadcrumb/>
                        {this.props.children}
                    </Container>
                </section>
            </div>
        )
    }
    componentDidMount() {
        handleGoToTop();
        jQuery(window).resize(() => {
            clearTimeout(this.t);
            this.t = setTimeout(function () {
                checkLayout();
                handleSidebarAndContentHeight();
                responsiveSidebar();
                handleFixedSidebar();
                handleNavbarFixedTop();
                runResponsiveFunctions();
            }, 50);
        });
    }
    componentWillUnmount() {
        clearTimeout(this.t);
    }
}