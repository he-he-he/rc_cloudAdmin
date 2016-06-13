import React, {Component} from "react";

export class Dictionary{
    constructor(arr = {}){
        this.id = arr["id"];
        this.code = arr["code"];
        this.name = arr["name"];
        this.value = arr["value"];
        this.escription = arr["escription"];
        this.parentId = arr["parentId"];
        this.creator = arr["creator"];
        this.createTime = arr["createTime"];
        this.modifyMan = arr["modifyMan"];
        this.modifyTime = arr["modifyTime"];
        this.remark = arr["remark"];
    }
}
Dictionary.columns = () => [
    /*
    { name: "标识", field: 'id', type: "number", list: { title: 'id', dataIndex: 'id', key: 'id', width: 10 }, form: {} },
    { name: "编码", field: 'code', type: "string", list: { title: 'code', dataIndex: 'code', key: 'code' } },
    { name: "名称", field: 'name', type: "string", list: },
    { name: "值", field: 'value', type: "number", list: },
    { name: "描述", field: 'description', type: "string", list: },
    { name: "父级", field: 'parentId', type: "string", list: },
    { name: "创建者", field: 'creator', type: "string", list: },
    { name: "创建时间", field: 'createTime', type: "string", list: },
    { name: "修改者", field: 'modifyMan', type: "string", list: },
    { name: "修改时间", field: 'modifyTime', type: "string", list: },
    { name: "备注", field: 'remark', type: "string", list: }
    */
];
Dictionary.makeColumns = (type, obj) => {
    return [
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
    ]
};