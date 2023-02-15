<template>
  <div>
    <h1>ToDo List</h1>
    <div>
      <div v-if="userInfo">
        <input type="text" v-model="todo.contents" />
        <button type="button" @click="onWrite">등록</button>
      </div>

      <table border="1" width="500px">
        <template v-if="todoList.length > 0">
          <tr v-for="(item, index) in todoList" :key="index">
            <td>
              <div>
                <div v-if="userInfo.member_no === item.create_member_no && item.edit">
                  <input type="text" v-model="item.contents" />
                  <button type="button" @click="onModify(item, index)">onModify</button>
                  <button type="button" @click="onCancel">onCancel</button>
                </div>
                <div v-else>
                  <div class="contents">
                    {{ item.contents }}
                  </div>
                  <div v-if="userInfo && userInfo.member_no === item.create_member_no" class="contents-button">
                    <button type="button" @click="onModifyForm(index)">onModifyForm</button>
                    <button type="button" @click="onRemove(item)">onRemove</button>
                  </div>
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
  </div>
</template>
<script>
export default {
  name: 'page-5',
  data() {
    return {
      userInfo: undefined,
      todoList:[],
      todo: {
        contents: undefined,
        create_member_no: undefined
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setUserInfo();
    this.getTodoList();
  },
  methods: {
    onWrite() {
      if (this.todo.contents) {
        this.$axios.post("http://103.124.103.199:8080/api/rest/todos", this.todo).then(() => {
          this.getTodoList();
          this.todo.contents = this.$options.data().todo.contents;
        })
      } else {
        alert("내용을 입력해주세요.");
      }
    },
    onModifyForm(index) {
      this.todoList[index].edit = true;
      this.$forceUpdate();
    },
    onModify(item, index) {
      if (this.todoList[index].contents) {
        const param = {
          contents: item.contents,
          update_member_no: this.userInfo.member_no
        }
        this.$axios.put(`http://103.124.103.199:8080/api/rest/todos/${item.no}`, param).then(() => {
          this.getTodoList();
        })
      } else {
        alert("내용을 입력해주세요.");
      }
    },
    onCancel() {
      this.todoList.map(o => {
        return o.edit = false;
      });
      this.$forceUpdate();
    },
    onRemove(item) {
      if (confirm("삭제하시겠습니까?")){
        this.$axios.delete(`http://103.124.103.199:8080/api/rest/todos/${item.no}`).then(() => {
          this.getTodoList();
        })
      }
    },
    setUserInfo() {
      if (this.userInfo) {
        this.todo.create_member_no = this.userInfo.member_no;
        console.table(this.userInfo);
      }
    },
    getTodoList() {
      this.$axios.get("http://103.124.103.199:8080/api/rest/todos").then(response => {
        this.todoList = response.data.sample_todo;
        this.todoList.map(o => {
          return o.edit = false;
        })
      });
    }
  },
}
</script>
<style>
table {
  width: 100%;
  margin: 1rem auto;
  text-align: center;
}
.contents {
  margin: 0 auto;
  display: inline-block;
}
.contents-button {
  display: inline-block;
}
</style>