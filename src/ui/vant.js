import Vue from 'vue'
import {
  Button,
  SwipeCell,
  Toast,
  PasswordInput, NumberKeyboard,
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
  Overlay,
  Sku,
  Card,
  Empty,
  SubmitBar,
  AddressList,
  ContactCard,
  ContactList,
  ContactEdit,
  popup,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Field,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Sidebar,
  SidebarItem

} from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Field);
Vue.use(Stepper);
Vue.use(popup);
Vue.use(ContactCard);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(ContactList);
Vue.use(ContactEdit);
Vue.use(AddressList);
Vue.use(SubmitBar);
Vue.use(Toast);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Sku);
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
Vue.use(Empty);
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