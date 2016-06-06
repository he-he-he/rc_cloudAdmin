import React, {Component} from 'react';
import {Layout, Boxs} from '../../components'
const {Row, Col} = Layout;
const {Box, BoxTab, DashBox} = Boxs;

const tabs = [
    { name: 'tab1', content: <a>cccc</a> },
    { name: 'tab2', content: <h1>bbbbb</h1> }
]
export default class Index extends Component {
    render() {

        return (
            <div>
                <Row>
                    <Col lg="6" md="6">
                        <Row>
                            <Col lg="6">
                                <DashBox title="aaa" number={10} info="10%" />
                            </Col>
                            <Col lg="6">
                                <DashBox title="bbb" number={1000} info="30%" />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="6" md="6">
                        <Box title="标题">
                            234234
                        </Box>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BoxTab title="tab页" tabs={tabs}/>
                    </Col>
                </Row>

            </div>
        )
    }
}