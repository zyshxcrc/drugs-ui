<template>
  <div class="company_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">公司名称：</div>
        <div class="item">
          <el-input v-model="input" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_control">
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </div>
    <div class="main_table">
      <el-table
        :data="tableData"
        size="small"
        v-loading="tableLoading"
        height="100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="date"
          label="编号"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.companyCode }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="名称"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.companyName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="联系电话"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="地址"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="备注"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.remarks }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main_navigation">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getCompanyList} from '@/api/company'
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [],
        pageSize:10,
        currentPage:1,
        total:100,
        tableLoading:false,
      }
    },
    created(){
      this.fetchCompanyList()
    },
    methods:{
      handleSizeChange(val){
        this.pageSize = val
        this.fetchCompanyList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.fetchCompanyList()
      },
      fetchCompanyList(){
        let params = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
        this.tableLoading = true
        getCompanyList(params).then(res=>{
          console.info(res)
          this.tableData = res.value.list
          this.total = res.value.pagination.total
          this.currentPage = res.value.pagination.currentPage
          this.pageSize = res.value.pagination.pageSize
          this.tableLoading = false
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .company_mian{
    height: 100%;
    width: 100%;
    font-size: 14px;
    padding: 10px;
    .main_top{
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .query_item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .query_control{
        margin-left: 10px;
      }
    }
    .main_table{
      height: calc(100% - 85px);
    }
    .main_navigation{
      margin-top: 10px;
    }
  }
</style>
