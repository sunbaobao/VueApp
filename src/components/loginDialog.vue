<template>
  <el-dialog title="登陆" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
        <el-col :span="18">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="6">
          <img :src="captchaImg" alt="" @click="reloadCaptha()" class="captcha">
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "loginDialog",
    data() {
      return {
        // dialogFormVisible: false,
        form: {
          name: '',
          password: '',
          code: ''
        },
        captchaImg: '/server/common/captcha',
        formLabelWidth: '120px',
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.axios.post("/user/sign/in", {
              username: this.form.name,
              password: this.form.password,
              code: this.form.code
            }).then((data) => {
              // console.log(data);
              let res = data.data;
              if (res.meta.code === 0) {
                //正确
                this.$store.commit("changeAuth", {
                  Authorization: res.data.token
                });
                this.$store.commit("changeLogin", false);
                this.$store.commit('updateUser', res.data.user);
                this.$router.go(0)
              } else {
                this.$message({
                  showClose: true,
                  message: res.meta.message,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      reloadCaptha() {
        this.captchaImg = '/server/common/captcha?time=' + new Date().getTime();
      }
    },
    computed: {
      dialogFormVisible() {
        return this.$store.state.dialogFormVisible
      }
    }
  };
</script>

<style scoped>
  .captcha {
    height: 40px;
    width: 100%;
  }
</style>
