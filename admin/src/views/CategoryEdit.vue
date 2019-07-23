<template>
  <div>
    <h1> {{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents:[]
    }
  },
  methods: {
    async save(){   //保存 or 修改
      let res;
      //如果名称为空，提示用户，程序不会往下执行
      if(this.model.name === undefined || this.model.name === ''){
        this.$message({
          type:'error',
          message:'名称不能为空!'
        })
        return false;
      }
      //如果当前props有id,就修改，否则创建
      if(this.id){
        res = await this.$http.put(`rest/categories/${this.id}`,this.model);
      }else{
        res = await this.$http.post('rest/categories',this.model);
      }
      this.$message({
        type:'success',
        message:'保存成功'
      })
      this.$router.push('/categories/list')
    },
    async fetch(){  //查询单条数据
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents(){ //查询全部数据，用于显示上级分类
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created(){
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>

