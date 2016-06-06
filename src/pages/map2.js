import React, {Component} from 'react';
import {Layout, Boxs, Maps} from '../../components'
const {Row, Col} = Layout;
const {Box} = Boxs;
const {MapSearch} = Maps;


class Baimap extends Component {
    render() {

        return (
            <Row>
                <Col>
                    <Box title="地图2">
                        <MapSearch name="b2"/>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount() {

    }

}

export default Baimap;