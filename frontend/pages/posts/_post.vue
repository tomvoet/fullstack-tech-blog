<template>
    <div>{{ post }}</div>
</template>

<script lang="ts">

export default {
  head() {
        return {
            title: this.post.title,
        }
    },
  async asyncData({params}: {params: {post: string}}) {
      const cleaned_title = params.post
      var result = await fetch('http://localhost:4000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query { 
              post (cleaned_title: "${cleaned_title}") {
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
    console.log(body)
    const post = body.data.post;
    return { post }
  }
}


</script>

<style>
</style>