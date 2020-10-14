<template>
  <div>
    <!---->
    <div class="web-login">
      <div class="logo">
        <img
          src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
        />
      </div>
      <div class="login-form">
        <div>
          <div class="form-group">
            <input
              type="tel"
              maxlength="13"
              placeholder="手机号"
              class="input-control"
              v-model="mobile"
            />
          </div>
          <div class="form-group">
            <input
              type=" password"
              placeholder="密码"
              class="input-control"
              v-model="password"
            />
          </div>
          <div class="login-btn">
            <span class="submit" @click="subBtn()">登录</span>
          </div>

          <!---->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mobile: "",
      password: "",
    };
  },
  methods: {
    subBtn() {
      axios
        .post("/api/v1/login", {
          mobile: this.mobile,
          password: this.password,
        })
        .then((ret) => {
          console.log(ret.data);
        });
    },
  },
  created() {
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    this.eventBus.$emit("footernav", true);
  },
};
</script>

<style lang="scss" scoped>
.web-login {
  font-size: 15px;

  .logo {
    margin: 79px auto 40px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    img {
      height: 60px;
    }
  }
  .login-form {
    width: 100%;
    position: relative;
    form {
      display: block;
      margin-top: 0em;
    }
    .form-group {
      line-height: 55px;
      margin: 0 25px;
      position: relative;
    }
    .input-control {
      height: 15px;
      line-height: 15px;
      padding: 20px 0;
      width: 100%;
      font-size: 15px;
      color: #191a1b;
      border: 0;
      outline-width: 0;
    }
    .submit {
      width: 80%;
      height: 44px;
      display: block;
      line-height: 45px;
      font-size: 16px;
      border-radius: 3px;
      text-align: center;
      background-color: #ff5f16;
      color: #fff;
      border: none;
      margin: 70px auto 0;
    }
  }
}
</style>