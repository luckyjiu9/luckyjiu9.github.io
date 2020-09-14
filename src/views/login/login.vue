<template>
  <div>
    <div class="div_box">
      <!-- //标头 -->
     
      <van-dialog
        v-model="show"
        :showCancelButton="false"
        confirmButtonColor="black"
        show-cancel-button
        @confirm="confirm	"
        :overlay="true"
      >
        <br />
        <p style="text-align:center">{{item_p}}</p>
        <br />
      </van-dialog>

      <!-- //登陆注册 -->
      <van-tabs v-model="active" type="card">
        <br />
        <van-tab title="登录" style="width:90%;margin-left:5%">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0">
            <el-form-item prop="user1">
              <el-input v-model="ruleForm2.user1" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item prop="pass1">
              <el-input
                v-model="ruleForm2.pass1"
                type="password"
                auto-complete="off"
                placeholder="输入密码"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                style="background:black;border:1px solid black;width:100% "
                @click="userlogin"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <p @click="tiao_active" style="color:black ;margin-left:2%">还没账号?立即登录</p>
        </van-tab>
        <van-tab title="注册" style="width:96%;margin-left:2%">
          <br />
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0">
            <el-form-item prop="tel">
              <el-input v-model="ruleForm2.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="user">
              <el-input v-model="ruleForm2.user" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="smscode" class="code">
              <el-input :disabled="true" v-model="ruleForm2.smscode" placeholder="验证码"></el-input>
              <el-button type="primary" :disabled="isDisabled" @click="sendCode">{{buttonText}}</el-button>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                v-model="ruleForm2.pass"
                auto-complete="off"
                placeholder="输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="确认密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="background:black;border:1px solid black;width:100% "
                @click="submitForm('ruleForm2')"
              >注册</el-button>
            </el-form-item>
          </el-form>
        </van-tab>
      </van-tabs>
      <transition name="van-slide-left">
        <div class="transition" v-show="visible">登录成功</div>
      </transition>
      <!-- //登录框 -->
    </div>

    <p style="text-align:center">luckyjiu9</p>
  </div>
</template>

<script>
import { getminelogin, getminephone, getmineuser, getminecode, getminepass } from '@/api/user'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    // <!--验证手机号是否合法-->
    let checkTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (!this.checkMobile(value)) {
        callback(new Error('手机号码不合法'))
      } else {
        getminephone({
          phone: this.ruleForm2.tel
        }).then(res => {
          console.log(res)
          if (res.code === 204) {
            callback(new Error('该手机号码已注册'))
          } else {
            callback()
          }

        })

      }

    }

    //  <!--验证码是否为空-->
    let checkSmscode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机验证码'))
      } else if (value.length < 4) {
        callback(new Error('请输入四位数验证码'))

      } else if (this.ruleForm2.getminecode != this.ruleForm2.getminecode) {
        callback(new Error('验证码错误'))

      } else {
        callback()
      }
    }
    // <!--验证密码-->
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback()
      }
    }
    //验证用户名
    let user = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 4) {
        callback(new Error('请输入四位数用户名'))

      } else {
        getmineuser({
          LoginName: this.ruleForm2.user
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            callback(new Error('该用户名已注册'))
          } else {
            callback()
          }
        })

      }
    }
    let user1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 4) {
        callback(new Error('请输入四位数用户名'))

      } else {
        getmineuser({
          LoginName: this.ruleForm2.user1
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            callback()
          } else {
            callback(new Error('用户名不存在,请注册'))
          }
        })

      }
    }

    // <!--二次验证密码-->
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      show: false,
      item_p: '',
      active: 0,
      ruleForm2: {
        pass: "",
        checkPass: "",
        tel: "",
        smscode: "账户余额不足",
        user: '',
        pass1: '',
        user1: '',
        getminephone: '',
        getmineuser: '',
        getminecode: '',



      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        tel: [{ validator: checkTel, trigger: 'blur' }],
        smscode: [{ validator: checkSmscode, trigger: 'blur' }],
        user: [{ validator: user, trigger: 'blur' }],
        user1: [{ validator: user1, trigger: 'blur' }],

      },
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    }
  },

  methods: {
    tiao_active () {
      console.log(1)
      this.active = 1
    },
    ...mapMutations({
      token: 'toToke'
    }),
    //点击登录的一个跳转
    confirm () {
      this.active = 0

    },


    // <!--发送验证码-->
    sendCode () {
      let tel = this.ruleForm2.tel
      if (this.checkMobile(tel)) {
        console.log(tel)
        let time = 60
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }

      }
      getminecode({
        phone: this.ruleForm2.tel
      }).then(res => {
        console.log(res)
      })
    },
    // <!--提交注册-->
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            getminepass({
              LoginName: this.ruleForm2.user,
              LoginPassword: this.ruleForm2.pass,
              phone: this.ruleForm2.tel,
              isPassing: 'yes'

            }).then(res => {
              if (res.code === 201) {
                this.ruleForm2.user = ''
                this.ruleForm2.pass = ''
                this.ruleForm2.tel = ''
                this.ruleForm2.checkPass = ''
                this.item_p = '恭喜你注册成功'
                this.show = true
              }
            })
          }, 400);
        } else {
          console.log("error submit!!");
          return false;
        }

      })

    },
    // 登录
    userlogin () {
      if (this.ruleForm2.user1 === '' || this.ruleForm2.pass1 === '') {
        return
      }
      getminelogin({
        LoginName: this.ruleForm2.user1,
        LoginPassword: this.ruleForm2.pass1,
        isPassing: "yes"
      }).then(res => {
        console.log(res)

        if (res.code === 200) {
          // this.token = res.tnToken.tokenStr
          // console.log(this.token)
          this.token(res.tnToken.tokenStr)
          this.visible = true
          this.ruleForm2.user1 = ''
          this.ruleForm2.pass1 = ''
          setTimeout(() => {
            this.visible = false
          }, 1000)
          setTimeout(() => {
            this.$router.push('/home')
          }, 1500)
        } else {
          this.item_p = '密码错误'
          this.ruleForm2.pass1 = ''
          this.show = true
        }
      })
    },
    // 验证手机号
    checkMobile (str) {
      let re = /^1\d{10}$/
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

  }
}
</script>

<style lang="css" scoped>
@import "../../assets/style/mine.css";
</style>
