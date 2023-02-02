<template>
<div>
    <h1>PAGE 2 - {{ $route.params.id }}</h1>
    <router-link to="/page-1">router-link to=""는 a태그</router-link>
    <br>
    <h2 @click="movePage('001')">@click page2-001</h2>
</div>
</template>

<script>
export default {
    path: '/',
    name: 'page-2',
    methods: {
        movePage(key) {
            this.$router.push('/page-2/' + key)
        }
    }
}
</script>

<style>
</style>