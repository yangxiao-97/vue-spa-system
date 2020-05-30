<template>
  <div class="bg">
    <!-- 绘制登录盒子 -->
    <div class="flex-container">
      <div class="login">
        <!-- 绘制企业logo -->
        <div class="avatar_box">
          <img src="../../../assets/logo.png" alt="" />
        </div>
        <el-tabs class="tabs">
          <el-tab-pane label="登录">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item label="用户名" prop="userName" label-width="80px">
                <el-input
                  placeholder="请输入用户名"
                  v-model="loginForm.userName"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" label-width="80px">
                <el-input
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                  clearable
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="80px">
                <el-button type="primary" @click="submitForm('loginForm')"
                  >登录</el-button
                >
                <el-button @click="clearForm('loginForm')">重置</el-button>
              </el-form-item>
              <el-form-item label-width="30px"> </el-form-item>
              <el-form-item label-width="30px"> </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <register></register>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import instance from "@/axios";
import Register from "./Register.vue";
import createToken from "@/token/createToken";
import checkToken from "@/token/checkToken";
export default {
  data() {
    return {
      rules: {
        //表单验证规则
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20个字符",
            trigger: "blur"
          }
        ]
      },
      loginForm: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    updateToken(token, admName) {
      instance
        .post("api/admin/updateToken", {
          token,
          admName
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$router.push("/home");
          } else {
            this.$store.dispatch("userLogout");
            this.$router.push("/login");
            this.$message.info("无效登录");
          }
        })
        .catch(err => console.log(err));
    },
    submitForm(formName) {
      let admName = this.loginForm.userName;
      let admPassword = this.loginForm.password;
      //先调用登录表单实例对象的validate方法，对表单内容进行预验证
      // valid为validate函数接收的回调函数的第一个形参，表示验证的结果
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过
          axios
            .post("api/admin/login", {
              admName,
              admPassword
            })
            //返回res为一个promise对象
            .then(res => {
              if (res.data.code === 400) {
                this.$message.info("用户名不存在或密码错误");
              }
              if (res.data.code === 200) {
                this.$store.dispatch("userLogin", res.data.user[0].token);
                this.$message.success("登录成功");
                //根据返回的用户名和角色创建新的token
                const role = res.data.user[0].role;
                const newToken = createToken(admName, role);
                this.updateToken(newToken, admName);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //添加表单重置方法
    clearForm(formName) {
      // this为当前组件对象，其中包含属性$refs，$refs的值$refs[formName]即为登录表单的实例对象
      this.$refs[formName].resetFields();
    }
  },
  components: {
    Register
  }
};
</script>

<style>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: -webkit-linear-gradient(top left, #b0dfe5, #e5b6b0);
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-container {
  width: 480px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  margin: 0 auto;
  border-radius: 5px;
}
.avatar_box {
  position: absolute;
  left: 50%;
  top: -38%;
  transform: translate(-50%, -50%);
  height: 138px;
  width: 138px;
  border: 1px solid #fffaf0;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #faebd7;
  background-color: #fffaf0;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: transparent;
}
.login {
  position: relative;
  width: 300px;
  height: 282px;
}
.flex-container .el-button--primary {
  color: #fff;
  background-color: #ff4475;
  border-color: #ff4475;
}
.flex-container .el-tabs__item.is-active {
  color: #ff4475;
}
.flex-container .el-tabs__active-bar {
  background-color: #ff4475;
}
.flex-container .el-tabs__item:hover {
  color: #ff4475;
}
.flex-container .el-form-item--mini.el-form-item,
.flex-container .el-form-item--small.el-form-item {
  margin-bottom: 23px;
}
.flex-container .el-tabs__header {
  margin: 0 0 23px;
}
</style>
