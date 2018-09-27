// 是否数组
var isArray = function (arr) {
    // 如果 支持Array.isArray, 则用源生Array.isArray()  这是ES5新增的
    // 如果不支持，则用toString返回值
    return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.call(arr) === '[object Array]';
};
var isBoolean = function (obj) {
    // 1. true 或 false
    // 2. Object.prototype.toString 是'[object Boolean]'
    return obj === true || obj === false || Object.prototype.toString.call(obj) === '[object Boolean]';
};
var isNull = function (obj) {
    // null == null
    // undefined == null
    // null === null
    // undefined !== null
    return obj === null;
};

var isUndefined = function (obj) {
    return obj === void 0;
};
// 是否字符串
var isString = function (str) {
    return Object.prototype.toString.call(str) === '[object String]';
};
// 是否参数
/*
var isArguments = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Arguments]';
};
*/
var isNumber = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
};
// 是否对象
var isObject = function (obj) {
    // 1. typeof 是object
    // 2. !!obj 为true,排除null
    // 3. toString不为array ，排除array。
    return typeof obj === 'object' && !!obj && Object.prototype.toString.call(obj) !== '[object Array]';
};
var isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};
// 对象的keys
/*
var keys = function (obj) {
    if (!isObject(obj)) {
        return [];
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
};
*/
var isNaN = function (obj) {
    // 1. [object Number] 是数字类型
    // 2. 强制转成number后，不相等   console.log("NaN !== +NaN??" + (NaN !== +NaN));
    return isNumber(obj) && obj !== +obj;
};
var isFinite = function (obj) {
    // 1. 是isFinite
    //  2. 强制转成float后，不是NaN
    return isFinite(obj) && !isNaN(parseFloat(obj));
};

// 取得obj里相应key的value值，
// 如果 key的value值 不存在，则设置相应key
/*
    //使用
    var obj = {
                name: "cindy",
                age: 20,
                length:3,
                name:"loulou"
    };
    var setWords = property("words","I love you");
            console.log(setWords(obj));  //I love you
*/
/*
var property = function (key) {
    return function (obj) {
        return obj == null ? void 0 : (obj[key] == null ? (obj[key] = arg) : obj[key])
    }
};
*/

var $ = function (str) {
    return document.querySelector(str);
};

var find = function (domCon, str) {
    var domObjs = [];
    let oElements = domCon.getElementsByTagName('*');
    oElements = Array.from(oElements);
    if (str.indexOf('.') > -1) {
        str = str.replace(/^\./, '');
        oElements.map(e => {
            if (e.className.indexOf(str) > -1) {
                domObjs.push(e);
            }
        });
    } else {
        oElements.map(e => {
            if (e.nodeName.toLowerCase() === str.toLowerCase()) {
                domObjs.push(e);
            }
        });
    }
    return domObjs;
};

/*
var removeClass = function (elem, classname) {
    if (!elem.length) {
        return;
    }
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
//  是否有指定classname
var hasClass = function (elem, classname) {
    if (!elem || !classname) {
        return false;
    }
    if (classname.indexOf(' ') !== -1) {
        throw new Error('classname 不能有空格');
    }
    if (elem.classList) {
        // elem.classList 为 ['class1', 'class2']
        return elem.classList.contains(classname);
    } else {
        return elem.className.indexOf(classname) > -1;
    }
};

// 只支持移除单个class名
/*
var removeClass = function (elem, classname) {
    let strClassName = elem.className.trim('');
    if (!elem.className.length) {
        return;
    }
    let reg = new RegExp(classname, 'g');
    strClassName = strClassName.replace(reg, '');
    elem.className = strClassName;
};
*/
// classname 可多个class 空格分隔
var removeClass = function (elem, classname) {
    if (!elem || !classname) {
        return;
    }
    var curClass = elem.className;
    var classes = classname.split(' ');
    for (var i = 0, j = classes.length; i < j; i++) {
        var curClsname = classes[i];
        if (!curClsname) {
            continue;
        }
        if (elem.classList) {
            elem.classList.remove(curClsname);
        } else if (hasClass('curClsname')) {
            curClass = curClass.replace(curClsname, '');
        }
    }
    if (!elem.classList) {
        elem.className = curClass;
    }
};

// classname 支持空格分隔， 多个
var addClass = function (elem, classname) {
    if (!elem) {
        return;
    }
    var curClass = elem.className;
    var classes = (classname || '').split(' ');
    for (var i = 0, j = classes.length; i < j; i++) {
        var curClsname = classes[i];
        if (!curClsname) {
            continue;
        }
        if (elem.classList) {
            elem.classList.add(classname);
        } else if (!hasClass('className')) {
            curClass += ' ' + classname;
        }
    }
    if (!elem.classList) {
        elem.className = curClass;
    }
};

var getIndex = function (arr, value) {
    value = '' + value;

    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].value === value) {
            return i;
        }
    }
    return -1;
};

export {
    isArray,
    isBoolean,
    isNull,
    isUndefined,
    isString,
    isNumber,
    isObject,
    isFunction,
    $,
    find,
    removeClass,
    addClass,
    getIndex
};
