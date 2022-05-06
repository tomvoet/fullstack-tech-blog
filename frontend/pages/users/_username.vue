<template>
  <div class="text-center">
    <h1 class="text-3xl">{{ user.username }}</h1>
    <div class="w-28 h-28 rounded-full bg-yellow-300 m-auto" />
    {{ user.intro }}<br>
    <NuxtLink class="p-2 bg-gray-200 m-3 hover:bg-gray-300" v-for="post in user.posts" :key="post.title"
      :to="'/posts/' + post.cleaned_title">
      {{ post.title }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">

export default {
  name: 'userPage',
  head(): { title: string } {
    return {
      //@ts-ignore
      title: `${this.user.username}'s Profile`,
    }
  },
  async asyncData({ params }: { params: { username: string } }): Promise<{ user: { object: any } }> {
    const username: string = params.username
    var result: Response = await fetch('http://localhost:4000/api', {
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
                  cleaned_title
                }
              }
            }
          `
      }),
    })
    const body: { data: { user: any } } = await result.json()
    const user: { object: any } = body.data.user;
    return { user }
  }
}


</script>

<style>
</style>