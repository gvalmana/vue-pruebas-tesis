import axios from 'axios'
import {mapEstudianteVtoAPI, mapEstudianteAPItoV} from '../mappers/estudiantes.map.js'
export default {
  namespaced: true,
  state:{
    formulario:false,
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
  mutations:{
    cargarEstudiantes(state, estudiantesAccion){
      state.estudiantes = estudiantesAccion
    },
    adicionarestudiante(state,payload){
      state.estudiantes.push(payload)
    },
    eliminarEstudiante(state,payload){
      const index = state.estudiantes.findIndex(item => item.id === payload)
      state.estudiantes.splice(index, 1)
    },
    mostrarFormulario(state){
      state.formulario = !state.formulario
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
  actions:{
    async obtenerEstudiantes({ commit }){
      try {
        commit('mostrarLoading',{titulo:'Cargando...'},{ root: true })
        const access_token = localStorage.getItem('access_token')
        await axios.get('/estudiantes/',{
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
        commit('ocultarLoading',null,{ root: true })
      }
    },
    async insertarEstudiantes({ commit, state }){
      try {
        commit('mostrarLoading',{titulo:'Guardando...'},{ root: true })
        const access_token = localStorage.getItem('access_token')
        await axios.post('/estudiantes/',mapEstudianteVtoAPI(state.estudianteForm),{
          headers:{
              'Authorization':`Bearer ${access_token}`
          },
        })
        .then((res)=>{
            if (!res.data.error==null) {
              commit('showAlert',{color:'danger',texto:'Ha ocurrido un error al intentar guardar el estudiante.'},{ root: true })
            } else {
              commit('adicionarestudiante', res.data)
              commit('limpiarFormularioEstudiante')
              commit('mostrarFormulario')
            }
        })
      } catch (error) {
        console.log(error)
        commit('showAlert',{color:'danger',texto:'Ha ocurrido un error al intentar guardar el estudiante.'},{ root: true })
      }finally{
        commit('ocultarLoading',null,{ root: true })
        commit('showAlert',{color:'success',texto:'El estudiante ha sido registrado correctamente.'},{ root: true })
      }
    },
    async eliminarEstudiante({commit, state},id){
      try {
        commit('mostrarLoading',{titulo:'Eliminando...'},{ root: true })
        const access_token = localStorage.getItem('access_token')
        await axios.delete(`/estudiantes/${id}`,{
          headers:{
              'Authorization':`Bearer ${access_token}`
          },
        }).then((res)=>{
          commit('eliminarEstudiante',res.data.id)
        })
      } catch (error) {
        console.log(error)
      } finally {
        commit('ocultarLoading',null,{ root: true })
        commit('showAlert',{color:'warning',texto:'El estudiante ha sido eliminado correctamente.'},{ root: true })
      }
    }
  },
  getters: {
    estudiante(state){
      return state.EstudianteForm
    }
  },
}
