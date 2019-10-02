<template>
  <div class="out_of_stock_mian">
    <div class="main_top">
      <div class="query_item">
        <div class="query_name">药品名称：</div>
        <div class="item">
          <el-input v-model="drugName" placeholder="请输入名称" size="small"></el-input>
        </div>
      </div>
      <div class="query_item">
        <div class="query_name">领用人：</div>
        <div class="item">
          <el-input v-model="receiverName" placeholder="请输入领用人" size="small"></el-input>
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
        <el-button type="primary" size="small" @click="fetchOutOfStackList">查询</el-button>
        <el-button type="primary" size="small" @click="openCreate">新增</el-button>
        <el-button type="primary" size="small" @click="excelExport">导出</el-button>
      </div>
    </div>
    <div class="main_table">
      <el-table
        :data="tableData"
        size="small"
        show-summary
        :summary-method="getSummaries"
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
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.drugModel }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单位"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            {{ scope.row.drugUnit }}
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align="center"
          prop="drawNum"
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
          label="金额"
          align="center"
          prop="money"
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
            {{ scope.row.receiver.receiverName }}
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
        <el-table-column
          label="操作"
          align="center"
          min-width="10">
          <template slot-scope="scope">
            <el-button @click="openEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteOutOfStack(scope.row)" type="text" size="small">删除</el-button>
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
               class="warehouse_add"
    >
      <div slot="title" class="drug_main_title">{{dialogName}}</div>
      <div class="main">
        <div class="main_add">
          <el-button type="primary" size="small" @click="openOutOfStackAdd">新增</el-button>
        </div>
        <div class="main_table">
          <el-table
            :data="addOutOfStackList"
            stripe
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
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.drugModel }}
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="单位"
              align="center"
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.drugUnit }}
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
                {{ scope.row.receiverName }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              min-width="10">
              <template slot-scope="scope">
                <el-button @click="deleteFormDrug(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="openEditFormDrug(scope.row)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          width="30%"
          title="内层 Dialog"
          :visible.sync="innerVisible"
          class="out_of_stack_add_form"
          append-to-body>
          <div slot="title" class="drug_main_title">{{dialogAddName+'出库药品'}}</div>
          <div class="main">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="名称" size="small" prop="id">
                <el-select v-model="form.id" placeholder="请选择药品" size="small" style="width: 100%;" filterable>
                  <el-option
                    v-for="item in drugList"
                    :key="item.id"
                    :label="item.drugCode+'-'+item.drugName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="数量" size="small" prop="drowNum">
                <el-input v-model="form.drowNum"></el-input>
              </el-form-item>
              <el-form-item label="领用人" size="small" prop="receiver">
                <el-select v-model="form.receiver" placeholder="请选择领用人" size="small" style="width: 100%;">
                  <el-option
                    v-for="item in receiverList"
                    :key="item.id"
                    :label="item.receiverName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button v-if="dialogAddName==='新增'" type="primary" @click="addFormDrug">新 增</el-button>
            <el-button v-else type="primary" @click="editFormDrug">修 改</el-button>
          </div>
        </el-dialog>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button v-if="dialogName==='新增'" type="primary" @click="addOutOfStack">新 增</el-button>
        <el-button v-else type="primary" @click="editOutOfStack">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="dialogTableEditVisible"
      class="out_of_stack_edit_form">
      <div slot="title" class="drug_main_title">编辑</div>
      <div class="main">
        <el-form ref="editForm" :model="editForm" :rules="editRules" label-width="80px">
          <el-form-item label="编号" size="small" prop="drugCode">
            <el-input v-model="editForm.drugCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" size="small" prop="drugName">
            <el-input v-model="editForm.drugName" disabled></el-input>
          </el-form-item>
          <el-form-item label="规格型号" size="small" prop="drugModel">
            <el-input v-model="editForm.drugModel" disabled></el-input>
          </el-form-item>
          <el-form-item label="单位" size="small" prop="drugUnit">
            <el-input v-model="editForm.drugUnit" disabled></el-input>
          </el-form-item>
          <el-form-item label="单价" size="small" prop="unitPrice">
            <el-input v-model="editForm.unitPrice" disabled></el-input>
          </el-form-item>
          <el-form-item label="数量" size="small" prop="drawNum">
            <el-input v-model="editForm.drawNum"></el-input>
          </el-form-item>
          <el-form-item label="领用人" size="small" prop="receiverName">
            <el-input v-model="editForm.receiverName" disabled></el-input>
          </el-form-item>
          <el-form-item label="时间" size="small" prop="receiverName">
            <el-input v-model="editForm.drawTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="备注" size="small" prop="receiverName">
            <el-input v-model="editForm.remarks"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editOutOfStack">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {getOutOfStackList,handleOutOfstackCreate,getItemById,handleOutOfstackUpdate,handleOutOfstackDelete,
    handleOutOfstackExcelDownload} from '@/api/inventory'
  import {getAllCompanyList} from '@/api/company'
  import {getAllDrugList} from '@/api/drug'
  import {getAllReceiverList} from '@/api/receiver'
  import {floatMul} from "../../util/util";
  export default {
    name:'drugs-warehose',
    data(){
      return {
        tableData: [],
        pageSize:10,
        currentPage:1,
        total:100,
        catchDate:[],
        receiverName:'',
        drugName:'',
        tableLoading:false,
        addOutOfStackList:[],
        dialogName:'',
        dialogTableVisible:false,
        innerVisible:false,
        addWarehouseForm:{},
        dialogAddName:'新增',
        form:{
          id:undefined,
          receiver:undefined,
          drowNum:''
        },
        rules: {
          drowNum: [
            { required: true, message: '请输入入库数量', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请选择药品', trigger: 'change' }
          ],
          receiver: [
            { required: true, message: '请选择药品', trigger: 'change' }
          ]
        },
        drugList:[],
        companyList:[],
        receiverList:[],
        drugNum:0,
        dialogTableEditVisible:false,
        editForm:{
          id:undefined,
          drugId:undefined,
          drugCode:'',
          drugName:'',
          drugModel:'',
          drugUnit:'',
          unitPrice:'',
          drawNum:'',
          receiver:'',
          receiverName:'',
          drawTime:'',
          remarks:'',
        },
        editRules:{
          drawNum:[
            { required: true, message: '请输入入库数量', trigger: 'blur' }
          ],
        }
      }
    },
    created(){
      this.fetchOutOfStackList()
      this.fetchCompanyList()
      this.fetchDrugList()
      this.fetchReceiverList()
    },
    methods:{
      handleSizeChange(val){
        this.pageSize = val
        this.fetchOutOfStackList()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.fetchOutOfStackList()
      },
      fetchOutOfStackList(){
        let params = {
          drugName:this.drugName,
          receiverName:this.receiverName,
          startDate:this.catchDate.length>0?this.catchDate[0]:'',
          endDate:this.catchDate.length>0?this.catchDate[1]:'',
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
        this.tableLoading = true
        getOutOfStackList(params).then(res=>{
          console.info(res)
          this.tableData = res.value.list
          this.total = res.value.pagination.total
          this.currentPage = res.value.pagination.currentPage
          this.pageSize = res.value.pagination.pageSize
          this.tableLoading = false
        })
      },
      openCreate(){
        this.addOutOfStackList=[]
        this.dialogName = '新增'
        this.dialogTableVisible = true
      },
      openEdit(record){
        getItemById({id:record.id}).then(res=>{
          if(res.result){
            this.editForm = {
                id:res.value.outOfStackReceiver.id,
              drugId:res.value.outOfStackReceiver.drugId,
                drugCode:res.value.outOfStackReceiver.drugCode,
                drugName:res.value.outOfStackReceiver.drugName,
                drugModel:res.value.outOfStackReceiver.drugModel,
                drugUnit:res.value.outOfStackReceiver.drugUnit,
                unitPrice:res.value.outOfStackReceiver.unitPrice,
                drawNum:res.value.outOfStackReceiver.drawNum,
                drawTime:res.value.outOfStackReceiver.drawTime,
                remarks:res.value.outOfStackReceiver.remarks,
                receiver:res.value.outOfStackReceiver.receiver.id,
                receiverName:res.value.outOfStackReceiver.receiver.receiverName
            }
            this.dialogTableEditVisible = true
          }
        })
      },
      openOutOfStackAdd(){
        this.innerVisible = true
        this.dialogAddName = '新增'
        this.form = {
          id:undefined,
          drowNum:''
        }
        this.$nextTick(()=>{
          this.$refs['form'].clearValidate()
        })
      },
      openEditFormDrug(record){
        this.form = {
          id:record.drugId,
          drowNum:record.drawNum,
          receiver:record.receiver,
          addId:record.addId,
        }
        this.innerVisible = true
        this.dialogAddName = '编辑'
        this.$nextTick(()=>{
          this.$refs['form'].clearValidate()
        })
      },
      fetchCompanyList(){
        getAllCompanyList().then(res=>{
          this.companyList = res.value.list
        })
      },
      fetchDrugList(){
        getAllDrugList().then(res=>{
          this.drugList = res.value.list
        })
      },
      fetchReceiverList(){
        getAllReceiverList().then(res=>{
          this.receiverList = res.value.list
        })
      },
      addFormDrug(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let drug = this.drugList.find(item=>item.id === this.form.id)
            let receiver = this.receiverList.find(item=>item.id === this.form.receiver)
            let addDrug = {
              addId:this.drugNum,
              drugId:this.form.id,
              ...drug,
              drawNum:this.form.drowNum,
              receiver:this.form.receiver,
              receiverName:receiver.receiverName,
              money:floatMul(drug.unitPrice,this.form.drowNum),
              drawTime:this.$moment(new Date()).format('YYYY-MM-DD')
            }
            console.info(addDrug)
            this.addOutOfStackList = [...this.addOutOfStackList,addDrug]
            this.drugNum = this.drugNum+1
            this.innerVisible = false
            console.info(this.addOutOfStackList)
          } else {

          }
        });
      },
      editFormDrug(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let drug = this.drugList.find(item=>item.id === this.form.id)
            let receiver = this.receiverList.find(item=>item.id === this.form.receiver)
            let addDrug = {
              ...drug,
              addId:this.drugNum,
              drugId:this.form.id,
              drawNum:this.form.drowNum,
              receiver:this.form.receiver,
              receiverName:receiver.receiverName,
              money:floatMul(drug.unitPrice,this.form.drowNum),
              drawTime:this.$moment(new Date()).format('YYYY-MM-DD')
            }
            console.info(addDrug)
            let index = this.addOutOfStackList.findIndex(item=>item.addId===this.form.addId)
            console.info(index)
            let newList = [...this.addOutOfStackList]
            newList.splice(index,1,addDrug)
            this.addOutOfStackList = newList
            this.drugNum = this.drugNum+1
            this.innerVisible = false
            console.info(this.addOutOfStackList)
          } else {

          }
        });
      },
      deleteFormDrug(record){
        console.info(record)
        console.info(this.addOutOfStackList)
        let index = this.addOutOfStackList.findIndex(item=>item.addId === record.addId)
        let newList = [...this.addOutOfStackList]
        newList.splice(index,1)
        this.addOutOfStackList = newList
      },
      addOutOfStack(){
        const loading = this.$loading({
          lock: true,
          text: '处理中，请稍候……',
        });
        handleOutOfstackCreate(this.addOutOfStackList).then(res=>{
          console.info(res)
          if(res.result){
            this.$message({
              message: '出库成功！！',
              type: 'success'
            });
            this.dialogTableVisible = false
            loading.close();
            this.fetchOutOfStackList()
          }else{
            loading.close();
            this.$message({
              message: '出库失败，请稍后再试！！',
              type: 'error'
            });
          }
        })
      },
      editOutOfStack(){
        const loading = this.$loading({
          lock: true,
          text: '处理中，请稍候……',
        });
        handleOutOfstackUpdate({
          ...this.editForm,
          money: floatMul(this.editForm.drawNum,this.editForm.unitPrice)
        }).then(res=>{
          if(res.result){
            this.$message({
              message: '修改成功！！',
              type: 'success'
            });
            this.dialogTableEditVisible = false
            loading.close();
            this.fetchOutOfStackList()
          }else{
            loading.close();
            this.$message({
              message: '修改失败，请稍后再试！！',
              type: 'error'
            });
          }
        }).catch(()=>{
          loading.close();
          this.$message({
            message: '修改失败，请稍后再试！！',
            type: 'error'
          });
        })
      },
      deleteOutOfStack(record){
        this.$confirm('此操作将永久删除该出库记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '处理中，请稍候……',
          });
          handleOutOfstackDelete({id:record.id}).then(res=>{
            if(res.result){
              this.$message({
                message: '删除成功！！',
                type: 'success'
              });
              loading.close();
              this.fetchOutOfStackList()
            }else{
              loading.close();
              this.$message({
                message: '删除失败，请稍后再试！！',
                type: 'error'
              });
            }
          }).catch(()=>{
            loading.close();
            this.$message({
              message: '删除失败，请稍后再试！！',
              type: 'error'
            });
          })
        });
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(index===7){
            const values = data.map(item => Number(item[column.property]));
            console.info(values)
            let total = values.reduce((a,b)=>a+b,0)
            sums[index] = total
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      excelExport(){
        const url = '/api/outOfStack/ExcelDownload?drugName='+this.drugName
          +'&receiverName='+this.receiverName
          +'&startDate='+(this.catchDate.length>0?this.catchDate[0]:'')
          +'&endDate='+(this.catchDate.length>0?this.catchDate[1]:'')
        console.info(url)
        const a = document.createElement('a')
        a.href = url
        a.download = '销售明细.xls'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .out_of_stock_mian{
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

    .warehouse_add{
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-dialog{
        width: 1000px;
        height: 800px;
        margin: 0 !important;
        .drug_main_title{
          text-align: left;
          font-size: 18px;
        }
        .el-dialog__body{
          height: calc(100% - 124px);
          .main{
            height: 100%;
            font-size: 12px;
            padding: 0 10px;
            .main_add{
              display: flex;
              justify-content: flex-end;
              align-items: center;
              margin-bottom: 10px;
            }
            .main_table{
              height: calc(100% -50px);
            }
          }
        }
        .el-dialog__footer{
          .dialog-footer{
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .out_of_stack_edit_form{
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-dialog{
        width: 500px;
        height: 600px;
        margin: 0 !important;
        .drug_main_title{
          text-align: left;
          font-size: 18px;
        }
        .el-dialog__body{
          height: calc(100% - 124px);
          .main{
            height: 100%;
            font-size: 12px;
            padding: 0 10px;
          }
        }
        .el-dialog__footer{
          .dialog-footer{
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .out_of_stack_add_form{
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .el-dialog{
      width: 600px;
      height: 320px;
      margin: 0 !important;
      .drug_main_title{
        text-align: left;
        font-size: 18px;
      }
      .el-dialog__body{
        height: calc(100% - 124px);
        .main{
          font-size: 12px;
          padding: 0 10px;
        }
      }
      .el-dialog__footer{
        .dialog-footer{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
