import React, {Component} from "react";
import {Tables, Menus, Layout, Boxs} from "../../../components";
import Dialog from 'rc-dialog';

const {Row, Col} = Layout;
const {Box, BoxTab, DashBox} = Boxs;
const {TableList} = Tables;
const {MenuList} = Menus;

export default class Directary extends Component{
    constructor(){
        super();
        this.state = {
            menuList: [],

            params: {
                isPaging: true,
                pageNo: 1,
                pageSize: 15,
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
                { title: '标识', dataIndex: 'id', key: 'id' },
                { title: '编码', dataIndex: 'code', key: 'code' },
                { title: '名称', dataIndex: 'name', key: 'name' },
                { title: '值', dataIndex: 'value', key: 'value' },
                { title: '描述', dataIndex: 'description', key: 'description' },
                //{ title: 'parentId', dataIndex: 'parentId', key: 'parentId' },
                //{ title: 'creator', dataIndex: 'creator', key: 'creator' },
                //{ title: 'createTime', dataIndex: 'createTime', key: 'createTime' },
                //{ title: 'modifyMan', dataIndex: 'modifyMan', key: 'modifyMan' },
                //{ title: 'modifyTime', dataIndex: 'modifyTime', key: 'modifyTime' },
                { title: '备注', dataIndex: 'remark', key: 'remark' }
            ],

            formData: {
                id: "",
                code: "",
                name: "",
                value: "",
                description: "",
                remark: ""
            },
            dialogVisible: false,
            dialogType: "new"
        };
    }
    render(){
        return (
            <Row>
                <Col>
                    <Box title="地图">
                        <div className="col-md-3" style={{paddingLeft: 0}}>
                            <MenuList 
                                title="全部分类" 
                                list={this.state.menuList} 
                                titleBTClick={this.onItemAdd.bind(this)}
                                fnItemClick={(item, index) => { this.onSearch({parentId: item.id}); }}
                                fnItemBTClick={(item, index) => { this.onItemDelete(item.id); }}
                            />
                        </div>
                        <div className="col-md-9" style={{padding: 0}}>
                            <form onSubmit={(event) => { this.onSearch({name: $.trim(this.refs.ctx_input.value)}); event.preventDefault(); return false; }} className="col-md-6" style={{paddingLeft: 0}}>
                                <div className="input-group">
                                    <input type="text" ref="ctx_input" className="form-control" placeholder="搜索"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="submit">搜索</button>
                                    </span>
                                </div>
                            </form>
                            <div className="col-md-6" style={{padding: 0}}>
                                <div className="input-group">
                                    <button className="btn btn-info" type="button" >添加</button>
                                </div>
                            </div>
                            <div className="col-md-12" style={{padding: 0, marginTop: "15px"}}>
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
                        </div>
                        <span className="clearfix"/>
                        <Dialog  visible={this.state.dialogVisible}
                            animation="slide-fade"
                            maskAnimation="fade"
                            onClose={this.dialogClose.bind(this)}
                            style={{width: 600}}
                            title={<div>{(this.state.dialogType == "new" ? "添加新" : "修改") + "字典"}</div>}>
                        </Dialog>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount(){
        this.getTypes();
    }

    getDatas(param){        
        param = Object.assign({}, this.state.params, param);
        console.log(this.makeParam(param));
        $.ajax({
            url: "/dictionary",
            data: this.makeParam(param),
            dataType: 'json',
            success: (data) => {
                this.setState({list: data, params: param});
            }
        });
    }
    makeParam(param){
        var para = {};
        for(var i in param) if(param[i] !== "") para[i] = param[i];
        return para;
    }

    getTypes(){        
        $.ajax({
            url: "/dictionary",
            data: {parentId: 0},
            dataType: 'json',
            success: (data) => {
                this.makeMenuList(data.list);
            }
        });
    }
    makeMenuList(data){
        var list = data.map((item, i) => { return {icon: "times", text: item.name, item: item}; });
        this.setState({menuList: list});
    }    
    
    onPageChange(pageNo){
        this.getDatas({pageNo: pageNo});
    }
    onPageSelectChange(pageSize) {
        this.getDatas({pageSize: pageSize});
    }    
    onItemAdd(){
        alert("add");
        // this.makeFormColumns();
        this.dialogOpen();
    }
    onItemUpdate(obj){
        // this.makeFormColumns(obj);
        this.dialogOpen();
    }
    onItemDelete(obj){
        console.log(obj);
    }

    onSearch(param){
        if(param.name !== undefined){
            param = {isPaging: true, pageNo: 1, pageSize: 15, name: "", parentId: ""}
        }
    }

    dialogClose(){
        this.setState({dialogVisible: false});
    }
    dialogOpen(){
        this.setState({dialogVisible: true});
    }
}