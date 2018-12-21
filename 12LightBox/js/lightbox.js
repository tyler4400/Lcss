/**
 * Created by Tyler on 2018/12/13 20:47.
 */
(function ($) {
    let LightBox = function () {
        let  _this = this;

        this.popupMask = $(`<div id="G-lightbox-mask"></div>`);
        this.popupWin = $(`<div id="G-lightbox-popup"></div>`);
        this.bodyNode = $(document.body);

        // this.renderDOM();

        this.groupName = null;
        this.groupData = [];

        this.bodyNode.delegate("div,.js-lightbox,*[data-role=lightbox]", "click", function (e) {
            let curGroupName = $(this).attr('data-group');
            if(curGroupName !== _this.groupName){
                _this.groupName = curGroupName;
                _this.getGroupData();
                console.log(_this.groupData);
            }

            //停止事件冒泡
            e.stopPropagation();
        })
    };

    LightBox.prototype = {
        renderDOM () {
            let dom = `
                <div class="lightbox-pic-view">
                    <span class="lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span>
                    <img src="img/wallhaven-716979.jpg" width="100%" alt="" class="lightbox-image">
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
            let _this = this;
            _this.groupData = [];
            let groupList = this.bodyNode.find(`*[data-group=${this.groupName}]`);
                groupList.each(function () {
                    _this.groupData.push({
                        src: $(this).attr('data-source'),
                        id: $(this).attr('data-id'),
                        caption: $(this).attr('data-caption')
                    });
                });
        }
    };

    window.LightBox = LightBox;

})(jQuery);
