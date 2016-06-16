require('rc-pagination/assets/index.css');
import React, {Component} from 'react';
import Pagination from 'rc-pagination';

class Pager extends Component {
    render() {
        const {total, current, pageSize,onChange,onSelectChange} = this.props;
        return (
            <div className="row">
                <div className=" col-md-2">
                    <select className="form-control input-sm" onChange={onSelectChange} value={pageSize}>
                        <option value="10">10条/页</option>
                        <option value="20">20条/页</option>
                        <option value="30">30条/页</option>
                    </select>
                </div>
                <div className=" col-md-10">
                    <Pagination
                        className="pagers"
                        total={total}
                        pageSize={pageSize}
                        current={current}
                        onChange={onChange}
                        showQuickJump
                    />
                </div>
            </div>

        );
    }
}
Pager.protTypes={
    total:React.PropTypes.number,
    current:React.PropTypes.number,
    pageSize:React.PropTypes.number,
    onChange:React.PropTypes.fun,
    onSelectChange:React.PropTypes.fun
}
export default Pager;