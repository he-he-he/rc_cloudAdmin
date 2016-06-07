import React, {Component} from 'react';
import {Tables, Boxs,Layout} from '../../components';
const {Row,Col}=Layout;
const {TableCurd} = Tables;
const {Box} = Boxs;


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
    { title: 'remark', dataIndex: 'remark', key: 'remark' }
];
class Curd extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Box title="增删改">
                        <TableCurd url="/dictionary" columns={columns}/>
                    </Box>
                </Col>
            </Row>
        );
    }
}

export default Curd;