<template>
  <div class="home">
    <h1 v-if="this.userInfo">{{ this.userInfo.member_nm }}</h1> 
    <!-- 마크업 영역에서는 this.userI.. 의 this가 생략되어도 무방하다! 
      <h1 v-if="userInfo">{{ userInfo.member_nm }}</h1> 
    -->
    <h2 v-else>로그인이 필요합니다</h2>
    <button v-if="this.userInfo" type="button" @click="onLogout">로그아웃</button>
    <button v-else type="button" @click="onLogin">로그인</button>
    <br>
    <br>
    <br>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      userInfo: undefined
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(localStorage);
  },
  methods: {
    onLogin() {
      this.$router.push("/page-4");
    },
    onLogout() {
      localStorage.removeItem("userInfo");
      this.userInfo = this.$options.data().userInfo; //this.$options.data() <-- 바로 위에 export default { date(){} }로 선언해준 값, 즉 초기값으로 되돌리는 작업이다. 로그아웃이니까!
    }
  }
}
</script>
