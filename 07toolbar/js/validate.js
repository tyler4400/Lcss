/**
 * 自己写一个验证模块，依赖于jquery
 * Created by Tyler on 2017/11/9 14:12.
 */
define(['jquery'], function ($) {
    return {
        isEqual: function (v1, v2) {
            return v1 == v2;
        }
    };

});