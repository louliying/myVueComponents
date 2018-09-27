<template>
    <div>
        <ecar-button ref="jsSeriesSelect1" type="primary" @click="openSeriesSelect()" >品牌车系</ecar-button>
        <!--<button ref="jsSeriesSelect1" @click="openSeriesSelect()">品牌车系</button>-->
        <ecar-seriesselect :isDebug="true" ref="popwinWrap" :title="curPopTitle" :showType="showType"></ecar-seriesselect>
        <p>你选中的为：{{selectedResult}}</p>
    </div>
</template>
<script>
    import Vue from 'vue';
    import bus from '../../../src/bus.js';

    import eCarButton from "../../../packages/Button/Button.vue";
    import SeriesSelect from "../../../packages/SeriesSelect/SeriesSelect.vue";
    export default {
        components: {SeriesSelect},
        data () {
            return {
                // popwin的标题
                curPopTitle: '',
                // 显示品牌车系车款的哪个
                showType: 'toSeries',
                selectedResult: ''
            }
        },
        created () {
            bus.$on('getResult', (result) => {
                this.selectedResult = result;
            });
        },
        methods: {
            openSeriesSelect () {
                this.showType = 'toSeries';
                /*
                this.seriesSelectFn({
                    showType: 'toSeries'
                });
                */
                let wrapNode = this.$refs.popwinWrap;
                this.curPopTitle = '预购车辆';
                Vue.prototype.popwin = this.$popWinFun({
                    // 弹窗容器  默认是id 名为 #js-mui-pop-module
                    wrapNode: wrapNode.$el,
                    // 弹窗容器标识
                    wrapNodeText: 'wrapNode',
                    // 动画容器
                    animateNode: wrapNode.$el,
                    animateType: 'pop-moveToLeft',
                    isHasHeader: true
                });

            }
        }

    }
</script>
<style lang="scss">
     @import '../../../src/sass/reset.css';
      @import '../../../src/sass/base/common.scss';
      .content{
        padding:rem-calc(20px);
      }
      button{

      }
</style>