import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'

import {Button,Image} from "vant";
import {Tabbar,TabbarItem} from "vant";
import { Col, Row } from 'vant';
import { Field, CellGroup } from 'vant';
import {Uploader,RadioGroup, Radio } from 'vant'
import {Toast,NavBar,Icon,Form,Grid, GridItem } from "vant";
import { Image as VanImage } from 'vant';
import {Swipe,SwipeItem,Stepper,Popup,Cascader} from "vant";
import {ActionBar,ActionBarIcon,ActionBarButton, Switch ,Checkbox, CheckboxGroup } from "vant";

createApp(App)
    .use(Button)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Image)
    .use(Col)
    .use(Row)
    .use(Field)
    .use(CellGroup)
    .use(Uploader)
    .use(Toast)
    .use(Popup)
    .use(Cascader)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Grid)
    .use(GridItem)
    .use(SwipeItem)
    .use(ActionBar)
    .use(NavBar)
    .use(ActionBarButton)
    .use(ActionBarIcon)
    .use(Icon)
    .use(Switch)
    .use(Swipe)
    .use(Stepper)
    .use(Form)
    .use(VanImage)
    .use(store)
    .use(RadioGroup)
    .use(Radio)
    .use(router)
    .mount('#app')

