<template>
  <header>
    <div class="rounded-xl">Hallo</div>
    <NuxtLink to="/">Home</NuxtLink>
    {{ user_id }}
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
    async asyncData({params}) {
        const user_id = params.id
        return { user_id }
    }
}

</script>

<style>
</style>