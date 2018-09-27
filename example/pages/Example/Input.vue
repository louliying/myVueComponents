<template>
    <div class="input-wrap">
        <h3>不同类型的input: text, number, password</h3>
        <p>普通的input</p>
        <ecar-input type="text" v-model="input1" ></ecar-input>
        <p>你输入的是：{{input1}}</p>
        <p>number类型的input</p>
        <ecar-input type="number"  v-model="input2" ></ecar-input>
        <p>你输入的是：{{input2}}</p>
        <p>password类型的input</p>
        <ecar-input type="password"  v-model="input3" ></ecar-input>
        <p>你输入的是：{{input3}}</p>
        <h3>disabled, readonly selectOnFoucs  input们</h3>
        <p>disabled 的 input</p>
        <ecar-input type="text" disabled  v-model="input4" ></ecar-input>
        <!-- <input type="text" disabled="disabled" value="111111" /> -->
        <p>readonly 的 input</p>
        <ecar-input type="text" readonly  v-model="input5" ></ecar-input>
        <p>我是一个foucs就会选中内容的input</p>
        <ecar-input type="text" selectOnFocus  v-model="input6"></ecar-input>
        <p>我是一个autoComplete的input</p>
        <ecar-input type="text" autoComplete></ecar-input>
        <h3>不同大小的input:</h3>
        <p>我是一个small input</p>
        <ecar-input type="text" size="small"></ecar-input>
        <p>我是一个默认大小的input</p>
        <ecar-input type="text"></ecar-input>
        <p>我是一个big input</p>
        <ecar-input type="text" size="large"></ecar-input>
        <h3>有删除按钮的input:</h3>
        <p>我是一个有删除按钮的input</p>
        <ecar-input type="text" clearable v-model="input7">
            <slot name="append"></slot>
        </ecar-input>
    </div>
</template>
<script>
    import eCarInput from "../../../packages/Input/Input.vue";
    export default {
        components: {eCarInput},
        data () {
            return {
                input1: '',
                input2: '',
                input3: '',
                input4: '我是一个disabled 的 input',
                input5: '我是一个只读的input',
                input6: '我是一个foucs就会选中内容的input',
                input7: '',
                curCode: '',
                code: [

                ]
            }
        },
        methods: {
            showCode (index) {
                this.curCode = this.code[index-1];
            },
            focus () {

            }
        },
        mounted () {


        }
    }
</script>
<style lang="scss">
    @import '../../../src/sass/reset.css';
    @import '../../../src/sass/base/common.scss';
    .input-wrap{
        h3{
            margin:rem-calc(30px) 0;
            padding:rem-calc(26px) 0;
            border-bottom:1px dashed #ddd;
            font-weight: 600;
            font-size:rem-calc(30px);
        }
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

</style>