<template>
  <div>
    <h1>TODO</h1>
    <input type="text" placeholder="할일 내용 입력" v-model="todo.contents" />
    <button type="button" @click="onWrite">등록</button>
    <table>
      <template v-if="this.todo">
        <tr v-for="(item, index) in todoList" :key="index">
          <td>

            <div>
              <div class="contents">
                {{ item.contents }}
              </div>
              <div v-if="userInfo && userInfo.member_no === item.create_member_no" class="contents-button">
                <button type="button" @click="onModifyForm(index)">수정</button>
                <button type="button" @click="onRemove(item)">삭제</button>
              </div>
            </div>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td>등록된 내용이 없습니다.</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'page-5',
  data() {
    return {
      userInfo: undefined,
      todoList: [],
      todo : {
        contents: undefined,
        create_member_no: undefined,
      }
    }
  },
  created(){
    this.$axios.get('http://103.124.103.199:8080/api/rest/todos', {
      params: this.todo
    })
    .then(response => {
      if (response.data.sample_todo.no > 0) {
        
      } else {
        
      }
    })
    .catch(error => {
      if (error) {
        this.$router.push('/404')
      }
    })
  },
  methods: {
    onWrite() {
      this.$axios.post('http://103.124.103.199:8080/api/rest/todos', this.todo)
      .then(response => {
        if (response.data.insert_sample_todo.returning[0].no > 0) {
          this.$axios.get('http://103.124.103.199:8080/api/rest/todos', {
            params: this.todo
          })
          .then(response => {
            localStorage.setItem("this.todo.contents", JSON.stringify(response.data.insert_sample_todo[0]));
            localStorage.setItem("this.todo.create_member_no", JSON.stringify(response.data.userInfo.member_no));
            alert('할일이 등록되었습니다.');
          })
				} else { 
					alert('할일 등록이 실패했습니다.');
				}
      })
			.catch(error => {
				if (error) {
					this.$router.push('/404');
				}
			})
    },
  }
}
</script>
<style>
table {
  width: 100%;
  text-align: center;
}
.contents {
  display: inline-block;
  margin: 0 auto;
}
.contents-button {
  display: inline-block;
}
</style>