<template>
  <div>
    <h1> {{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="文章分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id"
          :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor 
        v-model="model.body"
        useCustomImageHandler 
        @imageAdded="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props:{
    id:{}
  },
  components: {
    VueEditor
  },
  data(){
    return {
      model:{},
      categories:[]
    }
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save(){   //保存 or 修改
      let res;
      //如果标题为空，提示用户，程序不会往下执行
      if(this.model.title === undefined || this.model.title === ''){
        this.$message({
          type:'error',
          message:'标题不能为空!'
        })
        return false;
      }
      //如果当前props有id,就修改，否则创建
      if(this.id){
        res = await this.$http.put(`rest/articles/${this.id}`,this.model);
      }else{
        res = await this.$http.post('rest/articles',this.model);
      }
      this.$message({
        type:'success',
        message:'保存成功'
      })
      this.$router.push('/articles/list')
    },
    async fetch(){  //查询单条数据
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories(){ //查询全部数据，用于显示上级分类
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created(){
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

