<template>
    <div class="login-card">
        <el-card header="登录">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input type="text" v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default{
    data(){
        return {
            model:{}
        }
    },
    methods:{
        async login(){
            const res = await this.$http.post('login',this.model);
            localStorage.token = res.data.token;
            this.$router.push("/");
            this.$message({
                type:'success',
                message: "欢迎主人 "+res.data.username+" 回来!"
            })
        }
    }
}
</script>
<style>
.login-card{
    width: 50%;
    margin: 5rem auto;
}
</style>
