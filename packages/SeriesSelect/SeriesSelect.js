import * as CXUtil from '../../src/utils/common.js';
import CXAjax from '../../src/utils/ajax.js';
import CXAddEvent from '../../src/utils/event.js';

let $ = CXUtil.$;

class SeriesSelect {
    constructor(options) {
        /*
            options = {
                // debug模式，不请http请求取数据，走mockdata
                isDebug: true,
                // 到品牌，车系，车款的哪个
                toLevel: 'series',
                // 有一个，说明是品牌车系车款一个接口，有三个，说明是各自一个接口
                urls:['./mockdata'],
                // mock时的url
                mocakUrl: ['./mockdata']
            }
        */
        this.settings = {
            // isDebug: true,
            // mockUrl: '/static/mockdata/seriesSelect.json',
            car: '.js-car',
            brand: '#js-ssbrands',
            series: '#js-ssseries',
            modules: '#js-ssmodules',
            // 数据
            allData: []
        };
        this.init(options);
    }

    init (options) {
        let _this = this;
        Object.assign(this.settings, options);
       /*
       this.initData( (data) => {
            console.log(data);
        });
        */
        // this.renderData ();
        this.bindEvent(this.settings.showType);
    }
    // 取数据
    initData (cb) {
        let _this = this;
        let url = _this.settings.isDebug && _this.settings.mockUrl ? _this.settings.mockUrl : '';
        CXAjax({
            url: url,
            success: function(data){
                cb(data);
            }
        });
    }
    // 数据渲染DOM
    renderData (data) {

    }

    // 绑定事件
    bindEvent (showType) {
        switch (showType) {
            case 'toBrand':
                // 只到品牌
                break;
            case 'toSeries':
                this.bindBrandsEvent();
                break;
            case 'toModule':
                this.bindSeriesEvent();
        }
    }

    // 品牌click
    bindBrandsEvent () {
        let domBrands = $(this.settings.brand);
        let objs = CXUtil.find(domBrands, 'dd');
        objs.map((obj) => {
            CXAddEvent(obj, 'click', function (event) {
                // event 就是事件对象
                let curDD = event.target || event.srcElement;
                let curBrandId = curDD.getAttribute('cid');
                console.log('event event event');
                console.log(event);
            })
        });
    }

    // 车系click
    bindSeriesEvent () {
        let domSeries = $(this.settings.series);
        let objs = CXUtil.find(domSeries, 'dd');
        objs.map((obj) => {
            CXAddEvent(obj, 'click', function () {
                console.log('b');
            })
        });
    }
}

let seriesSelectInstance;
var seriesSelectFn = function (options) {
    if (seriesSelectInstance == void 0) {
        seriesSelectInstance = new SeriesSelect(options);
    } else {
        seriesSelectInstance.init(options);
    }
}
export {
    seriesSelectFn
};