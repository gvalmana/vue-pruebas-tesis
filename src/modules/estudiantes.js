import {mapMutations} from 'vuex'
import axios from 'axios'
import store from '../store/index.js'
export default {
  namespaced: true,
  state:{
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
        let access_token = localStorage.getItem('access_token')
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
  },
  async insertarEstudiantes({ commit }){
    try {
      commit('mostrarLoading',{titulo:'Guardando...'},{ root: true })
      alert('Hola mundo')
      /*let access_token = localStorage.getItem('access_token')
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
      })*/
    } catch (error) {
      console.log(error)
    }finally{
      commit('ocultarLoading',null,{ root: true })
    }
  }
}
