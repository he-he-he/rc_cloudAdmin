import 'rc-dialog/assets/bootstrap.css';
import React, {Component} from 'react';
import {Tables, Boxs,Layout, Models, Forms} from '../../../components';
import Dialog from 'rc-dialog';
const {CForm, VForm} = Forms;
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
                vinCode: "",
                simNum: "",
                carPlate: ""
            },
            search: {
                columns: [
                    {type: "text", labelText: "VIN号码", fieldName: "vinCode", defaultValue: ""},
                    {type: "text", labelText: "SIM卡号", fieldName: "simNum", defaultValue: ""},
                    {type: "text", labelText: "车牌号", fieldName: "carPlate", defaultValue: ""}
                ],
                buttons: [
                    {type: "button", className:"danger  ", text: "添加", fnClick: () => { this.onItemAdd() }},
                    {type: "submit", text: "搜索"}
                ]
            },
            listColumns: [
                { title: '标识', dataIndex: 'id', key: 'id' },
                { title: '车主ID', dataIndex: 'customerId', key: 'customerId' },
                { title: 'VIN号码', dataIndex: 'vinCode', key: 'vinCode' },
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
    }
    render() {
        return (
            <Row>
                <Col>
                    <Box title="车辆信息管理">
                        <CForm {...this.state.search} fnSubmit={this.onSearch.bind(this)}/>
                        <TableList 
                            data={this.state.dataList} 
                            columns={this.state.listColumns} 
                            edite={true}
                            fnItemSelect={this.onItemUpdate.bind(this)} 
                            fnItemDelete={this.onItemDelete.bind(this)}
                            fnPageChange={this.onPageChange.bind(this)}
                            fnPageSelectChange={this.onPageSelectChange.bind(this)}
                        />
                        <Dialog  visible={this.state.dialogVisible}
                            animation="slide-fade"
                            maskAnimation="fade"
                            onClose={this.dialogClose.bind(this)}
                            title={<div>{(this.state.dialogType == "new" ? "添加" : "修改") + "车辆信息"}</div>}>
                            <VForm columns={this.state.formColumns} buttons={this.state.formButtons} fnSubmit={this.onFormSubmit.bind(this)}/>
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
        param = Object.assign({}, this.state.listParam, param)
        $.ajax({
            url: "/json/carinfo.json", //"/surface/carInfo",
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

    makeFormColumns(obj = {}){
        var type = obj.id && obj.id > 0 ? "update" : "new";
        obj = obj || {};
        var columns = Object.assign([], this.state.formColumns);
        columns = columns.map((va, i) => {
            va.value = obj[va.field] !== null && obj[va.field] !== undefined ? obj[va.field] : "";
            return va;
        });
        console.log(columns, obj);
        this.setState({formColumns: columns, dialogType: type});
    }

    onSearch(param){
        param.pageNo = 1;
        console.log(param);
    }


    onItemAdd(){
        this.makeFormColumns();
        this.dialogOpen();
    }
    onItemUpdate(obj){
        console.log(obj)
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
        console.log(values);
    }


    onItemDelete(obj){
        console.log(obj);
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