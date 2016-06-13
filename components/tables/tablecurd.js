
import 'rc-dialog/assets/bootstrap.css';
import React, {Component} from 'react';
import Table from 'rc-table';
import Pager from '../paginations/pager'
import Dialog from 'rc-dialog';

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
        const {columns}=this.props;
    //         {title: '操作', dataIndex: '', key: '', width: 100, render: function (value, row, index) {
    //         return <div><a href="#">编辑</a>&nbsp; &nbsp; <a href="#">删除</a></div>;
    //     }
    // }
        return (
            <div>
                <Dialog  visible={this.state.visible}
                    animation="slide-fade"
                    maskAnimation="fade"
                    onClose={this.onClose.bind(this)}
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
                <Table columns={this.props.columns}
                    data={this.state.data}
                    rowKey={(record)=>record.id}
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
        this.setState({visible: false});
    }
    onAdd() {
        this.setState({ visible: true });
    }
    onPageChange(pageNo) {
        this.onGetData(pageNo);
    }
    onSelectChange(e) {
        this.setState({ pageSize: e.target.value - 0 },()=>{
            this.onGetData(1);
        });
    }
    onInputChange(e) {

    }
    onGetData(pageNo) {
        const {url} = this.props;
        const {pageSize}=this.state;
        $.ajax({
            url: url,
            data: { isPaging: true, pageNo: pageNo,pageSize:pageSize },
            dataType: 'json',
            success: (data) => {
                const list = data.list;
                this.setState({ total: data.totalCount, data: list,pageNo: data.pageNo })
            }
        })
    }
}

export default TableCurd;