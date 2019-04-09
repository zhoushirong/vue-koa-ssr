<template>
  <div class="user-page">
    <div class="page-title">当前用户信息</div>
    <div class="userinfo">
      <div class="line"><label class="label">用户名</label><div class="info">{{user.user_id}}</div></div>
      <div class="line"><label class="label">用户昵称</label><div class="info">{{user.user_name}}</div></div>
      <div class="line"><label class="label">用户类型</label><div class="info">{{user.user_type}}</div></div>
      <div class="line"><label class="label">用户状态</label><div class="info">{{user.user_status}}</div></div>
      <div class="line"><label class="label">用户创建时间</label><div class="info">{{user.create_time}}</div></div>
      <div class="line"><label class="label">用户更新时间</label><div class="info">{{user.update_time}}</div></div>
    </div>
  </div>
</template>

<script>

export default {
  asyncData({ store, route, ctx}) {
    return store.dispatch('user/getCurrentUser', { ctx })
  },
  computed: {
    user() {
      return this.$store.state.user.currentUserinfo || {}
    }
  },
  mounted() {
  },
  components: {
  }
}
</script>

<style lang="scss">
.user-page {
  .page-title {
    margin-bottom: 15px;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .userinfo {
    .line {
      padding: 10px 0 10px;
      border-bottom: 1px solid #ddd;
    }
    .label {
      display: inline-block;
      width: 120px;
      text-align: right;
      font-weight: bold;
    }
    .info {
      display: inline-block;
      text-indent: 30px;
    }
  }
}
</style>
