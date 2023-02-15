<template>
  <div>
    <h1>회원가입</h1>
    아이디: <input type="text" v-model="userInfo.member_id" />
    비밀번호: <input type="text" v-model="userInfo.member_pw" />
    <!-- 비밀번호 확인: <input type="text" v-model="userInfo.member_pw_confirm" /> -->
    이름: <input type="text" v-model="userInfo.member_nm" />
    핸드폰 번호: <input type="text" v-model="userInfo.member_phone" />
    이메일 주소: <input type="text" v-model="userInfo.member_email" />
    <button type="button" @click="onJoin">회원가입</button>
  </div>
</template>
<script>
export default {
  name: 'page-3',
  data() {
    return {
      userInfo: {
        member_id: undefined,
        member_pw: undefined,
        // member_pw_confirm: undefined,
        member_nm: undefined,
        member_phone: undefined,
        member_email: undefined
      }
    }
  },
  methods: {
    onJoin() {
      this.$axios.post('http://103.124.103.199:8080/api/rest/join-member', this.userInfo)
			.then(response => {
        if (response.status === 200 ) { // or 업무적으로 성공 코드를 따로 정함
					alert('회원가입이 되었습니다.');
					this.$router.push('/')
				} else { 
					alert(response.statusText); 
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