import React from 'react';
import ReactDom from 'react-dom';
import Routes from './config/routes';
import 'antd/dist/antd.css';
import "./css/style.less";

ReactDom.render(<Routes/>, document.getElementById('root'));