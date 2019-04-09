<template>
  <div class="login-page">
    <div class="page-title">欢迎使用 epoos 系统</div>
    <el-form class="login-box" ref="form" label-width="80px" width="600px">
      <el-form-item label="用户名">
        <el-input v-model="loginData.username" type="text" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginEvent">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: null,
        password: null
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user || {}
    }
  },
  methods: {
    loginEvent() {
      return this.$store.dispatch('user/login', this.loginData).catch(error => {
        this.$message.error(error)
      }).then((res) => {
        if (res && res.user_id) {
          location.href = '/'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-page {
  .page-title {
    padding: 30px;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
  }
  .login-box {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
