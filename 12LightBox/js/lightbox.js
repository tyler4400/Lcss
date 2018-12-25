/**
 * Created by Tyler on 2018/12/13 20:47.
 */
(function ($) {
    let LightBox = function () {
        let _this = this;

        this.popupMask = $(`<div id="G-lightbox-mask" class="d-n"></div>`);
        this.popupWin = $(`<div id="G-lightbox-popup" class="d-n"></div>`);
        this.bodyNode = $(document.body);
        this.JDOM = null;

        this.index = 0; //当前图片所在组的索引
        this.groupName = null;
        this.groupData = [];

        this.renderDOM();
        this.JDOM = this.getJDOM();

        this.bodyNode.delegate(".js-lightbox,*[data-role=lightbox]", "click", function (e) {
            //停止事件冒泡
            e.stopPropagation();

            //获取group信息
            let curGroupName = $(this).attr('data-group');
            if(_this.groupName !== curGroupName) {
                _this.groupName = curGroupName;
                _this.groupData = _this.getGroupData();
                console.log(_this.groupData);
            }

            //初始化弹出
            _this.initPopup($(this));

        });


    };

    LightBox.prototype = {
        initPopup (JDOM) {
            let _this = this;
            let curObj = {
                sourceSrc : JDOM.attr('data-source'),
                currentId : JDOM.attr('data-id'),
            };
            _this.showMaskAndPopup(curObj);
            _this.showPicAndSwitchBtn(curObj);

        },
        showMaskAndPopup (obj) {
            let _this = this;
            //隐藏图片和caption区域
            _this.JDOM.popupPic.hide();
            _this.JDOM.picCaptionArea.hide();

            //遮罩 fade in (mask和win事先是display:none的)
            _this.popupMask.fadeIn();

            //设置合适的picViewArea大小
            let winW = $(window).width(),
                winH = $(window).height();
            _this.JDOM.picViewArea.css({width: winW / 2, height: winH / 2});

            //展现弹出窗口
            _this.popupWin.fadeIn();
            _this.popupWin.css({
                width: winW / 2 + 10,
                height: winH / 2 + 10,
                marginLeft: -(winW / 2 + 10) / 2,
                top: -(winH / 2 + 10) ,
            }).animate({top: (winH / 2 + 10) / 2}, 'fast', function () {
                console.log('加载图片');
            });
        },
        showPicAndSwitchBtn (obj) {
            let _this = this;

            _this.index = _this.getIndexOf(obj.currentId);
            console.log(_this.index);

            //判断是否展示上下切换按钮(先让按钮都显示出来)
            _this.JDOM.prevBtn.removeClass('d-n');
            _this.JDOM.nextBtn.removeClass('d-n');
            if(_this.index === 0) _this.JDOM.prevBtn.addClass('d-n');
            if(_this.index === _this.groupData.length - 1) _this.JDOM.nextBtn.addClass('d-n');
        },
        getIndexOf (id) {
            let index = 0;
            $(this.groupData).each(function (i) {
                if(this.id === id) return false;
                index ++;
            });
            return index;
        },
        getJDOM () {
            return {
                picViewArea: this.popupWin.find('div.lightbox-pic-view'),
                popupPic: this.popupWin.find('img.lightbox-img'),
                picCaptionArea: this.popupWin.find('div.lightbox-pic-caption'),
                nextBtn: this.popupWin.find('span.lightbox-next-btn'),
                prevBtn: this.popupWin.find('span.lightbox-prev-btn'),
                captionText: this.popupWin.find('p.lightbox-pic-des'),
                currentIndex: this.popupWin.find('span.lightbox-of-index'),
                closeBtn: this.popupWin.find('span.lightbox-close-btn'),
            };
        },
        renderDOM () {
            let dom = `
                <div class="lightbox-pic-view">
                    <span class="lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span>
                    <!--<img src="img/wallhaven-716979.jpg" width="100%" alt="" class="lightbox-image">-->
                    <span class="lightbox-btn lightbox-next-btn lightbox-next-btn-show"></span>
                </div>
                <div class="lightbox-pic-caption">
                    <div class="lightbox-caption-area">
                        <p class="lightbox-pic-desc">图片索引</p>
                        <span class="lightbox-of-index">当前索引: 1 of 4</span>
                    </div>
                    <span class="lightbox-close-btn"></span>
                </div>
                `;
            this.popupWin.html(dom);
            this.bodyNode.append(this.popupMask, this.popupWin);
        },
        getGroupData () {
            let groupData = [];
            let groupList = this.bodyNode.find(`*[data-group=${this.groupName}]`);
            groupList.each(function () {
                groupData.push({
                    src: $(this).attr('data-source'),
                    id: $(this).attr('data-id'),
                    caption: $(this).attr('data-caption')
                });
            });
            return groupData;
        }
    };

    window.LightBox = LightBox;

})(jQuery);
