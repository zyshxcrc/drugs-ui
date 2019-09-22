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
        <div class="query_name">领用人：</div>
        <div class="item">
          <el-input v-model="receiver" placeholder="请输入领用人" size="small"></el-input>
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
        style="height: 100%">
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
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="名称"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="规格型号"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.model }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单位"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.unit }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="数量"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.drawNum }}
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
          label="金额"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="领用人"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.receiver }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          align="center"
          min-width="20">
          <template slot-scope="scope">
            {{ scope.row.drawTime }}
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
            money:'120',
            drawNum:'10',
            receiver:'张三',
            drawTime:'2019-02-23',
            remarks:''
          }
        ],
        pageSize:10,
        currentPage:1,
        total:100,
        catchDate:[],
        receiver:'',
        name:'',
      }
    },
    methods:{
      handleSizeChange(val){

      },
      handleCurrentChange(val){

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
