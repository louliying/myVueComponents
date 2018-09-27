import * as CXUtil from './common.js';

function createXHR () {
    if (typeof XMLHttpRequest !== 'undefined') {
        // IE7+. FF, Chrome, Safari 都支持原生的XHR对象
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        // IE7之前在版本
        /*
        if (typeof arguments.callee.activeXString !== 'string') {
            var versions = ['MSXML2.XMLHttp.6.6', "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i = 0,
                len = versions.length;
            for (; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    throw new Error(ex);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
        */
    } else {
        throw new Error('No XHR object available.');
    }
}

export default function ajax (options) {
    let config = {
        url: '',
        type: 'GET',
        dataType: '',
        data: {},
        success: function () {},
        error: function () {},
        timeout: 4000
    };
    if (!CXUtil.isObject(options)) {
        return;
    }
    Object.assign(config, options);
    let xhr = createXHR();
    /*
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            try {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    if (CXUtil.isFunction(config.success)) {
                        config.success && config.success(xhr.responseText);
                    }
                } else {
                    alert('Request was unsuccessful:' + xhr.status);
                }
            } catch (ex) {
                //
            }
        }
    };
    */
     xhr.timeout = config.timeout || 1000;
     xhr.onload = function () {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                if (CXUtil.isFunction(config.success)) {
                    config.success && config.success(JSON.parse(xhr.responseText));
                }
            } else {
                alert('Request was unsuccessful:' + xhr.status);
            }
    };
    xhr.ontimeout = function () {
        if (CXUtil.isFunction(config.error)) {
            config.error && config.error(xhr.status);
        }
    };
    xhr.onerror = function () {
        if (CXUtil.isFunction(config.error)) {
            config.error && config.error(xhr.status);
        }
    };
    if (config.type === 'GET') {
        let data = config.data;
        for (var item in data) {
            config.url += '&' + item + '=' + data[item];
        }
    }
    xhr.open(config.type, config.url, true);
    if (config.type === 'POST') {
        xhr.send(JSON.stringify(config.data));
    } else {
        xhr.send(null);
    }
}
