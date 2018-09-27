<template>
  <div ref="containerNodeRef">
      <ecar-button ref="jsShowPipWin1" type="warning" size="large" @click.native="openPopWin('toTop')" >我是从下到上弹层，我没有header</ecar-button>
      <ecar-button ref="jsShowPipWin2" type="success" @click="openPopWin('toRight')" >我是从左到右弹层，我有footer</ecar-button>
      <!--<button ref="jsShowPipWin2" @click="openPopWin('toRight')">我是从左到右弹层，我有footer</button>-->
      <ecar-button ref="jsShowPipWin3"  round @click="openPopWin('toBottom')" >我是从上到下弹层</ecar-button>
      <!--<button ref="jsShowPipWin3" @click="openPopWin('toBottom')">我是从上到下弹层</button>-->
      <ecar-button ref="jsShowPipWin4" type="primary" round plain @click="openPopWin('toLeft')" >我是从右到左弹层</ecar-button>
      <!--<button ref="jsShowPipWin4" @click="openPopWin('toLeft')">我是从右到左弹层</button>-->
      <!-- 默认容器为 id="js-mui-pop-module"-->
      <ecar-popwin class="content-pop" ref="wrapNode" :title="curPopTitle" id="js-mui-pop-module">
      <div class="content-detail-con" slot="pop-body">
        <div class="content-detail-wrap">
          <p>{{curPopContent}}</p>
        </div>
      </div>
      <div slot="pop-footer">
          <button class="finish-btn" ref="jsfinishbtn">完成</button>
      </div>
    </ecar-popwin>
  </div>
</template>

<script>
import eCarButton from "../../../packages/Button/Button.vue";
import PopWin from "../../../packages/PopWin/PopWin.vue";

export default {
    components: {eCarButton, PopWin},
    data() {
        return {
          type: 'button',
          popwins: [
            {
              popTitle: 'cindy1',
              moveMode: 'pop-moveToTop'
            },
            {
              popTitle: 'cindy2',
              moveMode: 'pop-moveToRight'
            },
            {
              popTitle: 'cindy3',
              moveMode: 'pop-moveToBottom'
            },
            {
              popTitle: 'cindy4',
              moveMode: 'pop-moveToLeft'
            }
          ],
          curPopTitle: '',
          curMoveMode: '',
          curPopContent: '',
          isHasHeader: true,
          isHasFooter: false,
          isHasMask: true
        }
  },
  created () {
      this.curPopTitle = this.popwins[0].popTitle;
      this.curMoveMode = this.popwins[0].moveMode;
  },
  methods: {
    openPopWin (type) {
      let wrapNode = this.$refs.wrapNode,
        containerNodeRef = this.$refs.containerNodeRef,
        _this = this,
        confirmNode = null;
      this.isHasFooter = false;
      this.isHasHeader = true;
      this.isHasMask = true;
      let triNode;
      switch(type) {
        case 'toTop':
          triNode = this.$refs.jsShowPipWin1;
          this.curPopTitle = this.popwins[0].popTitle;
          this.curMoveMode = this.popwins[0].moveMode;
          this.isHasHeader = false;
          break;
        case 'toRight':
          triNode = this.$refs.jsShowPipWin2;
          this.curPopTitle = this.popwins[1].popTitle;
          this.curMoveMode = this.popwins[1].moveMode;
          this.isHasFooter = true;
          confirmNode = this.$refs.jsfinishbtn;
          break;
        case 'toBottom':
          triNode = this.$refs.jsShowPipWin3;
          this.curPopTitle = this.popwins[2].popTitle;
          this.curMoveMode = this.popwins[2].moveMode;
          break;
        case 'toLeft':
          triNode = this.$refs.jsShowPipWin4;
          this.curPopTitle = this.popwins[3].popTitle;
          this.curMoveMode = this.popwins[3].moveMode;
          break;
        default:
          break;
      };
    this.curPopContent = triNode.innerHTML ? triNode.innerHTML : triNode.$el.childNodes[0].innerHTML;
    console.log(this.curPopContent);
    let curMoveMode = this.curMoveMode;
    this.$popWinFun({
        // 蒙层存放的容器
        // 这个参数是必须的，默认容器是body
        container: containerNodeRef,
        // 弹窗容器  默认是id 名为 #js-mui-pop-module
        wrapNode: wrapNode.$el,
        // 弹窗容器标识
        wrapNodeText: 'wrapNode',
        // 动画容器
        animateNode: wrapNode.$el,
        animateType: this.curMoveMode,
        hasMask: this.isHasMask,
        isHasHeader: this.isHasHeader,
        isHasFooter: this.isHasFooter,
        confirmNode: confirmNode,
        showPopCallback: function () {
          /*
          _this.$nextTick(() => {

          });
          */
        }
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
    margin-bottom:rem-calc(30px);
  }
</style>
