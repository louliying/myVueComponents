// 把agrument[1], argument[2].... 后面的obj， copy到argument[0]上， 并返回
// 只copy arguments上的属性， 不copy， 它原型链上的
// 只用来copy， 一般{}的， 不用来copy 类实例
// 具体 看texs.html
export default function (target) {
    for (let i = 0, j = agruments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            // hasOwnProperty 判断一个对象， 是否有指定的属性值 ， 该属性必须是对象本身的一个直接成员
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    };
    return target;
};
