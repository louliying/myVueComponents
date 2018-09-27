import * as CXUtil from '../../src/utils/common.js';
var removeClass = CXUtil.removeClass;
var addClass = CXUtil.addClass;
var $ = CXUtil.$;

var popW;
/*
    一个页面，可多个popwin
     多个popwin，共用一个popwin html块
*/
// 使用 PopWin 单例模式
var popWinFun = function(options) {
    // 默认配置
    var settings = {
        // 蒙层
        hasMask: true,
        // 蒙层存放的容器
        container: $('body'),
        // 弹窗容器
        wrapNode: $('#js-mui-pop-module'),
        // 弹窗容器标识
        wrapNodeText: 'js-mui-pop-module',
        // 动画容器
        animateNode: $('#js-mui-pop-module'),
        // 动画样式
        animateType: 'pop-moveToRight',
        // 显示class
        showClass: 'show',
        // 屏幕禁止滚动
        deviceTouch: false,
        // 取消
        cancelNode: null,
        // 确定
        confirmNode: null,
        // 蒙层
        maskNode: null,
        isHasHeader: true,
        isHasFooter: false,
        // 显示弹窗之前的回调函数
        showPopBeforeCallback: function() {},
        // 显示弹窗之后的回调函数
        showPopCallback: function() {},
        // 校验函数
        validatePopCallback: function() {
            return true;
        },
        // 确定关闭弹窗之后的回调函数
        closePopCallback: function() {},
        // 取消关闭弹窗之后的回调函数
        cancelPopCallback: function() {}
    };

    Object.assign(settings, options);
    // 单例模式
    if (popW === void 0) {
        popW = new PopWin(settings);
    } else {
        popW.init(settings);
    }

    return popW;
};

class PopWin {
    constructor(settings) {
        this.openedObj = {
            opened: false,
            popName: '',
            maskNode: null
        };
        this.settings = settings;
        this.init(settings);
    }
    init(settings) {
        this.settings = settings;
        // 把setting里的值，挂载到当前popwin对象 上
        this.openedObj = settings;
        this.initRender();
        // 为元素绑定事件
        this.addEvent();
        // 打开popwin
        this.openPop();
    }
    initRender() {
        var _this = this,
            settings = this.settings;

        var $wrapNode = settings.wrapNode;

        $wrapNode.className = " ";
        addClass($wrapNode, 'content-pop');
        addClass($wrapNode, settings.animateType);

        switch (settings.animateType) {
            case 'pop-moveToLeft':
                $wrapNode.style.cssText = 'width:80%; right:0;';
                break;
            case 'pop-moveToRight':
                $wrapNode.style.cssText = 'width:80%; left:0;';
                break;
            case 'pop-moveToTop':
                $wrapNode.style.cssText = 'height:80%; bottom:0;';
                break;
            case 'pop-moveToBottom':
                $wrapNode.style.cssText = 'height:80%; top:0;';
                break;
            default:
                $wrapNode.style.cssText = 'width:80%; left:0;';
                break;
        }
        var oFooter = CXUtil.find($wrapNode, '.pop-footer');
        oFooter = Array.from(oFooter);
        oFooter.map(footer => {
            if (!settings.isHasFooter) {
                footer.style.display = 'none';
            } else {
                footer.style.display = 'block';
            }
        });

        var oHeader = CXUtil.find($wrapNode, '.pop-hd');
        oHeader = Array.from(oHeader);
        oHeader.map(header => {
            if (!settings.isHasHeader) {
                header.style.display = 'none';
            } else {
                header.style.display = 'block';
            }
        });
    }

    addEvent() {

        var _this = this,
            settings = this.settings;

        // 蒙层存放的容器
        var $maskContainer = settings.container,
            // 弹窗容器
            $wrapNode = settings.wrapNode,
            // 侧罩层
            $maskNode = settings.maskNode,
            // 取消节点n
            $cancelNode = settings.cancelNode,
            // 确认节点
            $confirmNode = settings.confirmNode;

        this.openedObj['popName'] = settings.wrapNodeText;
        // 存放当前的popwin
        var popObj = _this.openedObj;
        // 创建侧罩层
        // 如果用户使用时，没有特别指定，为null，则人为创建一个mask层
        if (!$maskNode) {
            $maskNode = document.createElement('div');
            $maskNode.setAttribute('class', 'mui-cover-bg js-mui-cover');
            $maskNode.setAttribute('style', 'display: none;');
            $maskContainer.appendChild($maskNode);
        } else {
            // 如果有，用户指定，上一次PopWin存留着的
            $maskNode = $('.js-mui-cover');
        }
        this.settings.maskNode = $maskNode;
        this.openedObj['maskNode'] = $maskNode;

        // 处理侧罩层可以促发下面层的滚动
        $maskNode.addEventListener('touchmove', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });

