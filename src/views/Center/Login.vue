<template>
  <div class="web-login">
    <div class="logo" @click="goback()">
      <img
        src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png"
      />
    </div>
    <div class="login-form">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <div class="form-group">
            <el-form-item label="手机号" prop="mobile">
              <el-input
                v-model="ruleForm.mobile"
                placeholder="请输入手机号"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-group">
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="请输入密码"
                v-model="ruleForm.password"
                show-password
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item class="login-btn">
            <el-button class="submit" @click="subBtn('ruleForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/api";
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        mobile: "",
        password: "",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机格式不正确",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    /* subBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post("/api/v1/login", {
              mobile: this.ruleForm.mobile,
              password: this.ruleForm.password,
            })
            .then((ret) => {
              console.log(ret.data);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, */
    subBtn(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let ret = await userLogin(this.ruleForm);
          if (ret.data.code == 666) {
            //登录成功,存储token,跳转
            this.$store.commit("updateToken", ret.data.data._token);
            this.$router.push({ path: "/center" });
          } else {
            //登录失败
            alert(ret.data.info);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goback() {
      this.$router.go(-1);
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
  height: 100%;
  overflow: hidden;
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
    .submit {
      width: 80%;
      height: 44px;
      display: block;
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