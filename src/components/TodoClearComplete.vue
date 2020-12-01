<template>
  <div>
    <button
        v-if="showclearall"
        class="btn btn-success"
        @click="clearcompleted"
    >
      Clear Completed
    </button>
  </div>
</template>

<script>
export default {
name: "TodoClearComplete",
 computed:{
    showclearall(){
      return this.$store.getters.showclearall;
    }
  },
  methods:{
    clearcompleted(){
      this.$store.dispatch('clearcompleted')
    }
  }
}
</script>

<style scoped>

</style>