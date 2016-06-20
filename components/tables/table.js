import React, {Component} from 'react';
//import Table from 'rc-table';
import { Table, Button } from 'antd';
import Pager from '../paginations/pager';
import {BTForm} from "../form";

export default class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            buttons: []
        }
        this.recodes = [];
        if(props.fnCheckSelect){
            this.state.rowSelection = {
                onChange: (keys, recodes) => {
                    this.recodes = recodes;
                }
            }
        }
        if(props.fnAddBTClick) this.state.buttons.push({
            className: "info",
            icon: "plus",
            text: "添加",
            fnClick: () => { props.fnAddBTClick(); }
        });
        if(props.fnDeleteBTClick) this.state.buttons.push({
            className: "danger",
            icon: "times",
            text: "删除",
            fnClick: () => { props.fnDeleteBTClick(this.recodes); }
        });
        if(props.index){
            this.state.columns.unshift({
                title: "行号", width: 100,
                render: (value, row, index) => { return this.makeIndex(index); }
            });
        }
        if(props.edite) {
            this.state.columns.push({
                title: '操作', dataIndex: '', key: '', width: 100, render: (text, recode) => {
                    return (
                        <div>
                            <a href="javascript: void(0);" onClick={() => { this.onItemSelect(recode); }}>编辑</a>
                            &nbsp; &nbsp;
                            <a href="javascript: void(0);" onClick={() => { this.onItemDelete(recode); }}>删除</a>
                        </div>
                    );
                }
            });
        }

        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSelectChange = this.onPageSelectChange.bind(this);
    }
    render(){
        return (
            <div>
                <BTForm buttons={this.state.buttons}/>
                <Table columns={this.props.columns}
                    dataSource={this.props.data.list}
                    rowSelection={this.state.rowSelection}
                    pagination={false}
                    rowKey={(record)=>record.id}
                    className="table table-striped table-bordered mtb15 br4"
                />
                <Pager
                    total={this.props.data.totalCount}
                    pageSize={this.props.data.pageSize}
                    current={this.props.data.pageNo}
                    onChange={this.onPageChange}
                    onSelectChange={this.onPageSelectChange}
                />
            </div>
        );
    }
    
    makeIndex(index){
        return index + 1 + (this.props.data.pageNo - 1) * this.props.data.pageSize;
    }

    onPageChange(pageNo){
        this.props.fnPageChange(pageNo);
    }
    onPageSelectChange(e) {
        this.props.fnPageSelectChange(e.target.value);
    }
    onItemSelect(value){
        this.props.fnItemSelect(value);
    }
    onItemDelete(value){
        this.props.fnItemDelete(value.id);
    }
}
TableList.defaultProps = {
    index: true,
    edite: false,
    fnPageChange: () => {},
    fnPageSelectChange: () => {},
    fnItemSelect: () => {},
    fnItemDelete: () => {},
    fnCheckSelect: false,

    fnAddBTClick: false,
    fnDeleteBTClick: false
};
TableList.propTypes = {
    data: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired
};