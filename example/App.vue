<template>
    <div class="page">
        <header class="header" @click="back">
          <span class="back">返回</span>
          <h2>组件库</h2>
        </header>

        <div class="content">
          <transition :name="viewAnimate">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
          </transition>
        </div>

    </div>
</template>

<script>
  export default {
      data () {
        return {
          viewAnimate: ''
        }
      },
      methods: {
        back () {
          this.$router.go(-1);
        }
      },
      watch: {
        '$route': function (val, oldVal) {
          if (val.name !== 'Index') {
            this.viewAnimate = 'slide-in';
          } else {
            this.viewAnimate = 'slide-out';
          }
        }
      }
  };
</script>

<style lang="scss">
    @import '../src/sass/reset.css';
    @import '../src/sass/base/common.scss';
    body{
        padding:0;
        margin:0;
        font-size:rem-calc(14px);
    }
    button, input{
        padding:0;
        margin:0;
        font-size:rem-calc(14px);
    }
    .header {
        width:100%;
        height:rem-calc(120px);
        line-height:rem-calc(120px);
        background:lightseagreen;
        font-size:rem-calc(28px);
        color:#fff;
        overflow:hidden;
        .back{
            float:left;
            width:10%;
            text-align:center;
        }
        h2{
            float:left;
            width:90%;
            text-align:center;
            font-size:rem-calc(38px);
        }
    }
    .content{
        font-size:rem-calc(20px);
    }


    .slide-in-enter-active {
    z-index: 2;
    visibility: visible;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-name: slide-in-enter;
    animation-name: slide-in-enter;
}

.slide-in-leave-active {
    z-index: 1;
    visibility: visible;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-name: slide-in-leave;
    animation-name: slide-in-leave;
}

.slide-out-enter-active {
    z-index: 1;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-name: slide-out-enter;
    animation-name: slide-out-enter;
}

.slide-out-leave-active {
    z-index: 2;
    -webkit-animation-duration: 0.4s;
    animation-duration: 0.4s;
    -webkit-animation-name: slide-out-leave;
    animation-name: slide-out-leave;
}

.slide-in-enter {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}

.slide-out-enter {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}

@-webkit-keyframes slide-in-enter {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slide-in-enter {
    from {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@-webkit-keyframes slide-in-leave {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
}

@keyframes slide-in-leave {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
}

@-webkit-keyframes slide-out-enter {
    from {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@keyframes slide-out-enter {
    from {
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}

@-webkit-keyframes slide-out-leave {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
}

@keyframes slide-out-leave {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
}

</style>
