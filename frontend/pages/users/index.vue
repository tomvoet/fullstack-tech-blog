<template>
  <div>
    <NuxtLink v-for="user in users" :key="user.username" :to="'/users/' + user.username">
      <div class="p-8 border-2 m-2">{{ user }}
        <div v-for="post in user.posts" :key="post.title">
          {{ post.title }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
  head() {
    return {
      title: 'Users',
    }
  },
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
    const users = body.data.users;
    return { users }
  }
}

</script>

<style>
</style>