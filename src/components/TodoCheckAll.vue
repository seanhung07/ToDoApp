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
  props:{
    anyremaining:{
      type:Boolean,
      required:true,

    }
  },
  methods:{
    allchecked(){
      eventBus.$emit('checkall',this.anyremaining)
    }
  }
}
</script>

<style scoped>

</style>