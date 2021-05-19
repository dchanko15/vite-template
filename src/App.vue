<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <ui-icon class="material-icons-outlined">home</ui-icon>
        საწყისი
      </router-link>
      |
      <router-link to="/stats">სტატისტიკური ანალიზი</router-link>
      |
      <router-link to="/innerMargins">შიდა ზღვრები</router-link>
      |
      <router-link to="/itemNames">ტესტის დავალებები</router-link>
    </div>
    <div class="container">
      <keep-alive :include="['v-results', 'v-entrantScores','v-grantScores']" v-if="!$globalState.reload">
        <router-view/>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>
<script>
import UiIcon from 'keen-ui/src/UiIcon.vue'

export default {
  components: {
    UiIcon
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'bpg_Arial', Helvetica, Arial, sans-serif;
  font-size: 0.95rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  text-align: center;
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
