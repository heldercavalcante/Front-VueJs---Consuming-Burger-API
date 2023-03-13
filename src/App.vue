<template>
  <Navbar :logo="logo_src" :alt="app_name"/>
  <router-view/>
  <FooterComponent/>
</template>
<script>
import Navbar from './components/Navbar.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    Navbar,
    FooterComponent
  },
  data() {
    return {
      logo_src: '/img/logo.png',
      app_name: 'Make Your Burger'
    }
  },
}
</script>
<style>
  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box; /*so that the inputs do not exceed the maximum width */
  }

  .main-container {
    margin: 50px;
    min-height: 250px;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 32px;
    color: #222;
  }
</style>
