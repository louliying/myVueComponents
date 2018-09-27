<template>
    <span class="ecar-input " ref="ecar-input"
        :class="[
            inputSize ? 'ecar-input-' + inputSize : ' ',
            {
                'is-disabled': disabled,
                'is-readonly': readonly,
                'ecar-input--prepend': $slots.prepend,
                'ecar-input--append': $slots.append
            }
        ]"r
    >
        <span class="ecar-input-prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </span>
        <input ref="input" class="ecar-input-inner"
             :type="type"
             v-model="localValue"
             :disabled="disabled"
             :readonly="readonly"
             :autoComplete="autoComplete"
             :clearable="clearable"
             @input="handleInput"
             v-on="listeners"
             @focus="focus"
             @blur="blur"
             @change="handleChange"
             />
        <span class="ecar-input-append" v-if="$slots.append || clearable">
            <slot name="append"></slot>
            <i v-show="showClear" class="ecar-input-clear" @click="clear"></i>
        </span>
    </span>
</template>
<script>
    const EVENTS = ['click', 'focus', 'blur', 'keyup', 'keydown', 'keypress'];

    export default {
        name: 'ecar-input',
        props: {
            type: {
                type: String,
                default: 'text',
                validator (val) {
                    return [
                        'text',
                        'password',
                        'button',
                        'number'
                    ].includes(val)
                }
            },
            // 不可用
            disabled: Boolean,
            // 只读
            readonly: Boolean,
            // focus后，就选择里面的内容
            selectOnFocus: Boolean,
             // 按钮大小  large normal small
            size: String,
            autoComplete: {
                type: String,
                default: 'off'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number],
                default: ''
            }

        },
        data () {
            const listeners = EVENTS.reduce((res, type) =>
                ((res[type] = event => this.$emit(type, event)), res),
                {}
            )
            return {
                localValue: this.value,
                focused: false,
                listeners
            }
        },
        computed: {
            inputSize () {
                return this.size || {}.size;
            },

            showClear () {
                return this.clearable && this.localValue !== '' && this.focused;
            }
        },
        watch:{
            value(val){
                this.localValue = val;
            }
        },
        methods:{
            handleInput (e) {
                if (this.localValue !== this.value) {
                    this.$emit('input', e.target.value, e);
                }
            },
            focus () {
                this.focused = true;
            },

            blur () {
                this.focused = false;
            },

            clear () {
                this.$emit('input', '');
                this.$emit('change', '');
                this.focus();
            },

            handleChange (e) {
                this.$emit('change', e.target.value);
            }
        },
        mounted () {
            if (this.selectOnFocus) {
                this.focused = true;
                this.$on('focus', e =>{
                    e.target.select();
                })
            }
        }
    };
</script>
<style lang="scss">
    @import '../../src/sass/reset.css';
    @import '../../src/sass/base/common.scss';
    .ecar-input{
        position:relative;
        font-size: rem-calc(20px);
        .ecar-input-inner{
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 60%;
        }
        &-small{
             .ecar-input-inner{
                    width:40%;
             }
        }
        &-large{
            .ecar-input-inner{
                    display:block;
                    width:100%;
             }
        }
        .ecar-input-append{
            position:absolute;
            right:rem-calc(10px);
            top:rem-calc(6px);
        }
        .ecar-input-clear{
            display:block;
            width: rem-calc(22px);
            height:rem-calc(22px);
            background: url(img/icon-close.png);
            background-size:100%;
        }
    }

    .is-disabled,
    .is-readonly {
        .ecar-input-inner{
            background-color: #f5f7fa;
            border-color: #e4e7ed;
            color: #c0c4cc;
            cursor: not-allowed;
            opacity:1;
        }
    }


</style>