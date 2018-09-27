import Index from './pages/Index/Index.vue';
import PopWin from './pages/Example/PopWin.vue';
import SeriesSelect from './pages/Example/SeriesSelect.vue';
import EcarButton from './pages/Example/Button.vue';
import EcarInput from './pages/Example/Input.vue';

export default {
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/popwin',
            name: 'PopWin',
            component: PopWin
        },
        {
            path: '/seriesSelect',
            name: 'SeriesSelect',
            component: SeriesSelect
        },
        {
            path: '/ecarButton',
            name: 'EcarButton',
            component: EcarButton
        },
        {
            path: '/ecarInput',
            name: 'EcarInput',
            component: EcarInput
        }
    ]
};
