import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {mapEstudianteVtoAPI, mapEstudianteAPItoV} from '../mappers/estudiantes.map.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      titulo:'',
      estado:false
    },
    estudiantes:[],
    estudianteForm:{
        nombre:'',
        primer_apellido:'',
        segundo_apellido:'',
        edad:'',
        sexo:'',
        error:'',
        errores:{
          nombre:'',
          primer_apellido:'',
          segundo_apellido:'',
          edad:'',
          sexo:''
      }         
    }
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.titulo = payload.titulo
      state.loading.estado = true
    },
    ocultarLoading(state){
      state.loading.estado = false
    },
    cargarEstudiantes(state, estudiantesAccion){
      state.estudiantes = estudiantesAccion
    },
    adicionarestudiante(state,payload){
      state.estudiantes.push(payload)
    },
    limpiarFormularioEstudiante(state){
      state.estudianteForm.nombre=''
      state.estudianteForm.primer_apellido=''
      state.estudianteForm.segundo_apellido=''
      state.estudianteForm.edad=''
      state.estudianteForm.sexo=''
      state.estudianteForm.error=''
      state.estudianteForm.errores.nombre=''
      state.estudianteForm.errores.primer_apellido=''
      state.estudianteForm.errores.segundo_apellido=''
      state.estudianteForm.errores.edad=''
      state.estudianteForm.errores.sexo=''
    }
  },
  actions: {
    async obtenerEstudiantes({ commit }){
      try {
        commit('mostrarLoading',{titulo:'Cargando...'})
        let access_token = localStorage.getItem('access_token')
        await axios.get('http://localhost:3000/estudiantes/',{
          headers:{
            'Authorization':`Bearer ${access_token}`
          }
        }).then((res)=>{
          const estudiantes = res.data;
          commit('cargarEstudiantes', estudiantes)
        });           
      } catch (error) {
        console.log(error)        
      }finally{
        commit('ocultarLoading')
      }      
    },
    async insertarEstudiantes({ commit }){
      try {
        commit('mostrarLoading',{titulo:'Guardando...'})
        let access_token = localStorage.getItem('access_token')
        await axios.post('http://localhost:3000/estudiantes/',mapEstudianteVtoAPI(this.state.estudianteForm),{
          headers:{
              'Authorization':`Bearer ${access_token}`
          },       
        })
        .then((res)=>{
          if (res.data.mensaje) {
              this.state.estudianteForm.error= res.data.mensaje                            
          }else{
            commit('adicionarestudiante', mapEstudianteVtoAPI(this.state.estudianteForm))
            commit('limpiarFormularioEstudiante')
          }
        })
      } catch (error) {
        console.log(error)        
      }finally{
        commit('ocultarLoading')
      }
    }
  },
  modules: {
  }
})
