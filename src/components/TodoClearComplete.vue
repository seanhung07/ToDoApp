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
  props:{
    showclearall:{
      type:Boolean,
      required: true,
    }
  },
  methods:{
    clearcompleted(){
      eventBus.$emit("clearcompleted")
    }
  }
}
</script>

<style scoped>

</style>