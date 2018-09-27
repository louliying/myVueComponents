import * as CXUtil from '../../src/utils/common.js';
var popW;

var $ = function () {};
var removeClass = CXUtil.removeClass;
/*
var removeClass = function (elem, classname) {
    // 首先进行初次判断目标元素是否存在类名
    // 如果有开始执行具体操作
    // 如果没有调用控制台报错
    if (elem.className !== '') {
        // 先把目标元素的所有类名保存在数组中
        // 类名的存在是以空格隔开的 所以调用split()方法传入一个空格参数
        var allClassName = elem.className.split(' ');
        // console.log('第一次赋值后class数量为：' + allClassName);
        var result;// 完成操作后保存类名（在以后调用）
        var listClass;// 保存修改过后的数组

        // 1.首先遍历一次所有类名
        for (var i = 0; i < allClassName.length; i++) {
            if (allClassName[i] === classname) {
                // 如果在所有类名里面找到要删除的类名执行如下操作
                // 将对应的类名删除，调用splice方法，第一个参数是要删除元素的索引
                // 第二个参数是删除元素的个数
                allClassName.splice(i, 1);
            }
        };

        // 把 allClassName 数组赋值给 listClass 数组
        listClass = allClassName;
        // 遍历listClass 数组
        for (var j = 0; j < listClass.length; j++) {
            // 把第一个数组元素赋值给 result时要直接赋值不然会出现undefined
            // 之后加上空格因为类名的存在形式就是用空格分隔的
            if (j === 0) {
                result = listClass[j];
                result += ' ';
            } else {
                // 除第一个以外的元素就可以用 加法运算保存在result字符串里面
                result += listClass[j];
                result += ' ';
            }
        }

        // console.log('处理后的listClass数量' + listClass);
        elem.className = result;// 将目标元素的类名重新被 result 覆盖掉
    } else {
        // console.log('目标元素没有存在的类名');
    };
};
*/

var popWinFun = function (options) {
    // 默认配置
    var settings = {
        // 蒙层
        hasMask: true,
        // 出发弹窗元素
        triggerNode: 'body',
        // 蒙层存放的容器
        container: '.js-flex-wrap-body',
        // 触发发弹窗目标元素（用于事件委托）
        triggerTargetNode: null,
        // 弹窗容器
        wrapNode: '.js-mui-pop-module',
        // 弹窗容器标识
        wrapNodeText: '',
        // 动画容器
        animateNode: '.js-mui-pop-module',
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
        // 显示弹窗之前的回调函数
        showPopBeforeCallback: function () {
        },
        // 显示弹窗之后的回调函数
        showPopCallback: function () {
        },
        // 校验函数
        validatePopCallback: function () {
            return true;
        },
        // 确定关闭弹窗之后的回调函数
        closePopCallback: function () {
        },
        // 取消关闭弹窗之后的回调函数
        cancelPopCallback: function () {
        }
    };
    for (var i in settings) {
        settings[i] = options[i] || settings[i];
    };

    if (popW === undefined) {
        popW = new PopWin(settings);
    } else {
        popW.init(settings);
    }

    return popW;
};

function PopWin (settings) {
    this.init(settings);
};

