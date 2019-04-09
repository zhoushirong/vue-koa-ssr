<template>
  <div id="app">
    <header class="app-header">
      <div class="logo">
        <span class="main">Epoos</span>
        <span class="sub">邑司</span>
      </div>
      <div class="menus">
        <template v-for="item in navList" class="list">
          <router-link v-if="currentPath !== '/login'" :key="item.path" :to="item.path">
            <span>{{ item.title }}</span>
          </router-link>
        </template>
      </div>
      <div class="user">
        <div class="name">
          {{ user.user_name }}
        </div>
        <div class="logout" @click="onClickLogout">
          退出
        </div>
      </div>
    </header>
    <main class="app-container">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>

export default {
  data() {
    return {
      navList: [
        {path: '/', icon: 'user-o', title: '个人中心'},
        {path: '/logs', icon: 'exception-o', title: '日志查询'},
      ],
      currentPath: null
    }
  },
  computed: {
    user() {
      return this.$store.state.user.currentUserinfo || {}
    }
  },
  mounted() {
    this.currentPath = this.$route.path
  },
  methods: {
    onClickLogout() {
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        location.href = '/api/session/logout'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    }
  }
}
</script>

<style lang="scss">
$blue: #0064ff;
.app-header {
  display: flex;
  height: 60px;
  padding: 0 20px;
  background: $blue;
  box-sizing: border-box;

  .logo {
    line-height: 60px;
    color: #fff;

    .main {
      font-size: 32px;
      font-weight: bold;
    }
    .sub {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .menus {
    flex: 1;
    display: flex;
    margin-left: 100px;
    align-items: center;

    a {
      padding: 0 10px;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
    svg {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .user {
    display: flex;
    height: 60px;
    font-size: 14px;
    line-height: 60px;
    color: #fff;

    .logout {
      margin-left: 20px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    svg {
      vertical-align: middle;
    }
  }
}

.app-container {
  position: relative;
  padding: 20px;
}
.app-aside {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;

  .nav {
    height: 100%;
    background: #F2F2F2;
    h2 {
      font-size: 20px;
      padding: 10px 0 10px 20px;
      border-bottom: 1px solid #aaa;
    }
    li {
      cursor: default;
    }
    .list {
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #E5E5E5;
      color: #585858;
      text-indent: 20px;
      font-size: 14px;
      text-decoration: none;
      i {
        font-size: 20px;
      }
      span {
        margin-left: 6px;
        vertical-align: top;
      }
      &.router-link-active {
        color: #2B7DBC;
      }
    }
  }
}
</style>
