<template>
    <ecar-popwin class="content-pop" id="js-mui-pop-module" :title="title" :showType="showType">
      <div class="content-detail-con" slot="pop-body">
        <div class="content-detail-wrap">
          <section class="s-car-selector">
            <div class="car-cont" v-show="isBrandShow">
                <dl id="js-ssbrands">
                    <dd class="form-item" v-for="item in allData" :cid='item.value' @click.stop.prevent="brandsEvent(item.value, $event)">{{ item.text }}</dd>
                </dl>
            </div>

            <div class="car-cont" v-show="isSeriesShow">
                <dl id="js-ssseries">
                    <dd class="form-item" v-for="item in curAllSeries" :cid='item.value' @click="seriesEvent(item.value, $event)">{{ item.text }}</dd>
                </dl>
            </div>
            <div class="car-cont" v-show="isModuleShow">
                <dl id="js-ssmodules">
                    <dd class="form-item" v-for="item in curAllModules" :cid='item.value'>{{ item.text }}</dd>
                </dl>
            </div>

        </section>
        </div>
      </div>
    </ecar-popwin>
</template>
<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import bus from '../../src/bus';
    Vue.use(VueResource);

    import PopWin from "../PopWin/PopWin.vue";
    import * as CXUtil from '../../src/utils/common.js';
    import CXAddEvent from '../../src/utils/event.js';
    var getIndex = CXUtil.getIndex;

    export default {
        name: 'ecar-seriesselect',
        components: {PopWin},
        data () {
            return {
                // 所有的数据
                allData: [],
                 // 当前选中品牌ID
                curBrandId: '',
                // 录前选中的品牌名
                curBrandName: '',
                // 所有的品牌列表
                // allBrands: [],
                // 当前的车系ID
                curSeriesId: '',
                // 当前的车系名
                curSeriesName: '',
                // 当前所有车系列表
                // curAllSeries: [],
                // 当前车款ID
                curModuleId: '',
                // 当前车款名
                curModuleName: '',
                // 当前所有车款列表
                // curAllModules: [],


                curPopTitle: '',
                // 控制三层是否显示
                isBrandShow: false,
                isSeriesShow: false,
                isModuleShow: false,
                curType: 'brand'
            };
        },
        props:['isDebug', 'title', 'showType'],
        computed: {
           /*
           allData: function () {
                return this.allData;
            },
            */
            allBrands: function (){
                let arr = [];
                if (this.allData && this.allData.length > 0) {
                     this.allData.forEach((d, index) => {
                        arr.push({
                            text: d.text,
                            value: d.value
                        });
                    });
                    return arr;
                 }
            },
            curAllSeries: function () {
                let curBrandId = this.curBrandId;
                let arr = [];
                if (this.allData && this.allData.length > 0 && this.allBrands.length) {
                    let indexBrand = getIndex(this.allBrands, curBrandId);

                    if (indexBrand <= -1) {
                        return [];
                    }
                    let tempData = this.allData[indexBrand].children;
                    tempData.length && tempData.forEach((s) => {
                        arr.push({
                            text: s.text,
                            value: s.value
                        });
                    });
                }
                return arr;
            },
            curAllModules: function (){
                let type = this.showType;
                 if (type === 'toModules') {
                    let curBrandId = this.curBrandId;
                    let curSeriesId = this.curSeriesId;
                    let  arr = [];
                    if (this.allData && this.allData.length > 0 && this.allBrands && this.curAllSeries) {
                        let indexBrand = getIndex(this.allBrands, curBrandId);
                        if (this.curAllSeries && this.curAllSeries.length > 0) {
                            let indexSeries = getIndex(this.curAllSeries, curSeriesId);
                            let tempDataSeries = this.allData[indexBrand].children[indexSeries];
                            tempDataSeries.length && tempDataSeries.forEach((m) => {
                                arr.push({
                                    text: m.text,
                                    value: m.value
                                });
                            });
                        }
                    }
                    return arr;
                 }

            },
            curBrandSeriesModule: function () {
                let result = '';
                switch (this.showType) {
                    case 'toBrands':
                        result = this.curBrandName;
                        break;
                    case 'toSeries':
                        result = this.curBrandName + '-' + this.curSeriesName;
                        break;
                    case 'toModules':
                        result = this.curBrandName + '-' + this.curSeriesName + '-' + this.curModuleName;
                        break;
                    default:
                        break;
                }
                return result;
            }
        },
        created () {
            let url = this.isDebug ? '/static/mockdata/seriesSelect.json' : '/static/mockdata/seriesSelect.json';

            this.$http.get(url).then((data) => {
                this.allData = data.body;
                this.isBrandShow = true;
                this.curBrandId = this.allData[0].value;
                let curSeriesId;
                let type = this.showType;
                if (type === 'toSeries' || type === 'toModules') {
                    curSeriesId = this.allData[0].children[0].value;
                }
                this.curType = 'brand';
            });
        },
        methods: {
            // 设置data
            /*
            setData (curBrandId, curSeriesId) {
                this.curAllSeries = [];
                this.curAllModules = [];
                let data = this.allData;

                this.curBrandId = curBrandId;
                let indexBrand = getIndex(this.allBrands, curBrandId);
                if (indexBrand <= -1) {
                    return;
                }
                let tempData = this.allData[indexBrand].children;
                tempData.length && tempData.map((s) => {
                    this.curAllSeries.push({
                        text: s.text,
                        value: s.value
                    });
                });

                if (curSeriesId != void 0) {
                    let indexSeries = getIndex(this.curAllSeries, curSeriesId);
                    this.curSeriesId = curSeriesId;

                    let tempDataSeries = this.allData[indexBrand].children[indexSeries];
                    tempDataSeries.length && tempDataSeries.map((m) => {
                        this.curAllModules.push({
                            text: m.text,
                            value: m.value
                        });
                    });
                }

            },
            */

            // 品牌click
            brandsEvent (curBrandId) {
                /*
                if (!curSeriesId && type === 'toSeries') {

                } else if (!curSeriesId && type === 'toModules') {
                    // 车系点击
                } else {
                    this.isBrandShow = false;
                    this.isSeriesShow = true;
                    this.isModuleShow = false;
                    let dom = event.target;
                    CXUtil.addClass(dom, 'selected-item');
                }
                */
                // 品牌点击
                let dom = event.target;
                let oBrands = CXUtil.$('#js-ssbrands');
                let ddObjs = CXUtil.find(oBrands, 'dd');
                ddObjs.forEach((dom) => {
                    CXUtil.removeClass(dom, 'selected-item');
                });
                CXUtil.addClass(dom, 'selected-item');
                let index = getIndex(this.allBrands, this.curBrandId);
                this.curBrandName = index > -1 ? this.allBrands[index].text : '';
                this.curBrandId = curBrandId;
                if (this.showType !== 'toBrands') {
                    // 不止品牌的, 点击品牌
                    this.isBrandShow = false;
                    this.isSeriesShow = true;
                    this.isModuleShow = false;
                    this.isGoBackShow(true);
                    this.curType = 'series';
                    let oBrands = CXUtil.$('#js-ssseries');
                    let ddObjs = CXUtil.find(oBrands, 'dd');
                    ddObjs.forEach((dom) => {
                        CXUtil.removeClass(dom, 'selected-item');
                    });
                } else {
                    this.comfirmClick();
                    this.isGoBackShow(false);
                    this.curType = 'brand';
                }
            },

            seriesEvent (curSeriesId) {
                // 车系点击
                let dom = event.target;
                let objs = CXUtil.$('#js-ssseries');
                let ddObjs = CXUtil.find(objs, 'dd');
                ddObjs.forEach((dom) => {
                    CXUtil.removeClass(dom, 'selected-item');
                });
                CXUtil.addClass(dom, 'selected-item');
                this.curSeriesId = curSeriesId;
                let index = getIndex(this.curAllSeries, this.curSeriesId);
                this.curSeriesName = index > -1 ? this.curAllSeries[index].text : '';
                if (this.showType === 'toModules') {
                    // 不止品牌的, 不止车系 点击车系
                    this.isBrandShow = false;
                    this.isSeriesShow = false;
                    this.isModuleShow = true;
                    this.curType = 'module';
                    let oBrands = CXUtil.$('#js-ssmodules');
                    let ddObjs = CXUtil.find(oBrands, 'dd');
                    ddObjs.forEach((dom) => {
                        CXUtil.removeClass(dom, 'selected-item');
                    });
                    // this.setData(this.curBrandId, curSeriesId);
                } else {
                    //
                    this.isBrandShow = false;
                    this.isSeriesShow = true;
                    this.isModuleShow = false;
                    this.curType = 'series';
                    this.comfirmClick();
                }
                this.isGoBackShow(true);
            },

            modulesEvent () {
                // 车款点击
                let dom = event.target;
                let objs = CXUtil.$('#js-ssmodules');
                let ddObjs = CXUtil.find(objs, 'dd');
                ddObjs.forEach((dom) => {
                    CXUtil.removeClass(dom, 'selected-item');
                });
                CXUtil.addClass(dom, 'selected-item');
                this.comfirmClick();
                this.isGoBackShow(true);
                this.curType = 'module';
            },

            // 关闭弹层， 输出确认值
            comfirmClick () {
                this.popwin.closePop(() => {
                    bus.$emit('getResult', this.curBrandSeriesModule);
                });
            },

            // 直接 点关闭按钮的
            cancelClick () {

            },
            // 返回上一层
            isGoBackShow (isShow) {
                let dom = CXUtil.$('.goback');
                if (isShow) {
                    CXUtil.addClass(dom, 'show');
                    this.goBackEvent();
                } else {
                    CXUtil.removeClass(dom, 'show');
                }
            },

            // 不goback绑定事件
            goBackEvent () {
                let dom = CXUtil.$('.goback');
                CXAddEvent(dom, 'click', (event) => {
                    // event 就是事件对象
                    let type = this.curType;
                    switch (type) {
                        case 'brand':
                            break;
                        case 'series':
                            this.isBrandShow = true;
                            this.isSeriesShow = false;
                            this.isModuleShow = false;
                            break;
                        case 'module':
                            this.isBrandShow = false;
                            this.isSeriesShow = true;
                            this.isModuleShow = false;
                            break;
                        default:
                            break;
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
     @import '../../src/sass/reset.css';
    @import '../../src/sass/base/common.scss';
    @import './SeriesSelect.scss';
</style>