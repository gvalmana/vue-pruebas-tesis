<template>
    <div>
        <h1 v-if="loading.estado">{{loading.titulo}}</h1>
        <form v-else>
            <label for="username">Usuario:</label>
            <input type="text" id="username" v-model="username"/>{{user_error}}<br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password"/>{{password_error}}<br>
            <button type="submit" @click.prevent="login">Login</button>
        </form>
        
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
    name:'Login',
    data() {
        return {
            username:'',
            password:'',
            user_error:'',
            password_error:'',
        }
    },
    computed: {
        ...mapState(['loading'])
    },     
    methods: {
        ...mapMutations(['mostrarLoading','ocultarLoading']),        
        async login(){
            try {
                let user = {
                    username: this.username,
                    password: this.password
                }
                this.mostrarLoading({titulo:'Iniciando sessión...'})                
                await axios.post('http://localhost:3000/security/login', user)
                .then((res)=>{
                    //if successfull
                    if (res.data.access_token && res.status===200) {
                        localStorage.setItem('access_token',res.data.access_token)
                        this.$router.push('/')
                    }
                    this.user_error = res.data.username
                    this.password_error = res.data.password              
                })                     
            } catch (error) {
                console.log(error)
            } finally{
                this.ocultarLoading()                
            }
        }
    },
}
</script>