        var cancelFun = function() {
            popObj.cancelPopCallback && popObj.cancelPopCallback();
            _this.closePop();
        };

        // 取消节点事件
        $cancelNode && $cancelNode.removeEventListener('click', cancelFun, false);
        $cancelNode && $cancelNode.addEventListener('click', cancelFun, false);

        // var $closeNodeClass = $wrapNode.getElementsByClassName('js-pop-close');
        // $wrapNode.$el 是把vue的某个dom，转成js的dom
        var $closeNodeClass = CXUtil.find($wrapNode, '.js-pop-close');
        if ($closeNodeClass.length > 0) {
            for (var i = 0; i < $closeNodeClass.length; i++) {
                $closeNodeClass[i].removeEventListener('click', cancelFun, false);
                $closeNodeClass[i].addEventListener('click', cancelFun, false);
            };
        };

        var maskFun = function(e) {
            popObj.cancelPopCallback && popObj.cancelPopCallback();
            _this.closePop();
        };
        // 遮罩层节点事件
        $maskNode && $maskNode.removeEventListener('click', maskFun, false);
        $maskNode && $maskNode.addEventListener('click', maskFun, false);

        // 确认节点事件
        var confirmFun = function(e) {
            var status = popObj.validatePopCallback();
            if (status) {
                popObj.closePopCallback && popObj.closePopCallback();
                _this.closePop();
            }
        };
        $confirmNode && $confirmNode.removeEventListener('click', confirmFun, false);
        $confirmNode && $confirmNode.addEventListener('click', confirmFun, false);
    }

    openPop () {
        var _this = this;
        var popObj = this.openedObj;
        var settings = this.settings;

        var $wrapNode = settings.wrapNode,
            // 侧罩层
            $maskNode = settings.maskNode;

        if (popObj.opened) {
            return false;
        }
        popObj.opened = true;

        // 执行打开弹窗前回调函数
        popObj.showPopBeforeCallback && popObj.showPopBeforeCallback();

        this.zIndex = this.zIndex + 2;
        popObj.zIndex = this.zIndex;
        // 为了记录打开弹窗时的滚动位置
        if (popObj.deviceTouch && popObj.hasMask) {
            var lastScrollTop = $(document.body).scrollTop();
            openObj.lastScrollTop = lastScrollTop;
            popObj.lastScrollTop = lastScrollTop;
            // $('html').addClass('sidebar-move');
            let domTemp = $('html');
            addClass(domTemp, 'sidebar-move');
        };

        $wrapNode.style.zIndex = this.zIndex;
        $wrapNode.style.display = 'block';

        $maskNode.style.zIndex = this.zIndex - 1;
        if (popObj.hasMask) {
            $maskNode.style.display = 'block';
        };
        this.openedObj = popObj;
        setTimeout(function() {

            // $wrapNode.$el.setAttribute('class', $wrapNode.$el.getAttribute('class') + ' ' + popObj.showClass);
            addClass($wrapNode, popObj.showClass);
            settings.timer && clearTimeout(settings.timer);
            // 执行打开弹窗后回调函数
            settings.timer = setTimeout(function() {
                popObj.showPopCallback && popObj.showPopCallback();
            }, 300);
        }, 0);
    }

    closePop (callback) {
        var _this = this;
        var settings = this.settings;
        var $wrapNode = settings.wrapNode,
            // 侧罩层
            $maskNode = settings.maskNode;
        var lastScrollTop = this.openedObj.lastScrollTop || 0,
            popObj = this.openedObj,
            _this = this;

        if (this.openedObj) {
            CXUtil.removeClass($wrapNode, settings.showClass);

            settings.timer && clearTimeout(settings.timer);
            settings.timer = setTimeout(function() {
                $maskNode.style.display = 'none';
                if (popObj.deviceTouch && popObj.hasMask) {
                    // $('html').removeClass('sidebar-move');\
                    // CXUtil.removeClass()
                    $(document.body).scrollTop(lastScrollTop);
                }

                $wrapNode.style.display = 'none';
                $maskNode.parentNode.removeChild($maskNode);
                _this.settings.maskNode = null;
                _this.openedObj.opened = false;
                if (callback) {
                    callback.call(_this);
                }
            }, 200);
        }
    }
}

export {
    popWinFun
};
