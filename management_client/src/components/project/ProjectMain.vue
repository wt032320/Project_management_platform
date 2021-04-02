<template>
  <div class="main">
    <div class="main-title">
      <div class="title-name">项目</div>
      <div class="title-buttons">
        <el-button type="success" class="title-button title-item">新增</el-button>
        <el-input
          class="title-search title-item"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          v-model="searchValue"
        >
        </el-input>
      </div>
    </div>
    <div class="main-form">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'ProjectMain',
  components: {},
  setup() {
    const searchValue = ref("")
    const tableData = ref([
      {
        date: '2016-05-02',
        name: '黄小博',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '李小耿',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ])
    return {
      searchValue,
      tableData
    }
  }
})
</script>

<style lang="scss">
.main {
  width: 87%;
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    .title-name {
      font-size: 1.6rem;
      font-weight: bold;
      padding-left: 2rem;
    }
    .title-buttons {
      padding-right: 2rem;
      display: flex;
      .title-button {
        width: 5.5rem;
      }
      .title-item {
        padding: 0 0.4rem;
      }
    }
  }
}
</style>