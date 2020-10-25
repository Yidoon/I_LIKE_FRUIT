<template>
  <div class="login">
    <div class="login-form">
      <div class="login-input">
        <div class="spec-input input-account">
          <input type="text" placeholder="请输入邮箱名" v-model="userInfo.email">
          <p @click="registerAccount">没有账号?</p>
        </div>
        <div class="spec-input input-password">
          <input type="password" placeholder="请输入密码" v-model="userInfo.passwd">
          <p @click="forgetPassword">忘记密码?</p>
        </div>
      </div>
      <div class="btn-handdle" @click="submitInfo">
        <span v-if="currentAccountType === 'login'">登 录</span>
        <span v-if="currentAccountType === 'register'">注 册</span>
      </div>
    </div>
    <div class="register-form"></div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      currentAccountType: "login",
      isSubmit: false,
      userInfo: {
        email: "",
        passwd: ""
      }
    };
  },
  methods: {
    registerAccount() {
      this.currentAccountType = "register";
    },
    forgetPassword() {
      this.currentAccountType = "forgetPassword";
    },
    submitInfo() {
      if (!this.userInfo.email || !this.userInfo.passwd) {
        this.$message.error("请将信息填写完整");
        return;
      }
      if (this.currentAccountType === "register") {
        this.$store.dispatch("register", this.userInfo);
      }
      if (this.currentAccountType === "login") {
        this.$store
          .dispatch("login", this.userInfo)
          .then((res) => {
            console.log(res)
            this.$message({
              message: "恭喜，登录成功",
              type: "success"
            });
            this.$router.push({
              name: 'home'
            })
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              message: err,
              type: "error"
            });
          });
      }
    }
  },
  created() {
    this.$store.state.currentPage = "login";
  }
};
</script>

<style lang="less">
.login {
  .login-form {
    width: 100%;
    height: 150px;
    // border: 1px solid red;
    position: absolute;
    top: 35%;
    margin-top: -75px;
    .login-input {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      // border: 1px solid green;
      .spec-input {
        width: 80%;
        height: 50px;
        margin: 10px auto;
        input {
          width: 100%;
          height: 80%;
          border: none;
          border-bottom: 1px solid #eee;
          outline: none;
          background: #fff;
          font-size: 14px;
        }
        p {
          font-size: 12px;
          text-align: right;
          margin: 0;
          margin-top: 3px;
        }
      }
    }
    .btn-handdle {
      width: 90%;
      margin: 10px auto;
      height: 35px;
      line-height: 35px;
      background-color: rgb(46, 223, 164);
      color: #ffffff;
      border-radius: 15px;
    }
  }
}
</style>


