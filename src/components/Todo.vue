<template>
  <div>
    <input
        type="text"
        class="todo-input"
        placeholder="Add to the list"
        v-model="newTodo"
        @keyup.enter="addtodo"
    />
    <transition-group name="fade">
      <todo-item
          v-for="todo in todosfilter"
          :key="todo.id"
          :todo="todo"
          :checkAll="!anyremaining"
      >
      </todo-item>
      >
    </transition-group>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyremaining" @change="checkall"/>
          Check All
        </label>
      </div>
      <div>{{ remaining }} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button
            class="btn btn-secondary mr-1"
            :class="{ active: filter == 'all' }"
            @click="filter = 'all'"
        >
          ALL
        </button>
        <button
            class="btn btn-secondary mr-1"
            :class="{ active: filter == 'active' }"
            @click="filter = 'active'"
        >
          Active
        </button>
        <button
            class="btn btn-secondary mr-1"
            :class="{ active: filter == 'completed' }"
            @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>
      <div>
        <button
            v-if="showclearall"
            class="btn btn-success"
            @click="clearcompleted"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: "Todo",
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      idfortodo: 2,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          'id': 1,
          'title': "Default Item (Delete first)",
          'completed': false,
          'edit': false,
        },
      ],
    };
  },
  created() {
    eventBus.$on('removetodo',(index)=>this.removetodo(index))
    eventBus.$on('finishedEdit',(data)=>this.finishedEdit(data))
  },
  computed: {
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyremaining() {
      return this.remaining != 0;
    },
    todosfilter() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showclearall() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
  },
  methods: {
    addtodo() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      this.todos.push({
        id: this.idfortodo,
        title: this.newTodo,
        completed: false,
        edit: false
      });
      (this.newTodo = ""), this.idfortodo++;
    },
    removetodo(id) {
      const index =this.todos.findIndex((item)=>item.id == id)
      this.todos.splice(index, 1);
    },
    edittodo(todo) {
      this.beforeEditCache = todo.title;
      todo.edit = true;
    },
    donetodo(todo) {
      if (todo.title.trim() == "") {
        todo.title = this.todo.beforeEditCache;
      }
      todo.edit = false;
    },
    canceledit(todo) {
      todo.title = this.beforeEditCache;
      todo.edit = false;
    },
    checkall() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    clearcompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
    finishedEdit(data) {
      const index =this.todos.findIndex((item)=>item.id == data.id)
      this.todos.splice(index, 1, data)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  font-size: 30px;
  margin-left: 14px;

  &:hover {
    color: red;
  }
}

.todo-list-left {
  display: flex;
  align-items: center;
}

.todo-list-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-list-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: red;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 16px;
  margin-bottom: 14px;
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter, .fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>