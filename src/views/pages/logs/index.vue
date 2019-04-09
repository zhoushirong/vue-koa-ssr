<template>
  <div class="log-page">
    <div class="page-title">日志查询</div>
    <el-form ref="form">
      <el-form-item>
        <el-col :span="3">
          <el-select v-model="searchData.searchType" placeholder="请选择搜索条件">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <template v-if="searchData.searchType !== 'create_time'">
            <el-input
              v-model="searchData.searchValue"
              placeholder="请输入内容">
            </el-input>
          </template>
          <template v-else>
            <el-date-picker
              v-model="searchData.starDate"
              type="date"
              placeholder="请选择开始日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
              -
            <el-date-picker
              v-model="searchData.endDate"
              type="date"
              placeholder="请选择截止日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
        </el-col>
        <el-col :span="1.5">
          <el-button @click="searchEvt" type="primary">搜索</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button @click="resetEvt" type="primary">重置</el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <template>
      <el-table
        :data="logs"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          width="180">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="log_type"
          label="日志类型">
        </el-table-column>
        <el-table-column
          prop="log_content"
          label="日志内容">
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      layout="prev, pager, next"
      :pageSize="pageInfo.pageSize"
      :currentPage="pageInfo.currentPage"
      :total="pageInfo.total"
      @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
// TODO
// 待修改：时间条件与其他条件并非 AND 关系！

let defParams = {
  currentPage: 1,
  pageSize: 10,
  searchType: 'all',
  searchValue: null,
  starDate: null,
  endDate: null
}
export default {
  asyncData({ store, route, ctx }) {
    const params = Object.assign({}, defParams)
    params.ctx = ctx
    return store.dispatch('log/queryLogs', params)
  },
  data() {
    return {
      params: {},
      options: [
        { label: '全部', value: 'all' },
        { label: '时间', value: 'create_time' },
        { label: '主类型', value: 'log_type' },
        { label: '日志内容', value: 'log_content' },
        { label: '账号', value: 'user_id' },
        { label: 'IP', value: 'ip' },
      ],
      searchData: {
        searchType: 'all',
        searchValue: null,
        starDate: null,
        endDate: null
      }
    }
  },
  computed: {
    logs () {
      return this.$store.state.log.logs
    },
    pageInfo() {
      return this.$store.state.log.pageInfo
    }
  },
  methods: {
    loadLogs(params) {
      return this.$store.dispatch('log/queryLogs', params).catch(error => {
        this.$message.error(error)
      })
    },
    pageChange(index) {
      let params = Object.assign({}, defParams, this.searchData)
      params.currentPage = index
      params.searchValue = this.trim(params.searchValue)
      this.loadLogs(params)
    },
    searchEvt() {
      let params = Object.assign({}, defParams, this.searchData)
      params.currentPage = 1
      params.searchValue = this.trim(params.searchValue)
      this.loadLogs(params)
    },
    resetEvt() {
      this.searchData = Object.assign({}, defParams)
    },
    trim(str) {
      if (!str) {
        return str
      }
      return str.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
}
</script>

<style lang="scss">
.log-page {
  .page-title {
    margin-bottom: 15px;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .el-col {
    margin-right: 10px;
  }
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
