<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="260"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="categoryName" label="类型"></el-table-column>
      <el-table-column prop="icon" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" circle @click="remove(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template> 

<script>
export default{
  data(){
    return {
      items:[],
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get('rest/heroes');
			//操作数据，把每个英雄对应的 类型名称找出来，并赋值给每条英雄数据里的categoryName属性
			res.data.forEach(item => {
				item.categoryName = item.categories.map(v => v.name).join(',');
			})
      this.items = res.data
    },
    async remove(row){   //删除单条数据
      this.$confirm(`是否确定要删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/heroes/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      })
    }
  },
  created(){
    this.fetch();
  }
}
</script>
