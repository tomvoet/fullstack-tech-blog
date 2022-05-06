<template>
  <div>
    <h1 class="text-4xl">{{ post.title }}</h1>
    <span>{{ post.created_at.toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
    <h4 class="text-xl">written by <NuxtLink :to="'/users/' + post.user.username">{{ post.user.username }}</NuxtLink>
    </h4>
    <div>
      {{ post.content }}
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'postPage',
  head(): { title: string } {
    return {
      //@ts-ignore
      title: this.post.title,
    }
  },
  async asyncData({ params }: { params: { post: string } }): Promise<{ post: { object: any } }> {
    const cleaned_title: string = params.post
    var result: Response = await fetch('http://localhost:4000/api', {
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
                created_at
                user {
                  username
                }
              }
            }
          `
      }),
    })
    const body: { data: { post: any } } = await result.json()
    const date: Date = new Date(parseInt(body.data.post.created_at))
    const post: any = body.data.post;
    post.created_at = date
    return { post }
  }
}


</script>

<style>
</style>