PopWin.prototype = {
    init: function (settings) {
        var that = this;
        // this.popsObj = {};
        if (this.popsObj[settings.wrapNodeText]) {
            this.popsObj[settings.wrapNodeText] = {};
        }
        // 保存页面上所有弹窗配置
        this.popsObj[settings.wrapNodeText] = settings;
        // 打开状态
        this.popsObj['opened'] = false;
        // 为元素绑定事件
        that.addEvent(settings);
        this.open(settings.wrapNodeText);
        //settings.triggerNode.click();
    },
    // 弹窗配置集合
    popsObj: {},
    // 打开中的弹窗及属性
    openedObj: [],
    // 事件绑定
    addEvent: function (settings) {
        var that = this,
            // 蒙层存放的容器
            $maskContainer = settings.container,
            // 弹窗容器
            $wrapNode = settings.wrapNode,
            // 侧罩层
            $maskNode = settings.maskNode,
            // 触发节点
            $triggerNode = settings.triggerNode,
            // 取消节点n
            $cancelNode = settings.cancelNode,
            // 确认节点
            $confirmNode = settings.confirmNode,
            // 相应的单个弹窗配置
            popObj = that.popsObj[settings.wrapNodeText];
            // 蒙层存放容器
            // $maskContainer = $(document.body);
        if (!settings.wrapNodeText) {
            return;
        }
        // 创建侧罩层
        console.log('cccccccccccccccccccccc');
        console.log($maskNode);
        if (!$maskNode) {
            $maskNode = document.createElement('div');
            $maskNode.setAttribute('class', 'mui-cover-bg js-mui-cover');
            $maskNode.setAttribute('style', 'display: none;');
            $maskContainer.appendChild($maskNode);
            that.popsObj[settings.wrapNodeText]['maskNode'] = $maskNode;
        }
        /*
        if (!$maskNode ) {
            if (!('.js-mui-cover').length) {
                // 没有mask层
                $maskNode = document.createElement('div');
                $maskNode.setAttribute('class', 'mui-cover-bg js-mui-cover');
                $maskNode.setAttribute('style', 'display: none;');
                $maskContainer.appendChild($maskNode);
            } else {
                // 有mask 层了
                $maskNode = $('.js-mui-cover');
            }
            that.popsObj[settings.wrapNodeText]['maskNode'] = $maskNode;
        }
        */

        // 处理侧罩层可以促发下面层的滚动
        $maskNode.addEventListener('touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        var openFun = function () {
            that.openPop(settings, $wrapNode, $maskNode, popObj, that, $(this));
        };

        // 触发节点事件
        if ($triggerNode && $triggerNode instanceof Array) {
            for (var j = 0; j < $triggerNode.length; j++) {
                $triggerNode[j].removeEventListener('click', openFun, false);
                $triggerNode[j].addEventListener('click', openFun, false);
            };
        } else {
            if ($triggerNode instanceof Object) {
                $triggerNode.addEventListener('click', openFun);
            }
        }

        var cancelFun = function () {
            popObj.cancelPopCallback && popObj.cancelPopCallback();
            that.closePop(settings);
        };

        // 取消节点事件
        $cancelNode && $cancelNode.removeEventListener('click', cancelFun, false);
        $cancelNode && $cancelNode.addEventListener('click', cancelFun, false);

        var $closeNodeClass = $wrapNode.$el.getElementsByClassName('js-pop-close');
        if ($closeNodeClass.length > 0) {
            for (var i = 0; i < $closeNodeClass.length; i++) {
                $closeNodeClass[i].removeEventListener('click', cancelFun, false);
                $closeNodeClass[i].addEventListener('click', cancelFun, false);
            };
        };

        var maskFun = function (e) {
            // var target = $(e.target);
            // if (target.closest(popObj.animateNode).length) {
            //  return;
            // }
            popObj.cancelPopCallback && popObj.cancelPopCallback();
            // that.closePop(settings);
        };
        // 遮罩层节点事件
        $maskNode && $maskNode.removeEventListener('click', maskFun, false);
        $maskNode && $maskNode.addEventListener('click', maskFun, false);

        // 确认节点事件
        var confirmFun = function (e) {
            var status = popObj.validatePopCallback();
            if (status) {
                popObj.closePopCallback && popObj.closePopCallback();
                // that.closePop(settings);
            }
        };
        $confirmNode && $confirmNode.removeEventListener('click', confirmFun, false);
        $confirmNode && $confirmNode.addEventListener('click', confirmFun, false);
    },
    open: function (popName) {
        var popObj = this.popsObj[popName];
        popObj.opened = false;
        this.openPop({}, null, null, popObj, this, null);
    },
    // 打开弹窗
    openPop: function (settings, $wrapNode, $maskNode, popObj, that, triggerNode) {
        var that = this;
        if (popObj.opened) {
            return false;
        }
        popObj.opened = true;

        // 执行打开弹窗前回调函数
        popObj.showPopBeforeCallback && popObj.showPopBeforeCallback(triggerNode);
        $wrapNode = $wrapNode || popObj.wrapNode;
        $maskNode = $maskNode || popObj.maskNode;
        triggerNode = triggerNode || popObj.triggerNode;

        that.zIndex.value = that.zIndex.value + 2;
        var openObj = {
            name: settings.wrapNode || popObj.wrapNode,
            nameText: settings.wrapNodeText || popObj.wrapNodeText,
            zIndex: that.zIndex.value
        };
        // 为了记录打开弹窗时的滚动位置
        if (popObj.deviceTouch && popObj.hasMask) {
            var lastScrollTop = $(document.body).scrollTop();
            openObj.lastScrollTop = lastScrollTop;
            // $('html').addClass('sidebar-move');
            let domTemp = CXUtil.$('html');
            CXUtil.addClass(domTemp, 'sidebar-move');
        };
        console.log('111111111111, openObj:');
        console.log(openObj);
        that.openedObj.push(openObj);
        console.log('222222222, that.openedOb:');
        console.log(that.openedObj);

        $wrapNode.$el.style.zIndex = that.zIndex.value;
        $wrapNode.$el.style.display = 'block';

        $maskNode.style.zIndex = that.zIndex.value - 1;
        if (popObj.hasMask) {
            $maskNode.style.display = 'block';
        };
        setTimeout(function () {
            $wrapNode.$el.setAttribute('class', $wrapNode.$el.getAttribute('class') + ' ' + popObj.showClass);
            settings.timer && clearTimeout(settings.timer);
            // 执行打开弹窗后回调函数
            settings.timer = setTimeout(function () {
                popObj.showPopCallback && popObj.showPopCallback(triggerNode);
            }, 300);
        }, 0);
    },
    // 关闭弹窗
    closePop: function (settings, callback) {
        var that = this;
        console.log('333333333 that.openedObj:');
        console.log(that.openedObj);
        var arrLen = this.openedObj.length,
        $wrapNodeName = this.openedObj[arrLen - 1].nameText,
        $wrapNode = this.openedObj[arrLen - 1].name.$el,
        lastScrollTop = this.openedObj[arrLen - 1].name.$el.lastScrollTop || 0,
        popObj = this.popsObj[$wrapNodeName],
        that = this,
        $maskNode = this.popsObj[$wrapNodeName]['maskNode'];

        if (this.openedObj.length > 0) {
            CXUtil.removeClass($wrapNode, settings.showClass);
            this.openedObj.splice(this.openedObj.length - 1, 1);

            settings.timer && clearTimeout(settings.timer);
            settings.timer = setTimeout(function () {
                var newArrLen = that.openedObj.length;

                if (newArrLen <= 0) {
                    $maskNode.style.display = 'none';
                } else {
                    $wrapNodeName = that.openedObj[newArrLen - 1].nameText;
                    // var newPopObj = that.popsObj[$wrapNodeName];
                    // if (newPopObj.hasMask) {
                    //  $maskNode.style.zIndex = that.openedObj[newArrLen - 1].zIndex - 1;
                    // } else {
                    //  $maskNode.style.display = 'none';
                    // }
                    $maskNode.style.zIndex = that.openedObj[newArrLen - 1].zIndex - 1;
                    $maskNode.style.display = 'none';
                }

                if (popObj.deviceTouch && popObj.hasMask) {
                    // $('html').removeClass('sidebar-move');\
                    // CXUtil.removeClass()
                    $(document.body).scrollTop(lastScrollTop);
                }

                $wrapNode.style.display = 'none';
                $maskNode.parentNode.removeChild($maskNode);
                popObj.opened = false;
                if (callback) {
                    callback.call();
                }
            }, 200);
        }
    },
    // 关闭当前弹窗
    closeCurPop: function (objName) {
        var arrLen = this.openedObj.length;
        if (arrLen <= 0) {
            return;
        }

        var $wrapNodeName = objName || this.openedObj[arrLen - 1].name,
        popObj = this.popsObj[$wrapNodeName];
        if (popObj) {
            // this.closePop(popObj);
        }
    },
    zIndex: {
        value: 50
    }
};

export {
    popWinFun
};
