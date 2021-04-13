<template>
    <h1>please login</h1>
    <input placeholder="please enter your email" v-model="email">
    <input placeholder="please enter your password" v-model="password">
    <button @click="login">Login</button>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return {
                email: "eve.holt@reqres.in",
                password: "cityslicka",
            }
    },
        methods:{
            login(){
                this.$store.dispatch('login',
                    {email: this.email,
                    password: this.password})
            }
        }
    }
</script>
