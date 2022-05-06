<template>
    <div>{{ user }}</div>
</template>

<script lang="ts">

export default {
  head() {
    return {
      title: `${this.user.username}'s Profile`,
    }
  },
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
                username
                intro
                created_at
                posts {
                  title
                }
              }
            }
          `
      }),
    })
    const body = await result.json()
    const user = body.data.user;
    return { user }
  }
}


</script>

<style>
</style>