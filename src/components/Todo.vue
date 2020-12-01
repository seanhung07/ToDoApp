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
      <todo-check-all></todo-check-all>
      <todo-item-remain></todo-item-remain>
    </div>
    <div class="extra-container">
      <todo-filter></todo-filter>
      <todo-clear-complete></todo-clear-complete>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemRemain from "@/components/TodoItemRemain";
import TodoCheckAll from "@/components/TodoCheckAll";
import TodoFilter from "@/components/TodoFilter";
import TodoClearComplete from "@/components/TodoClearComplete";

export default {
  name: "Todo",
  components: {
    TodoClearComplete,
    TodoFilter,
    TodoCheckAll,
    TodoItemRemain,
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
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyremaining() {
      return this.$store.getters.anyremaining;
    },
    todosfilter() {
      return this.$store.getters.todosfilter;
    },
    showclearall() {
      return this.$store.getters.showclearall;
    },
  },
  methods: {
    addtodo() {
      if (this.newTodo.trim() == 0) {
        return;
      }
      this.$store.dispatch('addtodo',
          {
            id: this.idfortodo,
            title: this.newTodo,
          })
      this.newTodo = "";
      this.idfortodo++;
    },
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