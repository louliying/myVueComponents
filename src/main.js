// import Vue from 'vue';
import eCarButton from '../packages/Button/index.js';
import eCarInput from '../packages/Input/index.js';

import { popWinFun } from '../packages/PopWin/pop_win.js';
import { ecarPopwin } from '../packages/PopWin/index.js';

import { seriesSelectFn } from '../packages/SeriesSelect/SeriesSelect.js';
import { ecarSeriesSelect } from '../packages/SeriesSelect/index.js';

const components = [
    eCarButton,
    eCarInput,
    ecarPopwin,
    ecarSeriesSelect
];

const install = function (Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$popWinFun = popWinFun;
    Vue.prototype.$seriesSelectFn = seriesSelectFn;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default{
    install,
    eCarButton,
    eCarInput,
    ecarPopwin,
    ecarSeriesSelect
};
