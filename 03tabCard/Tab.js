/**
 * 面向对象思想封装的tab类
 * JS插件开发之-Tab选项卡-慕课网  http://www.imooc.com/learn/825
 * Created by Tyler on 2017/08/23 11:45.
 */
(function($) {
    var Tab = function (tab) {
        //获取自己（因为this表示的含义经常发生变化）
        var _self = this;
        //保存存进来的配置参数tab（就像是java对象把参数放到自己的属性上一样）
        this.tab = tab;
        //默认的配置参数
        this.config = {
            "triggerType" : "mouseover" //触发的类型 mouseover ,click,double-click
            ,"effect" : "none"          //转换的时候的特效，none,fade
            ,"invoke" : 0               //默认显示的第一张图片 从0开始
            ,"auto" : 0                 //自动轮播时间间隔，0和负数表示不轮播
        };
        //如果配置参数存在，则扩展掉默认的配置参数
        if (this.config){
            $.extend(this.config,this.getConfig());
            // console.log(this.config);
        }
        //获取tab标签列表，以及对应的content列表
        this.tabItems     = this.tab.find("ul.tab-nav li");
        this.contentItems = this.tab.find(".content-wrap div");
        //保存配置参数(老师说保存一下减少每次查找的性能开销)
        var config = this.config;
        //配置相应的绑定事件
        /******** 以下为老师的配置绑定参数代码 *********/
        /*
        if (config.triggerType === "click"){
            this.tabItems.bind(config.triggerType,function () {
               alert(1);
            });
        }else if(config.triggerType === "mouseover" || config.triggerType !== "click"){
            this.tabItems.mouseover(config.triggerType,function () {
                alert(2);
            });
        }
        */
        /********** end of teachers code for binding ***********/
        /********* 以下为我的配置绑定参数代码 **********/
        config.triggerType = config.triggerType === "click" ? "click" : "mouseover";
        this.tabItems.bind(config.triggerType,function () {
            _self.invoke($(this));
        });
        /************* end of my code for binding **************/
        //自动切换
        // var index = this.tab.index();
        if (config.auto > 0){
            this.myTimer = null;
            this.myLoop = 0;
            this.autoPlay();
            //鼠标移入的时候停止轮播(这里有bug,代码已经改得乱七八糟了还是没有解决)
            // $(".js-tab").hover(
            //     function () {
            //         window.clearInterval(_self.myTimer);
            //         console.log("clear");
            //     },
            //     function () {
            //         _self.autoPlay();
            //         console.log("autoPlay");
            //     }
            // );
        }
        //默认显示第几个tab
        this.invoke(this.tabItems.eq(config.invoke));
    };

    Tab.prototype = {
        //获取配置参数
        getConfig:function () {
            var config = this.tab.attr("data-config");
            console.log("接收到的配置参数是：\n" + config);
            //转义
            if (config && config !== ""){
                return $.parseJSON(config);
            }else {
                return null;
            }
        }
        //事件驱动函数
        ,invoke:function (currentTab) {
            var _this = this;
            var index = currentTab.index();
            //将index的值绑定到全局loop上
            this.myLoop = this.config.auto ? index : undefined;
            //tab选项卡的切换
            currentTab.addClass("active").siblings().removeClass("active");
            //content内容的切换
            switch (this.config.effect){
                case "fade"     :
                    this.contentItems.eq(index).fadeIn().siblings().fadeOut();//这里采用fadein，不是current
                    console.log("the switch effect is fade");
                    break;
                case "fade-in"  :
                    console.log("the switch effect is fade-in");
                    break;
                case "fade-out" :
                    console.log("the switch effect is fade-out");
                    break;
                default :
                    this.contentItems.eq(index).addClass("current").siblings().removeClass("current");
                    console.log("the switch effect is none");
            }

        }
        //自动轮播
        ,autoPlay:function () {
            var _this = this
                ,tabItems = this.tabItems
                ,tabLength = this.tabItems.size()
                ,config = this.config;
            this.myTimer = setInterval(function () {
                _this.myLoop = _this.myLoop >= tabLength -1 ? 0 : _this.myLoop + 1;//这里可以控制myloop和tablength的值差来达到轮播一圈休息一下的效果
                tabItems.eq(_this.myLoop).trigger(config.triggerType);
            },config.auto);

        }
        //自动初始化，获取页面上的每一个js-tab类的标签
        ,init:function (tabs) {
            var _self = this;
            console.log(this);
            tabs.each(function () {
                new Tab($(this));
            })
        }
    };

    //绑定到window上
    window.Tab = Tab;
    //初始化
    Tab.prototype.init($(".js-tab"));

})(jQuery);