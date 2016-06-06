import React, {Component} from 'react';
import {Layout} from '../../components'
const {Header, Sidebar, Container, Breadcrumb} = Layout;

const menus = [
    { id: 1, link: '/index', name: '首页', childs: [] },
    {
        id: 2, link: '', name: '其他', childs: [
            { id: 3, link: '/map', name: '地图' },
            { id: 4, link: '/map2', name: '地图2' },
            { id: 5, link: '/curd', name: '增删改' },
            { id: 6, link: '/charts', name: 'charts' }

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