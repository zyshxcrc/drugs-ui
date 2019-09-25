<template>
  <div class="drug_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">药品名称：</div>
        <div class="item">
          <el-input v-model="drugName" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_item">
        <div class="query_name">日期：</div>
        <div class="item">
          <el-date-picker
            v-model="catchDate"
            size="small"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="query_control">
        <el-button type="primary" size="small" @click="fetchDrugList">查询</el-button>
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
        <el-table-column
          fixed="right"
          label="操作"
          min-width="10">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="fetchDrugById(scope.row)">编辑</el-button>
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
               class="drug_mian_edit"
    >
      <div slot="title" class="drug_main_title">{{dialogName}}</div>
      <div class="main">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="编码" size="small" prop="drugCode">
            <el-input v-model="form.drugCode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="名称" size="small" prop="drugName">
            <el-input v-model="form.drugName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="规格型号" size="small" prop="drugModel">
            <el-input v-model="form.drugModel"></el-input>
          </el-form-item>
          <el-form-item label="单位" size="small" prop="drugUnit">
            <el-select v-model="form.drugUnit" placeholder="请选择单位" size="small" style="width: 100%;">
              <el-option label="kg" value="kg"></el-option>
              <el-option label="袋" value="袋"></el-option>
              <el-option label="盒" value="盒"></el-option>
              <el-option label="斤" value="斤"></el-option>
              <el-option label="瓶" value="瓶"></el-option>
              <el-option label="桶" value="桶"></el-option>
              <el-option label="支" value="支"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" size="small" prop="unitPrice">
            <el-input v-model="form.unitPrice" size="small"></el-input>
          </el-form-item>
          <el-form-item label="公司" size="small" prop="companyId">
            <el-select v-model="form.companyId" placeholder="请选择单位" size="small" style="width: 100%;">
              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.companyName"
                :value="item.id">
              </el-option>
            </el-select>
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
        <el-button v-if="dialogName==='新增'" type="primary" @click="createDrug">新 增</el-button>
        <el-button v-else type="primary" @click="editDrug">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getDrugList,handleCreate,getDrugDetail,handleEdit} from '@/api/drug'
  import {getAllCompanyList} from '@/api/company'
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [],
        companyList:[],
        form:{
          drugCode:'',
          drugName:'',
          drugModel:'',
          drugUnit:'',
          unitPrice:'',
          createDate:'',
          companyId:'',
          remarks:''
        },
        rules: {
          drugCode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 6 个字符', trigger: 'blur' }
          ],
          drugName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          drugModel: [
            { required: true, message: '请输入规格型号', trigger: 'blur' }
          ],
          drugUnit: [
            { required: true, message: '请选择单位', trigger: 'change' }
          ],
          unitPrice: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          createDate: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          companyId: [
            { required: true, message: '请选择公司', trigger: 'change' }
          ]
        },
        tableLoading:false,
        pageSize:10,
        currentPage:1,
        total:100,
        catchDate:[],
        drugName:'',
        receiver:'',
        name:'',
        dialogTableVisible:false,
        dialogName:'',
        editDrugId:'',
      }
    },
    created(){
      this.fetchDrugList()
      this.fetchCompanyList()
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
          drugName:this.drugName,
          startDate:this.catchDate.length>0?this.catchDate[0]:'',
          endDate:this.catchDate.length>0?this.catchDate[1]:'',
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
      },
      fetchCompanyList(){
        getAllCompanyList().then(res=>{
          this.companyList = res.value.list
        })
      },
      openCreate(){
        this.form = {
          drugCode:'',
          drugName:'',
          drugModel:'',
          drugUnit:'',
          unitPrice:'',
          createDate:'',
          companyId:'',
          remarks:''
        }
        this.dialogName = '新增'
        this.dialogTableVisible = true
      },
      createDrug(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            handleCreate({
              ...this.form,
              company:this.companyList.find(item=>item.id=this.form.companyId)
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
            this.fetchDrugList()
          } else {

          }
        });
      },
      fetchDrugById(record){
        getDrugDetail({id:record.id}).then(res=>{
          console.info(res)
          this.form = {
            drugCode:res.value.drug.drugCode,
            drugName:res.value.drug.drugName,
            drugModel:res.value.drug.drugModel,
            drugUnit:res.value.drug.drugUnit,
            unitPrice:res.value.drug.unitPrice,
            createDate:res.value.drug.createDate,
            remarks:res.value.drug.remarks,
            companyId:res.value.drug.company.id
          }
          this.editDrugId = res.value.drug.id
          this.dialogName = '编辑'
          this.dialogTableVisible = true
        })
      },
      editDrug(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            handleEdit({
              ...this.form,
              id:this.editDrugId,
              company:this.companyList.find(item=>item.id=this.form.companyId)
            }).then(res=>{
              if(res.result){
                this.$message({
                  message: '修改成功！！',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '修改失败，请稍后再试！！',
                  type: 'error'
                });
              }
            })
            this.dialogTableVisible = false
            this.fetchDrugList()
          } else {

          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .drug_mian{
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

    .drug_mian_edit{
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
