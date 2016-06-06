import React, {Component} from 'react';

class Box extends Component {
    render() {
        return (
            <div className="box border pink" ref="box">
                <div className="box-title">
                    <h4>
                        <i className="fa fa-table"></i>
                        {this.props.title}
                    </h4>
                    <div className="tools">
                        <a href="javascript:;" className="collapse">
                            <i className="fa fa-chevron-up"></i>
                        </a>
                        <a href="javascript:;" className="remove">
                            <i className="fa fa-times"></i>
                        </a>
                    </div>
                </div>
                <div className="box-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
    componentDidMount() {
       const $box= this.$box = jQuery(this.refs.box);
        $box.find('.collapse,.expand').on('click', function () {
            var el = jQuery(this).parents(".box").children(".box-body");
            if (jQuery(this).hasClass("collapse")) {
                jQuery(this).removeClass("collapse").addClass("expand");
                var i = jQuery(this).children(".fa-chevron-up");
                i.removeClass("fa-chevron-up").addClass("fa-chevron-down");
                el.slideUp(200);
            } else {
                jQuery(this).removeClass("expand").addClass("collapse");
                var i = jQuery(this).children(".fa-chevron-down");
                i.removeClass("fa-chevron-down").addClass("fa-chevron-up");
                el.slideDown(200);
            }
        });     
        $box.find('a.remove').on('click', function () {
            var removable = jQuery(this).parents(".box");
            if (removable.next().hasClass('box') || removable.prev().hasClass('box')) {
                jQuery(this).parents(".box").remove();
            } else {
                jQuery(this).parents(".box").parent().remove();
            }
        });
    }
    componentWillUnmount() {
        this.$box.find('.collapse,.expand').off();
        this.$box.find('a.remove').off();
    }
    

}
Box.propTypes = {
    title: React.PropTypes.string
};

export default Box;