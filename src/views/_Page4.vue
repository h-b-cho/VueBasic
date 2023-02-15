<template>
  <div>
    <h1>로그인</h1>
    아이디: <input type="text" v-model="userInfo.member_id" /><br>
    비밀번호: <input type="text" v-model="userInfo.member_pw" /><br>
    <button type="button" @click="onLogin">로그인</button>
  </div>
</template>
<script>
export default {
  name: 'page-4',
  data() {
    return {
      userInfo: {
        member_id: undefined,
        member_pw: undefined,
      }
    }
  },
  methods: {
    onLogin() {
      this.$axios.get('http://103.124.103.199:8080/api/rest/check-login', {
        params: this.userInfo
        // 이는 아래와 동일하다.
        // params: {
        //   member_id: this.userInfo.member_id,
        //   member_pw: this.userInfo.member_pw 
        // }
            // 양방향 : 암호화, 복호화 한 데이터를 조회
      })
			.then(response => {
        if (response.data.sample_member_aggregate.aggregate.count > 0) { // response.data 실제 응답값으로 넘어오는 부분
					alert('로그인 되었습니다.');
          this.$axios.get('http://103.124.103.199:8080/api/rest/user-info', {
            params: this.userInfo
          })
          .then(response => {
            if (response.data.sample_member.length > 0) {
              console.log("page4 onLogin - ", localStorage);
              localStorage.setItem("userInfo", JSON.stringify(response.data.sample_member[0])); // <-- javascript localStorage.setItem()
              // JSON.parse(.....
              this.$router.push('/');
            }
          })
				} else { 
					alert('로그인을 실패했습니다.');
				}					
      })
			.catch(error => {
				if (error) {
					this.$router.push('/404')
				}
			})
    }
  }
}
</script>