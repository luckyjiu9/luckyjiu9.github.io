import Vue from 'vue'
import {
  Button,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  List,
  Tabbar,
  TabbarItem,
  Icon,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Lazyload,
  Image as VanImage,
  Search,
  NavBar,
  Notify,
  Tab, Tabs,
  Dialog,
  Overlay

} from 'vant';
Vue.use(Tab);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(Notify);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(Lazyload, {
  lazyComponent: true,
  loading: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2027000970,2576204576&fm=26&gp=0.jpg'
});