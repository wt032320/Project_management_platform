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
        stripe
        style="width: 100%"
        height="90%"
        class="form"
      >
        <el-table-column 
          v-for="item in tableArgs" 
          :key="item" 
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">进入</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="page"
        background
        layout="prev, pager, next"
        :page-size="7"
        :pager-count="5"
        :page-count="pageCount.pagenumber"
        @current-change="pageChage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import{ _project } from '../../api/project/project'

export default defineComponent({
  name: 'ProjectMain',
  components: {},
  setup() {
    const searchValue = ref("")

    const pageCount = reactive({
      pagenumber:  null // 页数
    })

    // 表单数据
    let tableData = ref([])

    const tableArgs = ref([
      { prop: 'date', label: '创建日期' },
      { prop: 'name', label: '名称' },
      { prop: 'address', label: '地址' },
      { prop: 'stage', label: '阶段' },
      { prop: 'identity', label: '身份' }
    ])

    // 获取表单数据
    async function getTableData(page: number = 1) {
      await _project(page).then(res => {
        // 改变 tableData的值时 要加上.value属性
        tableData.value = res.msg.ownProjects
        pageCount.pagenumber = res.msg.pageNums
      })
    }
    onMounted(() => {
      getTableData()
    })

    /**
     * @description: 翻页
     * @param {*}
     * @return {*}
     */
    function pageChage(page: number) {
      getTableData(page)
    }

    return {
      searchValue,
      tableData,
      pageCount,
      tableArgs,
      pageChage
    }
  }
})
</script>

<style lang="scss" scoped>
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
  .main-form {
    width: 95%;
    height: 85%;
    margin-top: 1rem;
    margin-left: 2.5%;
    border-radius: 0.8rem;
  }
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
}
</style>