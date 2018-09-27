<template>
    <button
        class="ecar-button"
        @click="handleClick"
        :type="nativeButtonType"
        :disabled="disabled"
        :class="[
        type ? 'ecar-button-' + type : '',
        buttonSize ? 'ecar-button-' + buttonSize : '',
        {
          'is-round': round,
          'is-plain': plain,
          'is-disabled': disabled
        }
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
    /*
         * ecar-button
         * @desc 按钮
         * @param nativeButtonType {string} button 原生类型
         * @param type {string} 样式类型
         * @param disabled {boolean} 是否为禁用状态
         * @param size {string} 按钮大小： 大中小三种
    */
    export default {
        name: 'ecar-button',
        props: {
            nativeButtonType: {
                type: String,
                default: 'button'
            },
            // 按钮的类型
            type: {
                type: String,
                default: 'default',
                validator (value) {
                    return [
                        'default',
                        'primary',
                        'success',
                        'warning',
                        'danger'
                    ].indexOf(value) > -1
                }
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 按钮大小  large normal small
            size: String,
            // 是否圆角
            round:Boolean,
            // 是否是素按钮
            plain: Boolean
        },
        created () {
            // console.log(this.nativeButtonType);
        },
        computed: {
          buttonSize () {
            return this.size || {}.size;
          }
        },
        methods: {
          handleClick (evt) {
            console.log(evt.target);
            this.$emit('click', evt);
          },
          // 不能在slot的dom里被触发
          handleInnerClick (evt) {
            if (this.disabled) {
              evt.stopPropagation();
            }
            this.handleClick();
          }
        }
    }
</script>
<style lang="scss">
    @import '../../src/sass/reset.css';
    @import '../../src/sass/base/common.scss';
    .ecar-button{
        -webkit-appearance: none;
       -moz-appearance: none;
        appearance: none;
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        color: inherit;
        display: block;
        font-size: rem-calc(24px);
        height: rem-calc(60px);
        padding: 0 rem-calc(16px);
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        &:after{
          background-color: #000;
          content: " ";
          opacity: 0;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        &.is-round{
            border-radius:rem-calc(30px);
        }
        &.is-disabled{
          opacity:0.6;
        }
        &-default{
          color: #656b79;
          background-color: #f6f8fa;
          box-shadow: 0 0 1px #b8bbbf;
          &.is-plain{
            border: 1px solid #5a5a5a;
            background-color: transparent;
            box-shadow: none;
            color: #5a5a5a
          }
        }
        &-primary {
            background-color: #0084ff;
            border: 1px solid #0084ff;
            color: #fff;
            &:active {
              background-color: #0084ff;
              color: #fff;
            }
            &.is-plain{
              border: 1px solid #0084ff;
              background-color: transparent;
              color: #0084ff
            }
          }
          &-success{
            background:#4caf50;
            border: 1px solid #4caf50;
            color: #fff;
            &.is-plain{
              border: 1px solid #4caf50;
              background-color: transparent;
              color: #4caf50
            }
          }
          &-info {
            background-color: #f7f7f7;
            border: 1px solid #f7f7f7;
            color: #222;
            &:active {
              background-color: #f7f7f7;
              color: #222;
            }
            &.is-plain{
              border: 1px solid #f7f7f7;
              background-color: transparent;
              color: #f7f7f7
            }
          }
          &-warning {
            background-color: #ffc107;
            border: 1px solid #ffc107;
            color: #fff;
            &:active {
              background-color: #ffc107;
              color: #fff;
            }
            &.is-plain{
              border: 1px solid #ffc107;
              background-color: transparent;
              color: #ffc107
            }
          }
          &-danger {
            color: #fff;
            background-color: #ef4f4f;
            &.is-plain{
              border: 1px solid #ef4f4f;
              background-color: transparent;
              color: #ef4f4f
            }
          }

          /*  大小 */
          &-large{
            display:block;
            width:100%;
          }
          &-normal{
            display:inline-block;
            padding:0 rem-calc(12px);
          }
          &-small{
            display: inline-block;
            font-size: rem-calc(14px);
            padding: 0 rem-calc(12px);
            height: rem-calc(33px);
          }
    }
</style>
