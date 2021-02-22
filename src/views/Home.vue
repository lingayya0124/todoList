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
            <b-col md="0">
              <b-button variant="outline-primary float-right" @click="Logout"
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
              <div class="col-sm-7" v-if="currentlyEditing !== todo.id">
                <input
                  disabled
                  type="text"
                  class="todo-item-label form-control col-xs-4 border-0"
                  v-model="todo.title"
                  value=" todo.title"
                />
              </div>
              <div class="col-sm-7" v-else>
                <input
                  :disabled="disabled == 0"
                  type="text"
                  class="todo-item-label form-control col-xs-4"
                  v-model="todoEditText"
                  value=" todoEditText"
                  @keyup.enter.prevent="updateTodoText(todo.id, $event)"
                />
                <b-button
                  class="col"
                  variant="outline-success float-right"
                  @click="updateTodoText(todo.id, $event)"
                  >Save</b-button
                >
              </div>

              <div>
                <i class="fas fa-edit mr-2" @click="editTodo(todo)"></i>

                <span class="secondary-content">
                  <label>
                    <input
                      disabled
                      type="checkbox"
                      class="filled-in"
                      :checked="todo.isCompleted"
                      @change="updateTodoItem(todo.id, $event)"
                    />
                    <span></span>
                  </label>
                </span>
              </div>
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
      disabled: 1,
      check: true,
      todos: [],
      currentlyEditing: null,
      todoEditText: "",
      todo: {
        title: "",
      },
      name: "",
    };
  },
  created() {
    this.getTodos();
    this.disabled = this.disabled;
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
    editTodo(todo) {
      this.currentlyEditing = todo.id;
      this.todoEditText = todo.title;

      console.log(this.todoEditText);
      console.log(this.currentlyEditing);
    },
    addTodo() {
      if (!this.todo.title == "") {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("todos")
          .add({
            title: this.todo.title,
            createdAt: new Date(),
            isCompleted: false,
          });
        this.todo.title = "";
      } else {
        alert("Add Something");
      }
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
    updateTodoText(docId, e) {
      var text = this.todoEditText;

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .update({
          title: text,
        });
      this.currentlyEditing = null;

      this.getTodos();
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
