<template>
  <div class="warehouse_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">药品名称：</div>
        <div class="item">
          <el-input v-model="drugName" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_control">
        <el-button type="primary" size="small" @click="fetchInventoryList">查询</el-button>
      </div>
    </div>
    <div class="main_table">
      <el-table
        :data="tableData"
        size="small"
        v-loading="tableLoading"
        style="width: 100%;height: 100%">
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
            {{ scope.row.drug.drugCode }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="名称"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.drug.drugName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="规格型号"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.drug.drugModel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单位"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.drug.drugUnit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="入库数量"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.warehouseNum }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="出库数量"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.outgoingNum }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="库存数量"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.inventoryNum }}
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
  import {getInventoryList} from '@/api/inventory'
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [],
        pageSize:10,
        currentPage:1,
        total:100,
        tableLoading:false,
        drugName:'',
      }
    },
    created(){
      this.fetchInventoryList()
    },
    methods:{
      handleSizeChange(val){
        this.pageSize = val
        this.fetchInventoryList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.fetchInventoryList()
      },
      fetchInventoryList(){
        let params = {
          drugName:this.drugName,
          // startDate:this.catchDate.length>0?this.catchDate[0]:'',
          // endDate:this.catchDate.length>0?this.catchDate[1]:'',
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
        this.tableLoading = true
        getInventoryList(params).then(res=>{
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
