<template>
  <div class="header">
    <el-breadcrumb class="crumb">
      <!-- <el-breadcrumb-item>
        <div>
          <img src="../../assets/logo.png" alt="" />
        </div>
      </el-breadcrumb-item> -->
      <el-breadcrumb-item :to="{ path: '/' }">后台管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown class="setting">
      <span class="el-dropdown-link">
        <span>Welcome ! {{ admName }}</span>
        <i class="el-icon-setting el-icon--right"></i>
        系统设置
      </span>
      <el-dropdown-menu slot="dropdown">
        <template v-for="item in dropdown">
          <el-dropdown-item :key="item.text">
            <el-button type="text" @click="useClick(item.clickEvent)">
              {{ item.text }}
            </el-button>
          </el-dropdown-item>
        </template>
        <el-dropdown-item>
          <el-button type="text" @click="userLogout">退出登录</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import checkToken from "@/token/checkToken";
import dropdownItem from "@/assets/data/dropdown.json";
export default {
  data() {
    return {
      admName: "",
      role: "",
      dropdown: [],
      btnevent: ""
    };
  },
  methods: {
    userLogout() {
      //清除token
      this.$store.dispatch("userLogout");
      if (!this.$store.state.token) {
        this.$router.push("/login");
        this.$message.success("已退出");
      }
    },
    changeInfo() {
      this.$router.push("/changeInfo");
    },
    changePermission() {
      this.$router.push("/changePermission");
    },
    useClick(e) {
      switch (e) {
        case "changePermission":
          this.changePermission();
          break;
        case "changeInfo":
          this.changeInfo();
          break;
      }
    },
    addDropdown() {
      if (this.role === "admin") {
        this.dropdown = dropdownItem.admDropdown;
      } else {
        this.dropdown = dropdownItem.editorDropdown;
      }
    }
  },
  mounted() {
    this.addDropdown();
  },
  created() {
    let token = localStorage.getItem("token");
    let decoded = checkToken(token, "cysto");
    (this.admName = decoded.admName), (this.role = decoded.role);
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 60px;
  font-size: 16px;
  line-height: 60px;
  color: #666;
  background-color: #fff;
  box-shadow: -1px 0 7px 0 #ccc;
  display: flex;
  justify-content: space-between;
}

.header .crumb {
  width: 320px;
  line-height: 60px;
  text-align: left;
  margin-left: 10px;
}

.crumb {
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Semibold, sans-serif;
}
.crumb div {
  height: 45px;
  width: 45px;
  border: 1px solid #fffaf0;
  border-radius: 50%;
  padding: 3px;
  box-shadow: 0 0 10px #faebd7;
  background-color: #fffaf0;
}
.crumb img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: transparent;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}

.setting {
  margin-right: 130px;
  font-size: 16px;
  line-height: 60px;
}
</style>
