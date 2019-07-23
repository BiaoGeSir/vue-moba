<template>
  <div>
    <h1> {{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basics">
        <el-tab-pane label="基础信息" name="basics">
            <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + 'upload'"
                :show-file-list="false"
                :on-success="afterUpload"
              >
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="model.categories" multiple>
                <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="难度">
              <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
            </el-form-item>
            <el-form-item label="技能">
              <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
            </el-form-item>
            <el-form-item label="攻击">
              <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
            </el-form-item>
            <el-form-item label="生存">
              <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
            </el-form-item>
            <el-form-item label="顺风出装">
              <el-select v-model="model.items1" multiple>
                <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风出装">
              <el-select v-model="model.items2" multiple>
                <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用技巧">
              <el-input type="textarea" v-model="model.usageTips"></el-input>
            </el-form-item>
            <el-form-item label="对抗技巧">
              <el-input type="textarea" v-model="model.battleTips"></el-input>
            </el-form-item>
            <el-form-item label="团战思路">
              <el-input type="textarea" v-model="model.teamTips"></el-input>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>新增技能</el-button>
          <el-row>
            <el-col :md=12 v-for="(item,i) in model.skills" :key=i>
                <el-form-item label="技能名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="技能图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + 'upload'"
                    :show-file-list="false"
                    :on-success="res => $set(item,'icon',res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="技能描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
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
      categories:[],
      items:[],
      model:{
        name:'',
        avatar:'',
        scores:{
          difficult:0
        }
      }
    }
  },
  methods: {
    afterUpload(res){
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url;
    },
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
        res = await this.$http.put(`rest/heroes/${this.id}`,this.model);
      }else{
        res = await this.$http.post('rest/heroes',this.model);
      }
      this.$message({
        type:'success',
        message:'保存成功'
      })
      this.$router.push('/heroes/list')
    },
    async fetch(){  //查询单条数据
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({},this.model,res.data)
    },
    async fetchCategories(){  //查询分类
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    async fetchItems(){  //查询装备
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created(){
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>
