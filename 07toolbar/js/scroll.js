/**
 * 一个滚动条的滚动模块(未完成）
 * Created by Tyler on 2017/11/13 15:37.
 */
define(['jquery'], function ($) {
    function ScrollTo(params) {
        this.Params = $.extend(ScrollTo.DEFAULTS, params);
    }

    ScrollTo.prototype.move = function () {
        $("html, body").animate({
            scrollTop: this.Params.Destination
        }, this.Params.Time);
    };
    ScrollTo.prototype.go = function () {
        $("html, body").scrollTop(this.Params.Destination);
    };
    
    ScrollTo.DEFAULTS = {
        Destination : 0,
        Time : 200
    };

    return{
        ScrollTo: ScrollTo
    }
});