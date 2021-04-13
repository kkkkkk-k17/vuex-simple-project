import { createStore } from "vuex";
import router from '../router'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      count: 2,
      token: localStorage.getItem('token'),
      users:[]
    };
  },
  getters: {
  },

  actions: {
    logIn({ commit }, data){
      axios.post('https://reqres.in/api/login', data)
          .then((response) => {
              commit("setToken", response.data.token)
              router.push("/")
          })
          .catch((error) => {
              console.log(error);
          });
    },
    getUsers({ commit }) {
      axios.get('https://reqres.in/api/users?page=1')
      .then((response) => {
        commit("setUsers", response.data.data)
       
    })
    }
    
  },
  mutations: {
    setToken (state, token)  {
      state.token = token;
      localStorage.setItem('token', token);
    },
    removeToken (state)  {
      state.token = null;
      localStorage.removeItem('token');
      router.push('/login')
    },
    setUsers(state, users) {
      state.users = users;
    }
  },
  
});

export default store;
