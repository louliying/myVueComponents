<template>
    <button
        class="ecar-button"
        @click="handleClick"
        :disabled="disabled"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
            type ? 'ecar-button--' + type : '',
            buttonSize ? 'ecar-button--' + buttonSize : '',
            {
                'is-disabled': disabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round
            }
        ]"
    >
        <i class="ecar-icon-loading" v-if="loading" @click="handleInnerClick"></i>
        <i :class="icon" v-if="icon && !loading" @click="handleInnerClick"></i>
        <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
    </button>
</template>
<script>
    export default {
        name: 'ecar-button',

        inject: {
            ecarFormItem: {
                default: ''
            }
        },

        props: {
            type: {
                type: String,
                default: 'defalut'
            },
            size: String,
            icon: {
                type: String,
                default: ''
            },
            nativeType: {
                type: String,
                default: 'Button'
            },
            loading: Boolean,
            disabled: Boolean,
            plain: Boolean,
            autofocus: Boolean,
            round: Boolean
        },

        conputed: {
            _ecarFormItemSize () {
                return (this.ecarFormItem || {}).ecarFomItemSize;
            },
            buttonSize () {
                return this.size || this._ecarFormItemSize || {}.size;
            }
        },

        methods: {
            handleClick (evt) {
                this.$emit('click', evt);
            },
            handleInnerClick (evt) {
                if (this.disabled) {
                    evt.stopPropagation();
                }
            }
        }

    }
</script>