<template>
    <div>{{ users }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
    async asyncData() {
        var result = await fetch('http://localhost:4000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
              query { 
                users {
                  username,
                  intro,
                  posts {
                    title,
                  }
                }
              }
            `
        }),
      })
      const body = await result.json()
      const users = body.data;
      return { users }
    }
}

</script>

<style>
</style>