import 'rc-dialog/assets/bootstrap.css';
import React, {Component} from 'react';
import {Tables, Boxs,Layout, Models, Forms} from '../../components';
import Dialog from 'rc-dialog';
const {Form, CForm, CFormItem} = Forms;
const {Row,Col}=Layout;
const {TableCurd, TableList} = Tables;
const {Box} = Boxs;

class Curd extends Component {
    constructor(state){
        super(state);
        this.state = {           
            title: "字典",
            listUrl: "dictionary", //"/json/dictionary.json",
            listParam: {     
                code: "",
                name: "",
                parentId: "",
                select: "1",
                radio: "1",
                checkbox: "1,2",
                isPaging: true,
                pageNo: 1,
                pageSize: 10
            },
            search: {
                columns: [
                    {type: "text", labelText: "编码", fieldName: "code", defaultValue: ""},
                    {type: "text", labelText: "名称", fieldName: "name", defaultValue: ""},
                    {type: "text", labelText: "父级", fieldName: "parentId", defaultValue: ""},
                    {type: "select", labelText: "select", fieldName: "select", defaultValue: 2, inputList: [{value: 1, text: "1"}, {value: 2, text: "2"}]},
                    {type: "radio", labelText: "radio", fieldName: "radio", defaultValue: 2, inputList: [{value: 1, text: "1"}, {value: 2, text: "2"}]},
                    {type: "checkbox", labelText: "checkbox", fieldName: "checkbox", defaultValue: "1,2", inputList: [{value: 1, text: "1"}, {value: 2, text: "2"}]}
                ],
                buttons: [
                    {type: "button", className:"danger  ", text: "添加", fnClick: this.onItemAdd.bind(this)},
                    {type: "submit", text: "搜索", fnClick: this.onItemAdd.bind(this)}
                ]
            },
            listColumns: [
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
                { title: 'remark', dataIndex: 'remark', key: 'remark' }
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
                { name: "标识", defaultValue: "", dataField: 'id', valid: "isNumeric", validError: "只能填写数字", type: "text", require: false },
                { name: "编码", defaultValue: "", dataField: 'code', valid: "minLength:1,maxLength:50", validError: "长度在 1 - 50 之间", type: "text", require: true },
                { name: "名称", defaultValue: "", dataField: 'name', valid: "maxLength:30", validError: "不能超过30个字符", type: "text", require: true },
                { name: "值", defaultValue: "", dataField: 'value', valid: "isNumeric", validError: "只能填写数字", type: "text", require: true },
                { name: "描述", defaultValue: "", dataField: 'description', valid: "isExisty", validError: "不能为空", type: "textarea", require: true },
                { name: "父级", defaultValue: "", dataField: 'parentId', valid: "isNumeric", validError: "只能填写数字", type: "text", require: false },
                { name: "备注", defaultValue: "", dataField: 'remark', valid: "isEmptyString", validError: "", type: "textarea", require: true }
            ],
            dialogVisible: false,
            dialogType: "new"
        }
    }
    render() {
        return (
            <Row>
                <Col>
                    <Box title="字典">
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
                            style={{width: 600}}
                            title={<div>{(this.state.dialogType == "new" ? "添加新" : "修改") + this.state.title}</div>}>
                            <Form columns={this.state.formColumns}/>
                        </Dialog>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.updateData(this.state.listParam);
    }

    updateData(param){
        param = Object.assign({}, this.state.listParam, param)
        $.ajax({
            url: this.state.listUrl,
            data: param,
            dataType: 'json',
            success: (data) => {
                this.setState({dataList: data, listParam: param});
            }
        });
    }
    makeFormColumns(obj){
        var type = obj == undefined ? "new" : "update";
        obj = obj || {};
        var columns = Object.assign([], this.state.formColumns);
        columns = columns.map((va, i) => {
            va.value = obj[va.dataField];
            return va;
        });
        //this.setState({formColumns: columns, dialogType: type});
    }

    onSearch(param){
        param = Object.assign({}, this.state.listParam, param);
        console.log(param);
    }


    onItemAdd(){
        this.makeFormColumns();
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


    onItemDelete(obj){
        console.log(obj, 111111111111);
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

export default Curd;