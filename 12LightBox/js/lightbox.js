/**
 * Created by Tyler on 2018/12/13 20:47.
 */
(function ($) {
    let LightBox = function () {

        this.popupMask = $(`<div id="G-lightbox-mask"></div>`);
        this.popupWin = $(`<div id="G-lightbox-popup"></div>`);
        this.bodyNode = $(document.body);

        this.renderDOM();
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
        }
    };

    window.LightBox = LightBox;

})(jQuery);
