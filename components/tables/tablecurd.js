
import 'rc-dialog/assets/bootstrap.css';
import React, {Component} from 'react';
import Table from 'rc-table';
import Pager from '../paginations/pager'
import Dialog from 'rc-dialog';
const columns = [
    { title: 'id', dataIndex: 'id', key: 'id', width: 10 },
    { title: 'code', dataIndex: 'code', key: 'code' },
    { title: 'name', dataIndex: 'name', key: 'name' },
    { title: 'value', dataIndex: 'value', key: 'value' },
    { title: 'description', dataIndex: 'description', key: 'description' },
    { title: 'parentId', dataIndex: 'parentId', key: 'parentId' },
    { title: 'creator', dataIndex: 'creator', key: 'creator' },
    { title: 'createTime', dataIndex: 'createTime', key: 'createTime' },
    { title: 'modifyMan', dataIndex: 'modifyMan', key: 'modifyMan' },
    { title: 'modifyTime', dataIndex: 'modifyTime', key: 'modifyTime' },
    { title: 'remark', dataIndex: 'remark', key: 'remark' },
    {
        title: '操作', dataIndex: '', key: '', width: 100, render: function (value, row, index) {
            console.log(value, row, index)
            return <div><a href="#">编辑</a>&nbsp; &nbsp; <a href="#">删除</a></div>;
        },
    },
];
class TableCurd extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            total: 0,
            pageSize: 10,
            pageNo: 1,
            data: []
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }
    render() {
        return (
            <div>
                <Dialog  visible={this.state.visible}
                    animation="slide-fade"
                    maskAnimation="fade"
                    onClose={this.onClose}
                    style={{ width: 600 }}
                    title={<div>第二个弹框</div>}>
                    sssssss
                </Dialog>
                <div className="well well-sm">
                    <div className="form-horizontal">
                        <div className="form-group ">
                            <div className="col-md-3 col-sm-6">
                                <label className="control-label col-md-5 col-xs-12" >aa
                                </label>
                                <div className="col-md-7 col-xs-12">
                                    <input type="text" className="form-control"  value="444" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <label className="control-label col-md-5 col-xs-12" >aa
                                </label>
                                <div className="col-md-7 col-xs-12">
                                    <input type="text" className="form-control"  value="444" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <label className="control-label col-md-5 col-xs-12" >aa
                                </label>
                                <div className="col-md-7 col-xs-12">
                                    <input type="text" className="form-control"  value="444" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <label className="control-label col-md-5 col-xs-12" >aa
                                </label>
                                <div className="col-md-7 col-xs-12">
                                    <input type="text" className="form-control"  value="444" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <div className="col-lg-3 col-md-4 col-lg-offset-9 col-md-offset-8 btn-toolbar text-right">
                                <button className="btn btn-primary" onClick={this.onAdd}><i className="fa fa-plus"></i> 添加</button>
                                <button className="btn btn-info "><i className="fa fa-search"></i> 查询</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns}
                    data={this.state.data}
                    tableClassName="table table-striped table-bordered"/>
                <Pager
                    total={this.state.total}
                    pageSize={this.state.pageSize}
                    current={this.state.pageNo}
                    onChange={this.onPageChange}
                    onSelectChange={this.onSelectChange}/>

            </div>
        );
    }
    componentDidMount() {
        this.onGetData(1);
    }
    onSubmit(e) {
        console.log('aaa')
        e.preventDefault();
    }
    onClose() {

    }
    onAdd() {
        this.setState({ visible: true })
    }
    onPageChange(pageNum) {
        this.onGetData(pageNum);
    }
    onSelectChange(e) {
        this.setState({ pageSize: e.target.value - 0 });
    }
    onInputChange(e) {

    }
    onGetData(pageNum) {
        const {url} = this.props;
        this.setState({ pageNum: pageNum });
        $.ajax({
            url: url,
            data: { isPaging: true, pageNum: pageNum },
            dataType: 'json',
            success: (data) => {
                const list = data.list;
                for (let i = 0; i < list.length; i++) {
                    list[i].key = list[i].id;
                }
                this.setState({ total: data.totalCount, data: list })
                console.log(data);
            }
        })
    }
}

export default TableCurd;