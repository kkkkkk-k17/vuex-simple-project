import {createStore} from 'vuex'
import axios from "axios";
import router from '../router';

const store = createStore({
    state: {
        token: localStorage.getItem("token"),
        users: [],
        history:[]
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token);
        },
        removeToken(state) {
            state.token = null
            localStorage.removeItem("token")
            router.push("/login")
        },
        setUsers(state, users) {
            state.users = users

        },
        updateUser(state, data) {


            let userIndex = state.users.findIndex(item => item.id === +data.id);
            state.users.splice(userIndex, 1, {
                ...state.users[userIndex], first_name: data.name.split(' ')[0],
                last_name: data.name.split(' ')[1]
            })
            console.log(state.users)


        },
        deleteUser(state, id) {
            let userIndex = state.users.findIndex(item => item.id === +id);
            state.users.splice(userIndex, 1)
        },
        addToHistory(state,path){
            state.history.push(path)
        }
    },

    actions: {
        getUsers({commit}) {
            axios.get('https://reqres.in/api/users?page=1')
                .then((response) => {
                    commit("setUsers", response.data.data.map((user) => {
                        return {...user, randomNumber: Math.random()}
                    }))
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        login({commit}, data) {
            axios.post('https://reqres.in/api/login', data)
                .then((response) => {
                    commit("setToken", response.data.token)
                    router.push("/")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateUser({commit}, data) {
            axios.put(`https://reqres.in/api/users/${data.id}`, data)
                .then((response) => {
                    const user = {
                        name: response.data.name,
                        id: data.id
                    }
                    commit("updateUser", user)


                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteUser({commit}, id) {
            axios.delete(`https://reqres.in/api/users/${id}`)
                .then(() => {
                    commit("deleteUser", id)
                    console.log(router.currentRoute.value.path)
                    if(router.currentRoute.value.path!=="/users"){
                        router.push('/users')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }
})

export default store