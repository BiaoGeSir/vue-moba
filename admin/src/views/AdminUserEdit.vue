<template>
  <div>
    <h1> {{id ? '编辑':'新建'}}管理员</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{}
  },
  data(){
    return {
      model:{},
    }
  },
  methods: {
    async save(){   //保存 or 修改
      let res;
      //如果名称为空，提示用户，程序不会往下执行
      if(this.model.username === undefined || this.model.username === ''){
        this.$message({
          type:'error',
          message:'用户名不能为空!'
        })
        return false;
      }
      //如果当前props有id,就修改，否则创建
      if(this.id){
        res = await this.$http.put(`rest/admin_users/${this.id}`,this.model);
      }else{
        res = await this.$http.post('rest/admin_users',this.model);
      }
      this.$message({
        type:'success',
        message:'保存成功'
      })
      this.$router.push('/admin_users/list')
    },
    async fetch(){  //查询单条数据
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created(){
    this.id && this.fetch()
  }
}
</script>

