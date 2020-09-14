<template>
  <div>
    <div class="Cart_top">
      <van-nav-bar fixed placeholder title="确认订单" @click-left="onClickLeft" left-arrow />
    </div>
    <div>
      <!-- 联系人卡片 -->
      <van-contact-card
        :type="cardType"
        :name="currentContact.name"
        :tel="currentContact.tel"
        :site="currentContact.site"
        @click="showList = true"
      />

      <!-- 联系人列表 -->
      <van-popup v-model="showList" position="bottom">
        <van-contact-list
          v-model="chosenContactId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
      </van-popup>

      <!-- 联系人编辑 -->
      <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"
        />
      </van-popup>
      <div>
        <div class="div_flex">
          <i
            class="van-icon van-icon-add-square van-cell__left-icon"
            @click="showAddress"
            v-show="isshow"
            style="color: #1989fa;
    font-size: 40Px;margin-right:4Px"
          ></i>
          <van-icon name="logistics" v-show="!isshow" />
          <div v-show="isshow" @click="showAddress" style="margin-left:5Px" class="titile">选择地址</div>
          <div class="choose" v-show="!isshow">
            <span>
              <span style="margin-left:9Px" @click="showAddress">
                <span @click="click_delete">地址：{{this.text1}}</span>
              </span>

              <br />
              <span style="margin-left:9Px">
                详细地址:
                <input
                  placeholder="请输入详细地址"
                  v-model="input_text"
                  type="text"
                  style=";border:1px solid white"
                />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="kun_box"></div>

      <nut-address
        v-model="showPopup"
        :province="province"
        :city="city"
        :country="country"
        :town="town"
        customAddressTitle="请选择所在地区"
        @onChange="onChange1"
        @close="close1"
      ></nut-address>
    </div>
    <br />
    <br />
    <div v-for="(item, index) in cart_item" :key="index">
      <div class="div_flex_card">
        <div style="width:30px;height:30px;border-radius:50% 50%;">
          <img style="width:30px;height:30px;border-radius:50% 50%;" :src="item[1].shopLogo" alt />
        </div>
        <div style="margin-left:3%">{{item[1].shopCpy}}</div>
      </div>
      <van-card :price="item[0].goodsPrice" :title="item[0].goodsName" :thumb="item[0].goodsLogo" />
      <br />
    </div>
    <div style="width:100%;height:50px"></div>
    <van-submit-bar :price="this.total" placeholder button-text="付款" @submit="onSubmit" />
  </div>
</template>

<script>

import { postcart_order, postcartadd_user, postcart_cart_getArea } from '../../api/user'
export default {
  data () {
    return {
      order_user_id: [],
      id: this.$route.query.id,
      isshow: true,
      showPopup: false,
      province: [{ "id": 1, "name": "北京" }, { "id": 2, "name": "广西" }, { "id": 3, "name": "江西" }, { "id": 4, "name": "四川" }], // 省
      city: [{ "id": 7, "name": "朝阳区" }, { "id": 8, "name": "崇文区" }, { "id": 9, "name": "昌平区" }, { "id": 6, "name": "石景山区" }],// 市
      country: [{ "id": 3, "name": "八里庄街道" }, { "id": 9, "name": "北苑" }, { "id": 4, "name": "常营乡" }],// 县
      town: [], // 镇 必传值：name
      text1: '',
      addtake: [],
      // ================================
      chosenContactId: null,
      cart_item: [],
      input_text: '',
      editingContact: {},
      showList: false,
      showEdit: false,
      cart_newaddr: [],
      isEdit: false,

      list: [
        {
          name: '林9九',
          tel: '13140519519',
          id: 0,
        },
      ],
    }
  },

  computed: {
    total () {
      var num = 0
      this.cart_item.map((ele) => {
        num += ele[0].goodsPrice * 100
      })
      return num
    },
    cardType () {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact () {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter((item) => item.id === id)[0] : {};

    },
  },

  created () {

    // 订单商品

    // 商品id

    this.postcart_order()
  },
  methods: {
    // 订单商品
    onSubmit () {
      if (this.text1 === '' || this.input_text === '') {
        this.$toast('输入详细信息');


      } else {
        postcart_cart_getArea({
          Name: this.currentContact.name,
          Phone: this.currentContact.tel,
          Province: this.addtake[0],
          City: this.addtake[1],
          District: this.addtake[2],
          Address: this.input_text,
        }).then(res => {
          console.log(res)
          var cart_addr = this.currentContact.name + ',' + this.currentContact.tel + ',' + this.addtake[0] + ' ' + this.addtake[1] + ' ' + this.addtake[2] + ' ' + this.input_text

          console.log(cart_addr)
          this.$router.push({
            path: 'createpay',
            query: {
              price: this.total,
              consignee_addr: cart_addr,
              goodsId: this.id,
              isFcart: true,
              num: 0
            }
          })
        })
      }


    },


    async postcart_order () {

      let res = await postcart_order({
        goodsid: this.id

      })
      console.log(this.id)
      console.log(res)
      this.cart_item = res.data
    },
    // 商品id

    onClickLeft () {
      window.history.back()
    },
    click_delete () {
      this.addtake = []
    },
    showAddress () {
      this.showPopup = true
    },
    onChange1 (cal) {
      // 判断下一个行政区列表的内容是否有值

      if (this[cal.next].length < 1) {
        this.showPopup = false
      }

      this.addtake.push(cal.value.name)
      console.log(this.addtake)

    },
    close1 (val) {
      this.text1 = val.data.addressStr
      if (this.text1.length > 1) {
        this.isshow = false
      }
    },
    // ==========================================
    // 添加联系人
    onAdd () {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit (item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect () {
      this.showList = false;
    },

    // 保存联系人
    onSave (info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map((item) =>
          item.id === info.id ? info : item
        );
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete (info) {
      this.showEdit = false;
      this.list = this.list.filter((item) => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
  },
}


</script>

<style scoped>
.div_flex_card {
  display: flex;
  align-items: center;
  margin-left: 4%;
  height: 30px;
}
.div_flex {
  padding: 16Px; /*no*/
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #323233;
  font-size: 14Px; /*no*/

  background-color: #fff;
  width: 100%;
}
.kun_box {
  position: absolute;
  right: 0;
  left: 0;
  height: 2px;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  content: "";
}
.van-card {
  position: relative;
  box-sizing: border-box;
  padding: 8px 16px;
  color: #323233;
  font-size: 12px;
  background-color: #ffffff;
}
.van-submit-bar__button--danger {
  background: black;
}
.van-submit-bar__price {
  color: #000000;
  font-weight: 500;
  font-size: 17px;
}
.van-card[data-v-bc758c4e] {
  position: relative;
  box-sizing: border-box;
  padding: 0.21333rem 0.42667rem;
  color: #323233;
  font-size: 0.32rem;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(223, 223, 223);
}
</style>