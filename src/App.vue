<template>
  <div id="app">
    <div class="navbar">
      <NavbarComponent />
    </div>
    <div class="views">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
#app {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.navbar {
  width: 7%;
  height: 100%;
}

.views {
  width: 93%;
  height: 100%;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
