import React, {Component} from 'react';
import {Layout, Boxs, Maps} from '../../components'
const {Row, Col} = Layout;
const {Box} = Boxs;
const {Markers} = Maps;
var data = [
    { x: '1', y: '2', id: 1 },
    { x: '1', y: '2', id: 2 },
    { x: '1', y: '2', id: 3 },
    { x: '1', y: '2', id: 4 },
    { x: '1', y: '2', id: 5 },
    { x: '1', y: '2', id: 6 },
    { x: '1', y: '2', id: 7 },
    { x: '1', y: '2', id: 8 },
    { x: '1', y: '2', id: 9 },
    { x: '1', y: '2', id: 10 },
    { x: '1', y: '2', id: 11 },
    { x: '1', y: '2', id: 12 },
    { x: '1', y: '2', id: 13 },
]


class Baimap extends Component {
    render() {

        return (
            <Row>
                <Col>
                    <Box title="地图">
                        <Markers name="b1" data={data}/>
                    </Box>
                </Col>
            </Row>
        );
    }
    componentDidMount() {

    }

}

export default Baimap;