import React, {Component} from 'react';
import {Tables, Boxs,Layout} from '../../components';
const {Row,Col}=Layout;
const {TableCurd} = Tables;
const {Box} = Boxs;



class Curd extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Box title="增删改">
                        <TableCurd url="/dictionary"/>
                    </Box>
                </Col>
            </Row>
        );
    }
}

export default Curd;