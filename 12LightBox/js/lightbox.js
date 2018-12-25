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
            _this.showMaskAndPopup(curObj.currentId, curObj.sourceSrc);
            _this.showNextPrevBtn(curObj.currentId);

        },
        showMaskAndPopup (id = 0, src) {
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
                _this.loadPic(src)
            });
        },
        loadPic (src) {
            let _this = this;
            _this.preLoadPic(src, function() {
                _this.JDOM.popupPic.attr('src', src);
                let picW = _this.JDOM.popupPic.width(),
                    picH = _this.JDOM.popupPic.height();
                _this.changePic(picW, picH);
            });
        },
        changePic (w, h) {
            let _this = this;
            let winW = $(window).width();
            let winH = $(window).height();

            let scale = Math.min(winW/(w + 10), winH/(h + 10), 1);
            w *= scale;
            h *= scale;

            this.JDOM.picViewArea.animate({width: w - 10, height: h - 10});
            this.popupWin.animate({
                width: w,
                height: h,
                marginLeft: -(w / 2),
                top: (winH - h) / 2,
            },function () {
                _this.JDOM.popupPic.css({width: w - 10, height: h - 10}).fadeIn();
                _this.JDOM.picCaptionArea.fadeIn();
            });
            _this.JDOM.captionText.text(_this.groupData[_this.index].caption);
            _this.JDOM.currentIndex.text(`当前索引：${_this.index + 1} / ${_this.groupData.length}`);
        },
        preLoadPic (src, callback) {
            let img = new Image();
            if(!!window.ActiveXObject){
                img.onreadystatechange = function () {
                    if(this.readyState === 'complete') callback();
                }
            }else{
                img.onload = function(){
                    callback();
                }
            }
            img.src = src;
        },
        showNextPrevBtn (id) {
            let _this = this;

            _this.index = _this.getIndexOf(id);
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
                popupPic: this.popupWin.find('img.lightbox-image'),
                picCaptionArea: this.popupWin.find('div.lightbox-pic-caption'),
                nextBtn: this.popupWin.find('span.lightbox-next-btn'),
                prevBtn: this.popupWin.find('span.lightbox-prev-btn'),
                captionText: this.popupWin.find('p.lightbox-pic-desc'),
                currentIndex: this.popupWin.find('span.lightbox-of-index'),
                closeBtn: this.popupWin.find('span.lightbox-close-btn'),
            };
        },
        renderDOM () {
            let dom = `
                <div class="lightbox-pic-view">
                    <span class="lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span>
                    <img alt="" class="lightbox-image">
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
