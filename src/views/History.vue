<template>
    <div class="about">
        <h1>History</h1>
        <div v-for="path in $store.state.history" :key="path">
<!--            <a :href="origin+path">{{origin+path}}</a>-->
            <router-link :to="origin+path">{{origin+path}}</router-link>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'History',
computed:{
            origin(){
                return  window.location.origin
            }

},


        mounted(){
            console.log(window.location)
        }
    }
</script>