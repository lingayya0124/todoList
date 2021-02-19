<template>
  <div class="home">
    <div class="container d-flex justify-content-center">
      <div class="card mt-3 shadow-sm w-100">
        <div class="card-header bg-dark">
          <b-row>
            <b-col md="4">
              <h4 class="">Todo List</h4>
            </b-col>
            <b-col md="6">
              <h3>Welcome {{ name }}</h3>
            </b-col>
            <b-col md="">
              <b-button variant="outline-primary" @click="Logout"
                >Logout</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="card-body" style="background-color: #4caf50">
          <div class="input-container row mt-3" style="color: #4caf50">
            <input
              type="text"
              id="new_todo"
              class="form-control ml-3 col-9 validate"
              v-model="todo.title"
              @keyup.enter="addTodo"
            />
            <i
              class="fas fa-plus col-1 ml-2 fa-2x"
              style="color: yellow"
              @click="addTodo"
            ></i>
          </div>

          <ul class="list-group mt-3" style="color: #4caf50">
            <li
              class="list-group-item d-flex align-items-center justify-content-between"
              v-for="todo in todos"
              :key="todo.id"
              :class="{ fade: todo.isCompleted }"
            >
              <i
                class="fas fa-minus"
                style="color: yellow size:20px"
                @click="deleteToDo(todo.id)"
              ></i>
              {{ todo.title }}
              <span class="secondary-content">
                <label>
                  <input
                    type="checkbox"
                    class="filled-in"
                    :checked="todo.isCompleted"
                    @change="updateTodoItem(todo.id, $event)"
                  />
                  <span></span>
                </label>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      todos: [],
      todo: {
        title: "",
      },
      name: "",
    };
  },
  created() {
    this.getTodos();
  },
  beforeMount: function () {
    const user = firebase.auth().currentUser;
    if (user) {
      this.name = user.email.split("@")[0];
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    addTodo() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .add({
          title: this.todo.title,
          isCompleted: false,
        });
    },
    async getTodos() {
      var todosRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos");
      console.log(firebase.auth().currentUser);
      todosRef.onSnapshot((snap) => {
        this.todos = [];
        snap.forEach((doc) => {
          var todo = doc.data();
          todo.id = doc.id;
          this.todos.push(todo);
        });
      });
    },
    updateTodoItem(docId, e) {
      var isChecked = e.target.checked;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .update({
          isCompleted: isChecked,
        });
    },
    deleteToDo(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .delete();
    },
    Logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style scoped>
.fade {
  text-decoration: line-through;
  opacity: 0.4 !important;
}
</style>
