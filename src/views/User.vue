<template>
  <form v-if="user">
    <input type="text" v-model="user.id" disabled /><br />
    <input type="text" v-model="user.email" :disabled="disabled" /><br />
    <input type="text" v-model="user.last_name" :disabled="disabled" /><br />
    <input type="text" v-model="user.first_name" :disabled="disabled" /><br />
    <input type="text" v-model="user.avatar" :disabled="disabled" /><br />
  </form>
  <button @click="disabled = false">Edit</button>
  <button @click="updateUser">Update</button>
  <button @click="deleteUser(user.id)">Delete</button>


</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      user: this.$store.state.users.find((item) => item.id === +this.id),
    };
  },
  props: ["id"],
  name: "User",
  mounted() {
    if (!this.$store.state.users.length) {
      this.$store.dispatch("getUsers");
    }
  },
  watch:{
      "$store.state.users"(users){
              console.log( this.$store.state.users.find((item) => item.id === +this.id));
          if(users.length ){
            this.user = this.$store.state.users.find((item) => item.id === +this.id)
          }
      }
  },
  methods: {
    updateUser() {
      const jobs = ['Travel agent', 'Bond 007', 'Katea  programer ']
      let randomIndex = Math.floor(Math.random()*jobs.length);
          if (randomIndex < jobs.length -1) {
            randomIndex++
          }
      console.log(this.user)
      const data = {
            id: this.id,
        name: this.user.first_name + ' ' + this.user.last_name,
        job: jobs[randomIndex]
      }
      console.log(this.id)
      this.$store.dispatch('updateUser', data)



    },
    deleteUser(id){
      this.$store.dispatch('deleteUser',id)


    }
  }
};
</script>
