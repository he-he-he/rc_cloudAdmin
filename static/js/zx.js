var currentPage = ''; // current page
var collapsed = false; //sidebar collapsed
var is_mobile = false; //is screen mobile?
var is_mini_menu = false; //is mini-menu activated
var is_fixed_header = false; //is fixed header activated
var responsiveFunctions = []; //responsive function holder
var App = {
    //Set page
    setPage: function (name) {
        currentPage = name;
    },
    isPage: function (name) {
        return currentPage == name ? true : false;
    },
    //public function to add callback a function which will be called on window resize
    addResponsiveFunction: function (func) {
        responsiveFunctions.push(func);
    },
    // wrapper function to scroll(focus) to an element
    scrollTo: function (el, offeset) {
        pos = (el && el.size() > 0) ? el.offset().top : 0;
        jQuery('html,body').animate({
            scrollTop: pos + (offeset ? offeset : 0)
        }, 'slow');
    },

    // function to scroll to the top
    scrollTop: function () {
        App.scrollTo();
    },
    // initializes uniform elements
    initUniform: function (els) {
        if (els) {
            jQuery(els).each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        } else {
            handleAllUniform();
        }
    },
    // wrapper function to  block element(indicate loading)
    blockUI: function (el, loaderOnTop) {
        lastBlockedUI = el;
        jQuery(el).block({
            message: '<img src="static/img/loaders/12.gif" align="absmiddle">',
            css: {
                border: 'none',
                padding: '2px',
                backgroundColor: 'none'
            },
            overlayCSS: {
                backgroundColor: '#000',
                opacity: 0.05,
                cursor: 'wait'
            }
        });
    },

    // wrapper function to  un-block element(finish loading)
    unblockUI: function (el) {
        jQuery(el).unblock({
            onUnblock: function () {
                jQuery(el).removeAttr("style");
            }
        });
    },
};
/*-----------------------------------------------------------------------------------*/
/*	Check layout size
/*-----------------------------------------------------------------------------------*/
function checkLayout() {
    //Check if sidebar has mini-menu
    is_mini_menu = $('#sidebar').hasClass('mini-menu');
    //Check if fixed header is activated
    is_fixed_header = $('#header').hasClass('navbar-fixed-top');
}

