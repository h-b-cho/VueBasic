<template>
  <div>
    <h1>로그인</h1>
    <div>
      <span>아이디:</span>
      <span><input type="text" v-model="userInfo.member_id" /></span>
    </div>
    <div>
      <span>비밀번호:</span>
      <span><input type="password" v-model="userInfo.member_pw" /></span>
    </div>
    <div>
      <button type="button" @click="onLogin">로그인</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'page-4',
  data() {
    return {
      userInfo: {
        member_id: undefined,
        member_pw: undefined
      }
    }
  },
  methods: {
    onLogin() {
      this.$axios.get('http://103.124.103.199:8080/api/rest/check-login', {
        params: this.userInfo
      }).then(response => {
        if (response.data.sample_member_aggregate.aggregate.count > 0) {
          this.$axios.get('http://103.124.103.199:8080/api/rest/user-info', {
            params: this.userInfo
          }).then(response => {
            console.log("page4 onLogin - ", response)
            if (response.data.sample_member.length > 0) {
              localStorage.setItem("userInfo", JSON.stringify(response.data.sample_member[0]));
              this.$router.push('/');
            }
          })
        } else {
          alert('로그인정보가 틀렸습니다.');
        }
      })
    }
  }
}
</script>