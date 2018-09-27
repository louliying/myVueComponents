<template>
    <div class="button-wrap">
        <p>不同类型的按钮</p>
        <ecar-button type="primary" round @click="showCode(1)">我是primary round Button</ecar-button>
        <ecar-button type="success" disabled @click="showCode(2)">我是success disabled Button</ecar-button>
        <ecar-button type="warning" @click="showCode(3)">我是warning Button</ecar-button>
        <ecar-button type="danger" @click="showCode(4)">我是danger Button</ecar-button>
        <ecar-button @click="showCode(5)">我是default Button</ecar-button>

        <ecar-button type="primary" @click="showCode(9)">
            <strong>我是slot button</strong>
        </ecar-button>

        <p>不同大小的按钮</p>
        <ecar-button type="primary" @click="showCode(6)" size="large" plain round>primary large plain round</ecar-button>
        <ecar-button type="primary" @click="showCode(7)" size="normal">primary normal</ecar-button>
        <ecar-button type="primary" @click="showCode(8)" size="small">primary small</ecar-button>
        <p>代码如下：</p>
        <div class="pre">
            {{ curCode }}
        </div>
    </div>
</template>
<script>
    import eCarButton from "../../../packages/Button/Button.vue";
    export default {
        components: {eCarButton},
        data () {
            return {
                curCode: '',
                code: [
                    '<ecar-button type="primary" round >我是primary round Button</ecar-button>',
                    '<ecar-button type="success" >我是success Button</ecar-button>',
                    '<ecar-button type="warning" >我是warning Button</ecar-button>',
                    '<ecar-button type="danger" >我是danger Button</ecar-button>',
                    '<ecar-button>我是default Button</ecar-button>',
                    '<ecar-button type="primary" size="large" plain round>primary large round plain</ecar-button>',
                    '<ecar-button type="primary" size="normal">primary normal</ecar-button>',
                    '<ecar-button type="primary" size="small">primary small</ecar-button>',
                    '<ecar-button type="primary"><strong>我是slot button</strong></ecar-button>'
                ]
            }
        },
        methods: {
            showCode (index) {
                this.curCode = this.code[index-1];
            }
        }
    }
</script>
<style lang="scss">
    @import '../../../src/sass/reset.css';
    @import '../../../src/sass/base/common.scss';
    .button-wrap{
        padding:rem-calc(20px);
        .pre{
            display: block;
            padding:rem-calc(40px);
            background-color: #f2f2f2;
            margin:rem-calc(20px) 0;
            text-align: left;
            line-height: rem-calc(42px);
            word-wrap:break-word;
            font-size:rem-calc(26px);
        }
        p{
            line-height: rem-calc(40px);
            padding:rem-calc(10px) 0;
        }
    }

    button{
        margin-bottom:rem-calc(30px);
        margin-right:rem-calc(30px);
      }
</style>