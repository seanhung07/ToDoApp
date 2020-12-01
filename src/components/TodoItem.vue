<template>
  <div class="todo-item">
    <div class="todo-list-left">
      <input type="checkbox" v-model="completed" @change="donetodo"/>
      <div
          v-if="!edit"
          @dblclick="edittodo"
          class="todo-list-label"
          :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
          v-else
          type="text"
          v-model="title"
          class="todo-list-edit"
          @blur="donetodo"
          @keyup.enter="donetodo"
          @keyup.esc="canceledit"
          v-focus
      />
    </div>
    <div class="remove-item" @click="removetodo(todo.id)">
      &times;
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      edit: this.todo.edit,
      beforeEditCache: "",
    };
  },
  watch: {
    checkAll() {
      //   if(this.checkAll){
      //       this.completed =true
      //   }else{
      //       this.completed = this.todo.completed
      //   }
      this.completed = this.checkAll ? true : this.todo.completed
    }

  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus();
      },
    },
  },
  methods: {
    removetodo(id) {
      this.$store.dispatch('deletetodo', id)
    },
    edittodo() {
      this.beforeEditCache = this.title;
      this.edit = true;
    },
    donetodo() {
      if (this.title.trim() == "") {
        this.title = this.todo.beforeEditCache;
      }
      this.edit = false;
      this.$store.dispatch('updatetodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'edit': this.edit
      } )
    },
    canceledit() {
      this.title = this.beforeEditCache;
      this.edit = false;
    },
  },
};
</script>
