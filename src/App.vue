<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><i class="ui home icon"></i> საწყისი</router-link> |
      <router-link to="/stats">სტატისტიკური ანალიზი</router-link> |
      <router-link to="/innerMargins">შიდა ზღვრები</router-link> |
      <router-link to="/itemNames">ტესტის დავალებები</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'bpg_Arial', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  margin: 10px 0;
  background-color: lightgray;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
