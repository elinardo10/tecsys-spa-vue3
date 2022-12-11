<template>
  <NavBar />
<Suspense>
  <router-view></router-view>
  </Suspense>
</template>

<script setup>
import NavBar from './components/Layout/NavBar.vue'
</script>
