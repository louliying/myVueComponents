// 参考 element吗代码
// 和common.js重叠， 有时间， 去掉重叠 部分
// import Vue from 'vue';
// const isServer = Vue.prototype.$isServer;
const isServer = false;
const ieVersion = isServer ? 0 : Number(document.documentMode);

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const camelCase = function (name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }.replace(MOZ_HACK_REGEXP, 'Moz$1'));
}

// 去首尾 空格
const trim = function (string) {
    // \uFEFF（Unicode 编码：U+FEFF ）。
    //它是 ES5 新增的空白符，叫「字节次序标记字符（Byte Order Mark）」，也就是 BOM；
    // Unicode3.2 之前，\uFEFF 表示「零宽不换行空格（Zero Width No-Break Space）」；
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

// 判断el  dom元素上， 是否有cls名的className
export function hasClass(el, cls) {
    if (!el || !cls) {
        return false;
    }
    if (cls.indexOf(' ') !== -1) {
        throw new Error('className should not contain space.');
    }
    // <div class="red green blue" id="div1"></div>
    // docuemnt.getElementById('div1').classList   ==>  ['red', 'green', 'blue']
    // ...contains('red')   ==> true
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

// el dom 元素
// 要增加的class名， 可以用空格分隔多个 'red green'
export function addClass (el, cls) {
    if (!el) {
        return;
    }
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!className) {
            continue;
        }
        if (el.classList) {
            // 它不会重复 增加一模一样的class名
            el.classList.add(className);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

// 移除 el dom上， 指定名cls的 class名
// cls 可以是多个， 以 空格 分隔
export function removeClass(el, cls) {
    if (!el || !cls) {
        return;
    }
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i];
        if (!clsName) {
            continue;
        }
        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }

    if (!el.classList) {
        el.className = trim(curClass);
    }
}

// 获取 element 元素上，指定的style样式名
// 这里， 用到了三种
//  element.style[styleName]
// element.currentStyle[styleName]
// document.defaultView.getComputedStyle(element, '')[styleName]
export const getStyle = ieVersion < 9 ? function (element, styleName) {
    if (isServer) {
        return;
    }
    if (!element || !styleName) {
        return null;
    }
    // 驼峰转化
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'styleFloat';
    }
    try {
        switch(styleName) {
            case 'opacity':
                try {
                    return element.filters.item('alpha').opacity / 100;
                } catch (e) {
                    return 1.0;
                }
                break;
            default:
                return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
        }
    } catch(err) {
        return element.style[styleName];
    }
} :  function(element, styleName) {
    if (isServer) {
        return;
    }
    if (!element || !styleName) {
        return null;
    }
    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed ? computed[styleName] : null;
    } catch(e) {
        return element.style[styleName];
    }
};

// element dom对象
// styleName 支持 key: value键值对  对象
export function setStyle (element, styleName, value) {
    if (!element || !styleName) {
        return;
    }
    // styleName 为
    /*
        {
            'color': 'red',
            'float': 'left'
        }
    */
    if (typeof styleName === 'object') {
        for (var prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                // 递归
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        // 驼峰转换
        styleName = camelCase(styleName);
        if (styleName === 'opacity' && ieVersion < 9) {
            element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value *100 +')';
        } else {
            element.style[styleName] = value;
        }
    }
};
