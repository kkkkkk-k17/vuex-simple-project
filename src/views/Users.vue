<template>
    <div class="users">
        <div>
            Users
        </div>
        <table>
            <tr>
                <th v-for="(colum,index) in colums" :key="index">{{colum}}</th>
                <th></th>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <th v-for="(colum,index) in colums" :key="index">
                    <img :src="user[colum]" v-if="colum==='avatar'" alt="">
                    <span v-else>{{user[colum]}}</span></th>
                    <th><button @click='openUser(user.id)'>View</button></th>
                    <th><button @click='deleteUser(user.id)'>Delete</button></th>

            </tr>

        </table>

    </div>
</template>

<script>

    export default {
        name: 'Home',
        data() {
            return {
                title: "Users"
            }
        },
        methods: {
            openUser(id){
                this.$router.push(`/users/${id}`)
            },
            deleteUser(id){
                this.$store.dispatch('deleteUser',id)
            }
        },
        mounted() {
          if (!this.$store.state.users.length)
            this.$store.dispatch('getUsers')
        },

        computed: {
            users() {
                return this.$store.state.users
            },
            colums() {

                if (this.users.length !== 0) {
                    return Object.keys(this.users[0])
                } else {
                    return []
                }
            }
        }
    }
</script>


<style scoped>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>