/*-----------------------------------------------------------------------------------*/
/*	Sidebar & Main Content size match
/*-----------------------------------------------------------------------------------*/
function handleSidebarAndContentHeight() {
    var content = $('#content');
    var sidebar = $('#sidebar');
    var body = $('body');
    var height;

    if (body.hasClass('sidebar-fixed')) {
        height = $(window).height() - $('#header').height() + 1;
    } else {
        height = sidebar.height() + 20;
    }
    if (height >= content.height()) {
        content.attr('style', 'min-height:' + height + 'px !important');
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Responsive Sidebar Collapse
/*-----------------------------------------------------------------------------------*/
function responsiveSidebar() {
    //Handle sidebar collapse on screen width
    var width = $(window).width();
    if (width < 768) {
        is_mobile = true;
        //Hide the sidebar completely
        jQuery('#main-content').addClass("margin-left-0");
    }
    else {
        is_mobile = false;
        //Show the sidebar completely
        jQuery('#main-content').removeClass("margin-left-0");
        var menu = $('.sidebar');
        if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before resizing
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('#sidebar').removeAttr('style');
        }
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Handle Fixed Sidebar
/*-----------------------------------------------------------------------------------*/
function handleFixedSidebar() {
    var menu = $('.sidebar-menu');

    if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
        menu.slimScroll({
            destroy: true
        });
        menu.removeAttr('style');
        $('#sidebar').removeAttr('style');
    }

    if ($('.sidebar-fixed').size() === 0) {
        handleSidebarAndContentHeight();
        return;
    }

    var viewport = getViewPort();
    if (viewport.width >= 992) {
        var sidebarHeight = $(window).height() - $('#header').height() + 1;

        menu.slimScroll({
            size: '7px',
            color: '#a1b2bd',
            opacity: .3,
            height: sidebarHeight,
            allowPageScroll: false,
            disableFadeOut: false
        });
        handleSidebarAndContentHeight();
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Handles navbar fixed top
/*-----------------------------------------------------------------------------------*/
function handleNavbarFixedTop() {
    if (is_mobile && is_fixed_header) {
        //Manage margin top
        $('#main-content').addClass('margin-top-100');
    }
    if (!(is_mobile) && is_fixed_header) {
        //Manage margin top
        $('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Runs callback functions set by App.addResponsiveFunction()
/*-----------------------------------------------------------------------------------*/
function runResponsiveFunctions() {
    // reinitialize other subscribed elements
    for (var i in responsiveFunctions) {
        var each = responsiveFunctions[i];
        each.call();
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Sidebar
/*-----------------------------------------------------------------------------------*/
function handleSidebar() {
    jQuery('.sidebar-menu .has-sub > a').click(function () {
        var last = jQuery('.has-sub.open', $('.sidebar-menu'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);

        var thisElement = $(this);
        var slideOffeset = -200;
        var slideSpeed = 200;

        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(slideSpeed, function () {
                if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                    App.scrollTo(thisElement, slideOffeset);
                }
                handleSidebarAndContentHeight();
            });
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(slideSpeed, function () {
                if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                    App.scrollTo(thisElement, slideOffeset);
                }
                handleSidebarAndContentHeight();
            });
        }
    });

    // Handle sub-sub menus
    jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function () {
        var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);

        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200);
        }
    });
}
/*-----------------------------------------------------------------------------------*/
/*	Handle Fixed Sidebar on Mobile devices
/*-----------------------------------------------------------------------------------*/
function handleMobileSidebar() {
    var menu = $('.sidebar');
    if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
        menu.slimScroll({
            destroy: true
        });
        menu.removeAttr('style');
        $('#sidebar').removeAttr('style');
    }
    menu.slimScroll({
        size: '7px',
        color: '#a1b2bd',
        opacity: .3,
        height: "100%",
        allowPageScroll: false,
        disableFadeOut: false
    });
}
/*-----------------------------------------------------------------------------------*/
/*	Sidebar Collapse
/*-----------------------------------------------------------------------------------*/
function handleSidebarCollapse() {
    var viewport = getViewPort();
    if ($.cookie('mini_sidebar') === '1') {
        /* For Navbar */
        jQuery('.navbar-brand').addClass("mini-menu");
        /* For sidebar */
        jQuery('#sidebar').addClass("mini-menu");
        jQuery('#main-content').addClass("margin-left-50");
        collapsed = true;
    }
    //Handle sidebar collapse on user interaction
    jQuery('.sidebar-collapse').click(function () {
        //Handle mobile sidebar toggle
        if (is_mobile && !(is_mini_menu)) {
            //If sidebar is collapsed
            if (collapsed) {
                jQuery('body').removeClass("slidebar");
                jQuery('.sidebar').removeClass("sidebar-fixed");
                //Add fixed top nav if exists
                if (is_fixed_header) {
                    jQuery('#header').addClass("navbar-fixed-top");
                    jQuery('#main-content').addClass("margin-top-100");
                }
                collapsed = false;
                $.cookie('mini_sidebar', '0');
            }
            else {
                jQuery('body').addClass("slidebar");
                jQuery('.sidebar').addClass("sidebar-fixed");
                //Remove fixed top nav if exists
                if (is_fixed_header) {
                    jQuery('#header').removeClass("navbar-fixed-top");
                    jQuery('#main-content').removeClass("margin-top-100");
                }
                collapsed = true;
                $.cookie('mini_sidebar', '1');
                handleMobileSidebar();
            }
        }
        else { //Handle regular sidebar toggle
            var iconElem = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]');
            var iconLeft = iconElem.getAttribute("data-icon1");
            var iconRight = iconElem.getAttribute("data-icon2");
            //If sidebar is collapsed
            if (collapsed) {
                /* For Navbar */
                jQuery('.navbar-brand').removeClass("mini-menu");
                /* For sidebar */
                jQuery('#sidebar').removeClass("mini-menu");
                jQuery('#main-content').removeClass("margin-left-50");
                jQuery('.sidebar-collapse i').removeClass(iconRight);
                jQuery('.sidebar-collapse i').addClass(iconLeft);
                /* Add placeholder from Search Bar */
                jQuery('.search').attr('placeholder', "Search");
                collapsed = false;
                $.cookie('mini_sidebar', '0');
            }
            else {
                /* For Navbar */
                jQuery('.navbar-brand').addClass("mini-menu");
                /* For sidebar */
                jQuery('#sidebar').addClass("mini-menu");
                jQuery('#main-content').addClass("margin-left-50");
                jQuery('.sidebar-collapse i').removeClass(iconLeft);
                jQuery('.sidebar-collapse i').addClass(iconRight);
                /* Remove placeholder from Search Bar */
                jQuery('.search').attr('placeholder', '');
                collapsed = true;
                $.cookie('mini_sidebar', '1');
            }
            $("#main-content").on('resize', function (e) {
                e.stopPropagation();
            });
        }
    });
}
/*-----------------------------------------------------------------------------------*/
/*	Team View
/*-----------------------------------------------------------------------------------*/
function handleTeamView() {
    var w = function (y) {
        $(".team-status").each(function () {
            var z = $(this);
            if (z.is(":visible")) {
                var A = x(y);
                if (A != ("#" + z.attr("id"))) {
                    $(this).slideUp(200, function () {
                        $(this).toggleClass("open");
                        $(".team-status-toggle").each(function () {
                            var B = x(this);
                            if (B == ("#" + z.attr("id"))) {
                                $(this).parent().removeClass("open")
                            }
                        })
                    })
                }
            }
        })
    };
    var x = function (y) {
        var z = $(y).data("teamStatus");
        if (typeof z == "undefined") {
            z = "#team-status"
        }
        return z
    }
    var c = function () {
        $(".team-status").each(function () {
            var x = $(this);
            x.css("position", "absolute").css("margin-top", "-1000px").show();
            var w = 0;
            $("ul li", this).each(function () {
                w += $(this).outerWidth(true) + 15
            });
            x.css("position", "relative").css("margin-top", "0").hide();
            $("ul", this).width(w)
        })
    };

    c();
    $(".team-status-toggle").click(function (y) {
        y.preventDefault();
        w(this);
        $(this).parent().toggleClass("open");
        var z = x(this);
        $(z).slideToggle(200, function () {
            $(this).toggleClass("open")
        })
    });
    // $("body").click(function (z) {
    //     var y = z.target.className.split(" ");
    //     if ($.inArray("team-status", y) == -1 && $.inArray("team-status-toggle", y) == -1 && $(z.target).parents().index($(".team-status")) == -1 && $(z.target).parents(".team-status-toggle").length == 0) {
    //         w()
    //     }
    // });
    $(".team-status #teamslider").each(function () {
        $(this).slimScrollHorizontal({
            width: "100%",
            alwaysVisible: true,
            color: "#fff",
            opacity: "0.5",
            size: "5px"
        })
    });
}
/*-----------------------------------------------------------------------------------*/
/* Box tools
/*-----------------------------------------------------------------------------------*/
function handleBoxTools() {
    //Collapse
    jQuery('.box .tools .collapse, .box .tools .expand').on('click',function () {
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

    /* Close */
    jQuery('.box .tools a.remove').on('click',function () {
        var removable = jQuery(this).parents(".box");
        if (removable.next().hasClass('box') || removable.prev().hasClass('box')) {
            jQuery(this).parents(".box").remove();
        } else {
            jQuery(this).parents(".box").parent().remove();
        }
    });

}
/*-----------------------------------------------------------------------------------*/
/*	Handles the go to top button at the footer
/*-----------------------------------------------------------------------------------*/
function handleGoToTop() {
    $('.footer-tools').on('click', '.go-top', function (e) {
        App.scrollTo();
        e.preventDefault();
    });
}
/*-----------------------------------------------------------------------------------*/
/*	To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
/*-----------------------------------------------------------------------------------*/
function getViewPort() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Handles theme skin switches
/*-----------------------------------------------------------------------------------*/
function handleThemeSkins() {
    // Handle theme colors
    var setSkin = function (color) {
        $('#skin-switcher').attr("href", "static/css/themes/" + color + ".css");
        $.cookie('skin_color', color);
    }
    $('ul.skins > li a').click(function () {
        var color = $(this).data("skin");
        setSkin(color);
    });

    //Check which theme skin is set
    if ($.cookie('skin_color')) {
        setSkin($.cookie('skin_color'));
    }
}
/*-----------------------------------------------------------------------------------*/
/*	Custom tabs
/*-----------------------------------------------------------------------------------*/
function handleCustomTabs() {
    var adjustMinHeight = function (y) {
        $(y).each(function () {
            var A = $($($(this).attr("href")));
            var z = $(this).parent().parent();
            if (z.height() > A.height()) {
                A.css("min-height", z.height())
            }
        })
    };
    $("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
        adjustMinHeight($(this))
    });
    adjustMinHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');
    if (location.hash) {
        var w = location.hash.substr(1);
        $('a[href="#' + w + '"]').click()
    }
}