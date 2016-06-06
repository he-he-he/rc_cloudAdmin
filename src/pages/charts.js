import React, {Component} from 'react';
import {Layout, Boxs,Charts} from '../../components';
const {Row, Col} = Layout;
const {Box} = Boxs;
const {ChartJs} = Charts;
class ChartsPage extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Box title="chart">
                        <ChartJs/>
                    </Box>
                </Col>
            </Row>
        );
    }
}

export default ChartsPage;