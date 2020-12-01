<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyremaining" @change="allchecked"/>
      Check All
    </label>
  </div>
</template>

<script>
export default {
name: "TodoCheckAll",
  computed:{
    anyremaining() {
      return this.$store.getters.remaining
    }
  },
  methods:{
    allchecked(){
      this.$store.dispatch('checkall',event.target.checked)
    }
  }
}
</script>

<style scoped>

</style>