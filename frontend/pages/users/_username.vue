<template>
  <header>
    <div class="rounded-xl">Hallo</div>
    <NuxtLink class="text-2xl" to="/">Home</NuxtLink>
    {{ user }}
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
    async asyncData({params}: {params: {username: string}}) {
        const username = params.username
        var result = await fetch('http://localhost:4000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
              query { 
                user(username: "${username}") {
                  username,
                  intro,
                  created_at,
                  posts {
                    title,
                  }
                }
              }
            `
        }),
      })
      const body = await result.json()
      const user = body.data;
      return { user }
    }
}

</script>

<style>
</style>