/**
 * Created by Tyler on 2017/11/8 11:40.
 */
require.config(
    {
        paths:{
            'jquery':'../lib/jquery-1.11.0'
        }
    }
);

require(['jquery'], function ($) {
    $(document).on('click', '#contentBtn', function () {
        $("#messagebox").html("You have access Jquery by using require()");
    });
});