<template>
  <div>
    <h1> {{id ? '编辑':'新建'}}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>新增广告位</el-button>
        <el-row>
          <el-col :md=12 v-for="(item,i) in model.items" :key=i>
              <el-form-item label="跳转链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="广告位图片">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top:1rem;">
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
      model:{
        items:[]
      }
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
        res = await this.$http.put(`rest/ads/${this.id}`,this.model);
      }else{
        res = await this.$http.post('rest/ads',this.model);
      }
      this.$message({
        type:'success',
        message:'保存成功'
      })
      this.$router.push('/ads/list')
    },
    async fetch(){  //查询单条数据
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({},this.model,res.data)
    }
  },
  created(){
    this.id && this.fetch()
  }
}
</script>
