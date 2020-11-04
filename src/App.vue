<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.jpg" class="logo">
    <Todo></Todo>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Todo from './components/Todo.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Todo
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
.container{
  max-width: 600px;
  margin: 0 auto;
}
.logo{
  display: block;
  margin: 30px auto;
  height: 105px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
