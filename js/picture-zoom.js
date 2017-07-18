/**
 * Created by yilh on 2017/2/18.
 */


/**
 * 获取窗体鼠标坐标（X、Y）
 * active       当前图片
 * area         当前图片选中区域
 * parent       当前图片父级容器
 * large        放大区域父级容器
 * times        图片放大倍数
 * *********************************************************
 * 放大区域父级容器大小设置： large = area * times
 * 放大区域图片大小设置： largeImg = active * times
 * */
var pictureZoom = function(){
    window.me = this;
    this.set = {
        area: $('.area'),
        active:  $('.active'),
        parent: $('.initial'),
        large: $('.large'),
        times: 3
    };
    this.init();
};
pictureZoom.prototype = {
    init: function () {
        $('.initial').on('mouseenter mousemove', this.mouseEvent).on('mouseleave',this.mouseLeave);
    },
    mouseEvent: function (e) {
        e.preventDefault();
        //提取重复字段
        var target = $(e.target).parent();
        var picWidth = me.set.active.width();
        var picHeight = me.set.active.height();
        var areaWidth = parseFloat(me.set.area.css('width').replace(/px/, ''));
        var areaHeight = parseFloat(me.set.area.css('height').replace(/px/, ''));
        var left =  parseFloat(me.set.area.css('left').replace(/px/, ''));
        var top =  parseFloat(me.set.area.css('top').replace(/px/, ''));
        if (!$(target) || $(target).attr('class') != $(me.set.parent).attr('class')) {
            me.set.area.hide();
            me.set.large.hide();
            return;
        }
        me.set.area.show();
        me.set.large.show();
        var x = e.clientX;
        var y = e.clientY;
        //左边界
        var areaMaxLeftX = left;
        var mouseMaxLeftX = $(target).offset().left + left + areaWidth / 2;
        //右边界
        var areaMaxRightX = left + areaWidth;
        var mouseMaxRightX = $(target).offset().left + left + areaWidth / 2;
        //上边界
        var areaMaxTopY = top;
        var mouseMaxTopY = $(target).offset().top + top + areaHeight / 2;
        //下边界
        var areaMaxBottomY = top + areaHeight;
        var mouseMaxBottomY = $(target).offset().top + top + areaHeight / 2;
        //左上角
        if (areaMaxLeftX <= 0 && x <= mouseMaxLeftX && areaMaxTopY <= 0 && y <= mouseMaxTopY) {
            me.set.area.css({'left': 0, 'top': 0});
        }
        //左下角
        else if (areaMaxLeftX <= 0 && x <= mouseMaxLeftX && areaMaxBottomY >= picHeight && y >= mouseMaxBottomY) {
            me.set.area.css({'left': 0, 'top': picHeight - areaHeight});
        }
        //右上角
        else if (areaMaxRightX >= picWidth && x >= mouseMaxRightX && areaMaxTopY <= 0 && y <= mouseMaxTopY) {
            me.set.area.css({'left': picWidth - areaWidth, 'top': 0});
        }
        //右下角
        else if (areaMaxRightX >= picWidth && x >= mouseMaxRightX && areaMaxBottomY >= picHeight && y >= mouseMaxBottomY) {
            me.set.area.css({'left': picWidth - areaWidth, 'top': picHeight - areaHeight});
        }
        //最左边
        else if (areaMaxLeftX <= 0 && x <= mouseMaxLeftX) {
            me.set.area.css({'left': 0, 'top': y - $(target).offset().top - areaHeight / 2});
        }
        //最右边
        else if (areaMaxRightX >= picWidth && x >= mouseMaxRightX) {
            me.set.area.css({'left': picWidth - areaWidth, 'top': y - $(target).offset().top - areaHeight / 2});
        }
        //最上边
        else if (areaMaxTopY <= 0 && y <= mouseMaxTopY) {
            me.set.area.css({'left': x - $(target).offset().left - areaWidth / 2, 'top': 0});
        }
        //最下边
        else if (areaMaxBottomY >= picHeight && y >= mouseMaxBottomY) {
            me.set.area.css({'left': x - $(target).offset().left - areaWidth / 2, 'top': picHeight - areaHeight});
        }
        else {
            me.set.area.css({'left': x - $(target).offset().left - areaWidth / 2,'top': y - $(target).offset().top - areaHeight / 2});
        }
        //放大区域父级容器和图片大小设置
        var largeWidth = me.set.area.width() * me.set.times;
        var largeImgWidth = me.set.active.width() * me.set.times;
        var largeImgLeft = -parseFloat(me.set.area.css('left')) * me.set.times;
        var largeImgTop = -parseFloat(me.set.area.css('top')) * me.set.times;
        me.set.large.css({'width':  largeWidth,'height': largeWidth});
        me.set.large.children('img').css({'width':  largeImgWidth,'left': largeImgLeft,'top': largeImgTop});
    },
    mouseLeave: function(e){
        me.set.area.hide();
        me.set.large.hide();
    }
};
new pictureZoom();