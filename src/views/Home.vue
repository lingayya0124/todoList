<template>
  <div class="home">
    <div class="container d-flex justify-content-center">
      <div class="card mt-3 shadow-sm w-100">
        <div class="card-header bg-dark">
          <b-row class="row justify-content-around">
            <b-col md="4">
              <h4 class="">Todo List</h4>
            </b-col>
            <b-col md="6">
              <h3>Welcome {{ name }}</h3>
            </b-col>
            <b-col md="0">
              <b-button variant="outline-primary" @click="Logout"
                >Logout</b-button
              >
            </b-col>
          </b-row>
        </div>
        <div class="card-body" style="background-color: #4caf50">
          <div class="input-container row m-0 mt-3">
            <input
              type="text"
              id="new_todo"
              class="form-control col-md-11 validate"
              v-model="todo.title"
              @keyup.enter="addTodo"
            />
            <i
              class="fas fa-plus col-1 fa-2x"
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
              v-bind:style="{ backgroundColor: todo.color }"
            >
              <i
                class="fas fa-minus"
                style="color:  #4caf50 size:20px"
                @click="deleteToDo(todo.id)"
              ></i>
              <div class="col-sm-7" v-if="currentlyEditing !== todo.id">
                <input
                  disabled
                  type="text"
                  style="font-weight: bold color:white"
                  class="todo-item-label form-control col-xs-4 border-0"
                  v-model="todo.title"
                  value=" todo.title"
                  v-bind:style="{
                    backgroundColor: todo.color,
                  }"
                />
              </div>
              <div class="col-sm-7" v-else>
                <input
                  :disabled="disabled == 1"
                  type="text"
                  class="todo-item-label form-control col-xs-4"
                  v-bind:style="{ backgroundColor: todo.color }"
                  v-model="todoEditText"
                  value=" todoEditText"
                  @keyup.enter.prevent="updateTodoText(todo.id, $event)"
                />
                <div class="justify-content-center">
                  <b-button
                    class="mr-1"
                    variant="success"
                    @click="updateTodoText(todo.id, $event)"
                    >Save</b-button
                  >

                  <b-dropdown id="dropdown-1" text="Theme" class="m-xs-1">
                    <div class="btn-group-md bg-dark">
                      <b-dropdown-item
                        class="default d-flex justify-content-center"
                        v-on:click="
                          {
                            todo.color = todo.color = 'white';
                            theme(todo);
                          }
                        "
                      >
                        <i class="fas fa-circle blue" style="color: white"></i>
                      </b-dropdown-item>
                      <b-dropdown-item
                        class="d-flex"
                        v-on:click="
                          {
                            todo.color = todo.color = 'rgb(129, 172, 236)';
                            theme(todo);
                          }
                        "
                        ><i
                          class="fas fa-circle blue"
                          style="color: rgb(129, 172, 236)"
                        ></i
                      ></b-dropdown-item>
                      <b-dropdown-item
                        class="green"
                        v-on:click="
                          {
                            todo.color = todo.color = '#71d316';
                            theme(todo);
                          }
                        "
                        ><i class="fas fa-circle" style="color: #71d316"></i
                      ></b-dropdown-item>
                      <b-dropdown-item
                        class="red"
                        v-on:click="
                          {
                            todo.color = todo.color = '#f14628';
                            theme(todo);
                          }
                        "
                      >
                        <i class="fas fa-circle" style="color: #f14628"></i
                      ></b-dropdown-item>
                    </div>
                  </b-dropdown>
                </div>
              </div>

              <div class="row">
                <div v-if="disabled == 1 && todo.isCompleted == false">
                  <i class="fas fa-edit mr-2" @click="editTodo(todo)"></i>
                </div>
                <span class="secondary-content">
                  <label>
                    <input
                      :disabled="disabled == 0"
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
        color: "white",
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
    theme(todo) {
      var color = todo.color;
      var id = todo.id;

      console.log(color);
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(id)
        .update({
          color: color,
        });
    },
    editTodo(todo) {
      this.currentlyEditing = todo.id;
      this.todoEditText = todo.title;
      this.disabled = !this.disabled;
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
            color: this.todo.color,
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
          this.todos = this.todos.sort((b, a) => {
            return a.createdAt - b.createdAt;
          });
          console.log(this.todos);
        });
      });
    },
    updateTodoItem(docId, e) {
      console.log(docId);
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
      this.disabled = !this.disabled;

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
  opacity: 0.6 !important;
}
</style>
