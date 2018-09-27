<template>
    <div :class="moveClass">
        <div class="pop-move-cont">
            <header class="pop-hd">
                <span class="goback">返回</span>
                <h2>{{title || '我是默认title'}}</h2>
                <span class="pop-close js-pop-close"><i></i></span>
            </header>

            <div class="pop-body">
                <slot name="pop-body"></slot>
            </div>

            <div class="pop-footer">
                <slot name="pop-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ecar-popwin',
        created () {

        },
        data () {
            return {
                moveClass: 'pop-moveToRight',
                isGoBack: false
            };
        },
        props: [
            'title'
        ],
        methods: {

        },
        mounted () {

        }
    }
</script>
<style lang="scss">
    @import '../../src/sass/reset.css';
    @import '../../src/sass/base/common.scss';
    @import './pop_win.scss';
</style>