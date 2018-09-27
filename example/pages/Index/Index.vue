<template>
  <div class="wrap">
    <div v-for="(item, key) in components">
      <h3 v-if="key === 0">基础组件：</h3>
      <h3 v-else>业务组件：</h3>
      <ul  class="module" >
            <!--<span class="tag-name">{{key + 1}}.</span>-->
            <li v-for="(item1, key1) in item" class="item" @click.stop="toPage(item1.toLocaleLowerCase())">{{item1}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     components: [
        [
            'EcarButton',
            'EcarInput',
        ],
        [
          'PopWin',
          'SeriesSelect',
          'TimeZone'
        ]
    ]
    }
   },
     methods:{
      toPage(o){
       this.$router.push(o)
      }
    }
}
</script>

<style lang="scss">
  @import '../../../src/sass/reset.css';
  @import '../../../src/sass/base/common.scss';
  .wrap{
    padding:0 rem-calc(30px);
    h3{
      height:  rem-calc(80px);
      line-height:  rem-calc(80px);
      margin:rem-calc(40px) 0 0;
      font-weight:bold;
      font-size:rem-calc(32px);
    }
  }
  .module{
    margin-left:rem-calc(30px);
    color:tomato;
    font-size:rem-calc(26px);
    text-align:center;
    .item{
      height:  rem-calc(80px);
      line-height:  rem-calc(80px);
      display:block;
      text-align:left;
      border-bottom:1px dashed tomato;
    }
  }
</style>
