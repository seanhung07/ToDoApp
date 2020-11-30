<template>
  <div>
    <button
        class="btn btn-secondary mr-1"
        :class="{ active: filter == 'all' }"
        @click="changeFilter('all')"
    >
      ALL
    </button>
    <button
        class="btn btn-secondary mr-1"
        :class="{ active: filter == 'active' }"
        @click="changeFilter('active')"
    >
      Active
    </button>
    <button
        class="btn btn-secondary mr-1"
        :class="{ active: filter == 'completed' }"
        @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
name: "TodoFilter",
  data(){
    return{
      filter : 'all',
    }
  },
  methods:{
    changeFilter (filter){
      this.filter = filter,
          eventBus.$emit('filterchanged', filter)
    }
  }
}
</script>

<style scoped>

</style>