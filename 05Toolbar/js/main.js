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

requirejs(["jquery"], function ($) {
    $("body").css("background-color", "black");
});

requirejs(["jquery", "validate"], function ($, validate) {
    console.log(validate.isEqual(1, 2));
});