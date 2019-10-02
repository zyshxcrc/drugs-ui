<template>
  <div class="company_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">公司名称：</div>
        <div class="item">
          <el-input v-model="companyName" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_control">
        <el-button type="primary" size="small" @click="fetchCompanyList">查询</el-button>
        <el-button type="primary" size="small" @click="openCreate">新增</el-button>
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
        <el-table-column
          fixed="right"
          label="操作"
          min-width="10">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openEditCompany(scope.row)">编辑</el-button>
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

    <el-dialog title="新增" :visible.sync="dialogTableVisible"
               class="company_mian_edit"
    >
      <div slot="title" class="drug_main_title">{{dialogName}}</div>
      <div class="main">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="编码" size="small" prop="companyCode">
            <el-input v-model="form.companyCode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="名称" size="small" prop="companyName">
            <el-input v-model="form.companyName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" size="small" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址" size="small" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" size="small" prop="createDate">
            <el-date-picker type="date" placeholder="选择日期"
                            v-model="form.createDate"
                            value-format="yyyy-MM-dd"
                            style="width: 100%;" :disabled="dialogName!=='新增'"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注" size="small">
            <el-input v-model="form.remarks" size="small"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button v-if="dialogName==='新增'" type="primary" @click="createCompany">新 增</el-button>
        <el-button v-else type="primary" @click="editCompany">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getCompanyList,handleCreate,getCompanyDetail,handleEdit} from '@/api/company'
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [],
        pageSize:10,
        currentPage:1,
        total:100,
        tableLoading:false,
        form:{
          companyCode:'',
          companyName:'',
          phone:'',
          address:'',
          createDate:'',
          remarks:''
        },
        rules: {
          companyCode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 6 个字符', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          // phone: [
          //   { required: true, message: '请输入规格型号', trigger: 'blur' }
          // ],
          // address: [
          //   { required: true, message: '请选择单位', trigger: 'change' }
          // ],
          createDate: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
        dialogTableVisible:false,
        dialogName:'',
        editCompanyId:'',
        companyName:''
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
          pageSize:this.pageSize,
          companyName:this.companyName
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
      },
      openCreate(){
        this.form = {
          companyCode:'',
          companyName:'',
          phone:'',
          address:'',
          createDate:'',
          remarks:''
        }
        this.dialogName = '新增'
        this.dialogTableVisible = true
        this.$nextTick(()=>{
          this.$refs['form'].clearValidate()
        })
      },
      openEditCompany(record){
        getCompanyDetail({id:record.id}).then(res=>{
          console.info(res)
          this.form = {
            companyCode:res.value.company.companyCode,
            companyName:res.value.company.companyName,
            phone:res.value.company.phone,
            address:res.value.company.address,
            createDate:res.value.company.createDate,
            remarks:res.value.company.remarks
          }
          this.editCompanyId = res.value.company.id
          this.dialogName = '编辑'
          this.dialogTableVisible = true
          this.$nextTick(()=>{
            this.$refs['form'].clearValidate()
          })
        })
      },
      createCompany(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            handleCreate({
              ...this.form
            }).then(res=>{
              if(res.result){
                this.$message({
                  message: '新增成功！！',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '新增失败，请稍后再试！！',
                  type: 'error'
                });
              }
            })
            this.dialogTableVisible = false
            this.fetchCompanyList()
          } else {

          }
        });
      },
      editCompany(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            handleEdit({
              ...this.form,
              id:this.editCompanyId
            }).then(res=>{
              if(res.result){
                this.$message({
                  message: '修改成功！！',
                  type: 'success'
                });
                this.dialogTableVisible = false
                this.fetchCompanyList()
              }else{
                this.$message({
                  message: '修改失败，请稍后再试！！',
                  type: 'error'
                });
              }
            })
          } else {

          }
        });
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

    .company_mian_edit{
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-dialog{
        width: 500px;
        margin: 0 !important;
        .drug_main_title{
          text-align: left;
          font-size: 18px;
        }
        .el-dialog__body{
          .main{
            font-size: 12px;
            padding: 0 10px;
          }
        }
      }
    }
  }
</style>
