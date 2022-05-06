<template>
  <div>
    <NuxtLink to="/users">Users</NuxtLink>
    <NuxtLink to="/posts">Posts</NuxtLink>
  </div>
</template>

<script lang="ts">

export default ({
  name: 'IndexPage',
  head() {
    return {
      title: 'Home',
    }
  }
})
</script>
