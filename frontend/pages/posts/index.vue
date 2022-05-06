<template>
  <div>
    <NuxtLink v-for="post in posts" :key="post.cleaned_title" :to="'/posts/' + post.cleaned_title">
      <div class="p-8 border-2 m-2">{{ post }}

      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
  head() {
    return {
      title: 'Posts',
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
                posts {
                  id
                  title
                  cleaned_title
                  content
                  user {
                    username
                  }
                }
              }
            `
      }),
    })
    const body = await result.json()
    const posts = body.data.posts;
    return { posts }
  }
}

</script>

<style>
</style>