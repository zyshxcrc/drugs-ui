<template>
  <div class="warehouse_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">药品名称：</div>
        <div class="item">
          <el-input v-model="name" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_item">
        <div class="query_name">日期：</div>
        <div class="item">
          <el-date-picker
            v-model="catchDate"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
            {{ scope.row.drugCode }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="名称"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.drugName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="规格型号"
          align="center"
          min-width="15">
          <template slot-scope="scope">
            {{ scope.row.drugModel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单位"
          align="center"
          min-width="5">
          <template slot-scope="scope">
            {{ scope.row.drugUnit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单价"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.unitPrice }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="所属公司"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.company.companyName }}
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
  import {getDrugList} from '@/api/drug'
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [
          {
            code:'QKBYN',
            name:'正牧烟水两用消毒剂（泰）',
            model:'500g×20袋/箱',
            unit:'袋',
            unitPrice:'12',
            company:'山东正大',
            createDate:'2019-02-23',
            remarks:''
          }
        ],
        tableLoading:false,
        pageSize:10,
        currentPage:1,
        total:100,
        catchDate:[],
        receiver:'',
        name:'',
      }
    },
    created(){
      this.fetchDrugList()
    },
    methods:{
      handleSizeChange(val){
        this.pageSize = val
        this.fetchDrugList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.fetchDrugList()
      },
      fetchDrugList(){
        let params = {
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
        this.tableLoading = true
        getDrugList(params).then(res=>{
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
  .warehouse_mian{
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
      .query_item+.query_item{
        margin-left: 5px;
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
