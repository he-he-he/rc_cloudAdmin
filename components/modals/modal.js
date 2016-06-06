import React, {Component} from 'react';
import Dialog from 'rc-dialog';
class Modal extends Component {
    render() {
        const {title, onclose}=this.props;
        return (
            <Dialog title={title} onClose={onclose} >
                {this.props.children}
            </Dialog>
        );
    }
}

export default Modal;