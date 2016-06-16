import React, {Component} from "react";
import {Tables, Menus, Layout, Boxs, Forms} from "../../../components";
import Dialog from 'rc-dialog';

const {Row, Col} = Layout;
const {Box, BoxTab, DashBox} = Boxs;
const {TableList} = Tables;
const {MenuList} = Menus;
const {VForm} = Forms;

export default class Directary extends Component{
    constructor(){
        super();
        this.state = {
            active: 0,
            menuList: [],

            params: {
                isPaging: true,
                pageNo: 1,
                pageSize: 10,
                name: "",
                parentId: ""
            },
            list: {
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
            listColumns: [
                {title: '分类名称', dataIndex: 'parentName', key: 'parentName' },
                {title: '字典项名称', dataIndex: 'name', key: 'name' },
                {title: '顺序号', dataIndex: 'serialNo', key: 'serialNo' },
                {title: '描述', dataIndex: 'description', key: 'description' }
            ],
            formColumns: [
                {title: "标识", value: "", field: 'id', valid: {}, type: "hidden"},
                {title: "编码", value: "", field: 'code', valid: {notEmpty: true, maxLen: 50}, type: "text"},
                {title: "名称", value: "", field: 'name', valid: {maxLen:30}, type: "text"},
                {title: "值", value: "", field: 'value', valid: "isNumeric", type: "text"},
                {title: "描述", value: "", field: 'description', valid: "isExisty", type: "textarea"},
                {title: "父级", value: "", field: 'parentId', valid: "isNumeric", type: "select", list: [{text: "父级", value: 0}]},
                {title: "顺序号", value: "", field: 'serialNo', valid: "isNumeric", type: "text"},
                {title: "备注", value: "", field: 'remark', valid: "isEmptyString", type: "textarea"}
            ],
            formButtons: [
                {type: "submit", text: "确定", fnClick: this.onItemAdd.bind(this)}
            ],
            formDefault: {id: 0, code: "", name: "", value: "", description: "", parentId: 0, serialNo: 0, remark: ""},
            dialogVisible: false,
            dialogType: "new"
        };
    }
    render(){
        return (
            <Row>
                <Col>
                    <Box title="数据字典">
                        <div className="col-lg-2 col-md-3" style={{paddingLeft: 0}}>
                            <MenuList 
                                title="全部字典分类" 
                                list={this.state.menuList}
                                active={this.state.active}
                                fnTitleClick={() => { this.onMenuItemClick({parentId: ""}, -1); }}
                                fnTitleBTClick={this.onItemAdd.bind(this, -1)}
                                fnItemClick={(item, index) => { this.onMenuItemClick(item, index); }}
                                fnItemBTClick={(item, index) => { this.onItemDelete(item.id, true); }}
                            />
                        </div>
                        <div className="col-lg-10 col-md-9" style={{padding: 0}}>
                            <form onSubmit={(event) => { this.onSearch({name: $.trim(this.refs.ctx_input.value)}); event.preventDefault(); return false; }} className="col-md-6 col-xs-10" style={{paddingLeft: 0}}>
                                <div className="input-group">
                                    <input type="text" ref="ctx_input" className="form-control" placeholder="搜索"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="submit">搜索</button>
                                    </span>
                                </div>
                            </form>
                            <div className="col-lg-1 col-md-2 col-xs-2" style={{paddingLeft: 0}}>
                                <div className="input-group" style={{width: "100%"}}>
                                    <button className="btn btn-info" type="button" style={{width: "100%"}} onClick={() => { this.onItemAdd(this.state.active);}}>新增字典项</button>
                                </div>
                            </div>
                            <span className="clearfix"/>
                            <div className="col-md-12" style={{paddingLeft: 0, marginTop: "15px"}}>
                                <TableList 
                                    data={this.state.list} 
                                    columns={this.state.listColumns}
                                    edite={true}
                                    fnItemSelect={this.onItemUpdate.bind(this)} 
                                    fnItemDelete={this.onItemDelete.bind(this)}
                                    fnPageChange={this.onPageChange.bind(this)}
                                    fnPageSelectChange={this.onPageSelectChange.bind(this)}
                                />
                            </div>
                            <span className="clearfix"/>
                        </div>
                        <span className="clearfix"/>
                        <Dialog ref="dialog" visible={this.state.dialogVisible}
                            animation="slide-fade"
                            maskAnimation="fade"
                            onClose={this.dialogClose.bind(this)}
                            title={<div>{(this.state.dialogType == "new" ? "添加新" : "修改") + "字典"}</div>}>
                            <VForm columns={this.state.formColumns} buttons={this.state.formButtons} fnSubmit={this.onFormSubmit.bind(this)}/>
                        </Dialog>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.getTypes(true);
    }

    getDatas(param){        
        param = Object.assign({}, this.state.params, param);
        $.ajax({
            type: "get",
            url: "/surface/dictionary",
            data: this.makeParam(param),
            dataType: 'json',
            success: (data) => {
                this.setState({list: data, params: param});
            }
        });
    }
    makeParam(param){
        var para = {};
        for(var i in param) if(param[i] !== "" && param[i] !== null && param[i] !== undefined) para[i] = param[i];
        return para;
    }

    getTypes(bo = false){
        $.ajax({
            type: "get",
            url: "/surface/dictionary",
            data: {parentId: 0},
            dataType: 'json',
            success: (data) => {
                this.makeMenuList(data.list, bo);
            }
        });
    }
    makeMenuList(data, bo){
        var list = data.map((item, i) => { return {icon: "times", text: item.name, item: item}; });
        var param = Object.assign({}, this.state.params), active = this.state.active;
        if(bo){
            if(list[this.state.active]){
                param.parentId = list[this.state.active].item.id;
            }
            else active = -1;
            this.getDatas(param);
        }
        this.setState({menuList: list, active: active});
    }    

    //"{id:0,code:\"这是第一个示例\",name:\"这是第一个示例\",value:1,description:\"这是第一个示例\",parentId:0,remark:\"这是第一个示例\",creator:\"000\",modifyMan:\"000\"}"
    addUpdateData(obj){
        var type = this.state.dialogType;
        $.ajax({
            type: type == "new" ? "post" : "put",
            url: "/surface/dictionary" + (type == "new" ? "" : "/" + obj.id),
            data: obj,
            dataType: "json",
            success: (data) => {
                if(data.res){
                    this.getTypes(true);
                }
            }
        });
    }

    deleteData(id, bo){
        $.ajax({
            type: "delete",
            url: "/surface/dictionary/" + id,
            dataType: 'json',
            success: (data) => {
                if(data.res){
                    if(bo) this.getTypes();
                    var param = Object.assign({}, this.state.params, {parentId: this.state.menuList[this.state.active + 1] ? this.state.menuList[this.state.active + 1].item.id : ""});
                    this.getDatas(param);
                }
            }
        });
    }
    
    makeFormColumns(obj = {}){
        var type = obj.id && obj.id > 0 ? "update" : "new";
        var columns = Object.assign([], this.state.formColumns);
        columns = columns.map((va, i) => {
            va.value = obj[va.field] !== null && obj[va.field] !== undefined ? obj[va.field] : "";
            return va;
        });
        var list = this.state.menuList.map((va, i) => {
            return {text: va.item.name, value: va.item.id};
        });
        list.unshift({text: "父级", value: 0});
        for(var i = 0, z = columns.length; i < z; i++)
            if(columns[i].field == "parentId") columns[i].list = list;
        this.setState({formColumns: columns, dialogType: type});
    };
    makeFormSelectList(){
        var list = this.state.menuList.map((va, i) => {
            return {text: va.name, value: va.id};
        });
        list.unshift({text: "父级", value: 0});
        var columns = Object.assign([], this.state.formColumns);
        for(var i = 0, z = columns.length; i < z; i++)
            if(columns[i].field == "parentId") columns[i].list = list;
        this.setState({formColumns: columns});
    }
    dialogClose(){
        this.setState({dialogVisible: false});
    }
    dialogOpen(){
        this.setState({dialogVisible: true});
    }
    
    onPageChange(pageNo){
        this.getDatas({pageNo: pageNo});
    }
    onPageSelectChange(pageSize) {
        this.getDatas({pageSize: pageSize});
    }    
    onItemAdd(index){
        var obj = Object.assign({}, this.state.formDefault, {parentId: this.state.menuList[index] ? this.state.menuList[index].item.id : 0});
        this.makeFormColumns(obj);
        this.dialogOpen();
    }
    onItemUpdate(obj){
        obj.parentId = obj.parentId ? obj.parentId : 0;
        this.makeFormColumns(obj);
        this.dialogOpen();
    }
    onItemDelete(id, bo){
        bo = bo || false;
        if(confirm("确定要删除选定的目标？")) this.deleteData(id, bo);
    }

    onMenuItemClick(item, index){
        this.onSearch({parentId: item.id, pageNo: 1, name: undefined});
        this.refs.ctx_input.value = "";
        this.setState({active: index});
    }

    onSearch(param){
        if(param.name !== undefined){
            param = {isPaging: true, pageNo: 1, pageSize: this.state.params.pageSize, name: param.name, parentId: ""};
            this.setState({active: -1});
        }
        this.getDatas(param);
    }

    onFormSubmit(values){
        console.log(values);
        this.addUpdateData(values);
        this.dialogClose();
    }
}