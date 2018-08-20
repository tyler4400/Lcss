/**
 * Created by Tyler on 2017/11/9 11:02.
 */
requirejs.config(
    {
        paths:{
            jquery: "jquery-1.11.0"
        }
    }
);

requirejs(["jquery", "scroll"], function ($, Scroll) {
    $("body").css("background-color", "#3c3f41");
    $("#backToTop").on("click",backToTop);
    $(window).on("scroll", function () {
        checkPosition($(window).height());
    });
    checkPosition($(window).height());//初始执行

    /**
     * 回到顶部
     */
    function backToTop() {
        $("html, body").animate({
            scrollTop : 0
        }, 200);
    }

    /**
     * 当滚动条滚动的时候，进行检查
     * @param pos
     */
    function checkPosition(pos) {
        if ($(window).scrollTop() > pos){
            $("#backToTop").fadeIn();
        } else{
            $("#backToTop").fadeOut();
        }

    }

});

requirejs(["jquery", "validate"], function ($, validate) {
    console.log(validate.isEqual(1, 2));
});