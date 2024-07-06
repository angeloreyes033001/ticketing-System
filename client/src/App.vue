<script setup>
  import { provide } from 'vue';
  import { loading } from '@/utils/useLoading';

  provide('useLoading', {loading});
</script>

<template>
  <main class="select-none" >
    <Toast />
    <RouterView />
  </main>
</template>