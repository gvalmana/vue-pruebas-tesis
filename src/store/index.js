import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
//import {mapEstudianteVtoAPI, mapEstudianteAPItoV} from '../mappers/estudiantes.map.js'
import estudiantes from '../modules/estudiantes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      titulo:'',
      estado:false
    },
    dismissSecs: 5,
    dismissCountDown: 0,
    mensaje:{color:'', texto:''}
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.titulo = payload.titulo
      state.loading.estado = true
    },
    ocultarLoading(state){
      state.loading.estado = false
    },
    countDownChanged(state,payload){
      state.dismissCountDown = payload
    },
    showAlert(state,payload){
      state.mensaje.color=payload.color
      state.mensaje.texto=payload.texto
      state.dismissCountDown = state.dismissSecs
    }
  },
  actions: {

  },
  getters: {},
  modules: {
    estudiantes
  }
})
