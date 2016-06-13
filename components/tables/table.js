import React, {Component} from 'react';
import Table from 'rc-table';
import Pager from '../paginations/pager';

export default class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns
        }
        if(this.props.edite) 
            this.state.columns.push(
                {
                    title: '操作', dataIndex: '', key: '', width: 100, render: (value, row, index) => {
                        return (
                            <div>
                                <a href="javascript: void(0);" onClick={() => { this.onItemSelect(value); }}>编辑</a>
                                &nbsp; &nbsp;
                                <a href="javascript: void(0);" onClick={() => { this.onItemDelete(value); }}>删除</a>
                            </div>
                        );
                    }
                }
            );
    }
    render(){
        return (
            <div>
                <Table columns={this.props.columns}
                    data={this.props.data.list}
                    rowKey={(record)=>record.id}
                    tableClassName="table table-striped table-bordered"
                />
                <Pager
                    total={this.props.data.totalCount}
                    pageSize={this.props.data.pageSize}
                    current={this.props.data.pageNo}
                    onChange={this.onPageChange.bind(this)}
                    onSelectChange={this.onPageSelectChange.bind(this)}
                />
            </div>
        );
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
    edite: false,
    fnPageChange: () => {},
    fnPageSelectChange: () => {},
    fnItemSelect: () => {},
    fnItemDelete: () => {}
};
TableList.propTypes = {
    data: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired
};