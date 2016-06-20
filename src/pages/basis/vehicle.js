import 'rc-dialog/assets/bootstrap.css';
import React, {Component} from 'react';
import {Tables, Boxs,Layout, Models, Forms} from '../../../components';
import Dialog from 'rc-dialog';

const {CForm, VForm, BTForm} = Forms;
const {Row,Col}=Layout;
const {TableList} = Tables;
const {Box} = Boxs;

export default class Vehicle extends Component {
    constructor(state){
        super(state);
        this.state = {
            listParam: {
                isPaging: true,
                pageNo: 1,
                pageSize: 10,
                orderBy: "id desc",
                vinCode: "",
                simNum: "",
                carPlate: "",
                start: "",
                end: ""
            },
            search: {
                columns: [
                    {type: "select", filed: "type", defaultValue: "vinCode", inputList: [
                        {text: "VIN号码", value: "vinCode"}, 
                        {text: "SIM卡号", value: "simNum"}, 
                        {text: "车牌号", value: "carPlate"}
                    ]},
                    {type: "text", placeHolder: "字段值", filed: "value"},
                    {type: "datetime", filed: "start", placeHolder: "开始时间"},
                    {type: "datetime", filed: "end", placeHolder: "结束时间"}
                ],
                buttons: [
                    {type: "submit", className: "info", icon: "search", text: "搜索"}
                ]
            },
            listColumns: [
                //{ title: '标识', dataIndex: 'id', key: 'id' },
                { title: '车主ID', dataIndex: 'customerId', key: 'customerId' },
                { title: 'VIN号码', dataIndex: 'vinCode', key: 'vinCode' },
                { title: 'SIM卡号', dataIndex: 'simNum', key: 'simNum' },
                { title: '车系', dataIndex: 'vehicle', key: 'vehicle' },
                { title: '车型', dataIndex: 'carType', key: 'carType' },
                { title: '车牌号', dataIndex: 'carPlate', key: 'carPlate' },
                { title: '车辆状态', dataIndex: 'status', key: 'status' }
            ],
            dataList: {
                list: [],
                totalCount: 0,
                pageSize: 10,
                pageNo: 1,
                firstResult: 0,
                totalPage: 0,
                firstPage: false,
                lastPage: false,
                nextPage: 0,
                prePage: 0
            },

            formColumns: [    
                { title: '标识', field: 'id', value: '0', type: "hidden" },
                { title: '车主ID', field: 'customerId', value: '', type: "text" },
                { title: 'VIN号码', field: 'vinCode', value: '', type: "text" },
                { title: 'SIM卡号', field: 'simNum', value: '', type: "text" },
                { title: '车系', field: 'vehicle', value: '', type: "text" },
                { title: '车型', field: 'carType', value: '', type: "text" },
                { title: '车牌号', field: 'carPlate', value: '', type: "text" },
                { title: '车辆状态', field: 'status', value: '1', type: "select", list: [{text: "在线", value: 1}, {text: "离线", value: 0}] }
            ],
            formButtons: [
                {type: "submit", text: "确定", fnClick: () => {}}
            ],
            dialogVisible: false,
            dialogType: "new"
        }

        this.onSearch = this.onSearch.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemDelete = this.onItemDelete.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageSelectChange = this.onPageSelectChange.bind(this);
        this.onItemAdd = this.onItemAdd.bind(this);
        this.onDeleteAll = this.onDeleteAll.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    render() {
        return (
            <Row>
                <Col>
                    <Box title="车辆信息管理">
                        <CForm {...this.state.search} fnSubmit={this.onSearch}/>
                        <TableList 
                            data={this.state.dataList} 
                            columns={this.state.listColumns} 
                            edite={true}
                            fnItemSelect={this.onItemUpdate} 
                            fnItemDelete={this.onItemDelete}
                            fnPageChange={this.onPageChange}
                            fnPageSelectChange={this.onPageSelectChange}
                            fnCheckSelect={true}
                            fnAddBTClick={this.onItemAdd}
                            fnDeleteBTClick={this.onDeleteAll}
                        />
                        <Dialog  visible={this.state.dialogVisible}
                            animation="slide-fade"
                            maskAnimation="fade"
                            onClose={this.dialogClose}
                            title={<div>{(this.state.dialogType == "new" ? "添加" : "修改") + "车辆信息"}</div>}>
                            <VForm columns={this.state.formColumns} buttons={this.state.formButtons} fnSubmit={this.onFormSubmit}/>
                        </Dialog>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.updateData();
    }

    updateData(param = {}){
        param = Object.assign({}, this.state.listParam, param);
        console.log(param);
        $.ajax({
            type: "get",
            url: "/carInfo",
            data: this.makeParam(param),
            dataType: 'json',
            success: (data) => {
                this.setState({dataList: data, listParam: param});
            }
        });
    }
    makeParam(param){
        var para = {};
        for(var i in param) if(param[i] !== "" && param[i] !== null && param[i] !== undefined) para[i] = param[i];
        return para;
    }

    addUpdate(obj){        
        var type = this.state.dialogType;
        $.ajax({
            type: type == "new" ? "post" : "put",
            url: "/carInfo" + (type == "new" ? "" : "/" + obj.id),
            data: obj,
            dataType: "json",
            success: (data) => {
                if(data.res){
                    this.updateData(type == "new" ? {pageNo: 1} : {});
                }
            }
        });
    }

    deleteData(ids){
        $.ajax({
            type: "delete",
            url: "/carInfo/" + ids,
            dataType: 'json',
            success: (data) => {
                if(data.res){
                    this.updateData();
                }
            }
        });
    }

    makeFormColumns(obj = {}){
        var type = obj.id && obj.id > 0 ? "update" : "new";
        obj = obj || {};
        var columns = Object.assign([], this.state.formColumns);
        columns = columns.map((va, i) => {
            va.value = obj[va.field] !== null && obj[va.field] !== undefined ? obj[va.field] : "";
            return va;
        });
        this.setState({formColumns: columns, dialogType: type});
    }

    onSearch(param){
        var params = {};
        params[param.type] = param.value;
        params.start = param.start;
        params.end = param.end;
        params.pageNo = 1;
        console.log(params);
        this.updateData(params);
    }


    onItemAdd(){
        this.makeFormColumns({status: 1});
        this.dialogOpen();
    }
    onItemUpdate(obj){
        this.makeFormColumns(obj);
        this.dialogOpen();
    }

    onItemFormChange(data){
        for(var i = 0, z = this.state.formColumns.length; i < z; i++){
            var o = this.state.formColumns[i];
            if(o.dataField == data.dataField){
                var columns = Object.assign([], this.state.formColumns);
                columns[i].value = data.value;
                this.setState({formColumns: columns});
                break;
            }
        }
    }
    onFormSubmit(values){
        console.log(JSON.stringify(values));
        this.addUpdate(values);
        this.dialogClose();
    }

    onDeleteAll(array){
        var obj = array.map((va) => va.id).join(",");
        console.log(obj);
        if(confirm("确定要删除选中的车辆信息吗？"))
            this.deleteData(obj);
    }
    onItemDelete(obj){
        if(confirm("确定要删除选中的车辆信息吗？"))
            this.deleteData(obj);
    }

    onPageChange(pageNo){
        var param = Object.assign({ }, this.state.listParam, {pageNo: pageNo});
        this.updateData(param);
    }
    onPageSelectChange(pageSize) {
        var param = Object.assign({ }, this.state.listParam, {pageSize: pageSize});
        this.updateData(param);
    }

    dialogClose(){
        this.setState({dialogVisible: false});
    }
    dialogOpen(){
        this.setState({dialogVisible: true});
    }
}