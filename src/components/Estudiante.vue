<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
    {{mensaje.texto}}
    </b-alert>
    <h1 v-if="loading.estado">{{loading.titulo}}</h1>
    <table v-else class="table mt-2">
      <thead class="thead-dark">
        <tr>
          <th>Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Edad</th>
          <th>Sexo</th>
          <th colspan="2">Acciones</th>
        </tr>
      </thead>
      <tr v-for="item in estudiantes" :key="item.id">
        <td>{{item.nombre}}</td>
        <td>{{item.primer_apellido}}</td>
        <td>{{item.segundo_apellido}}</td>
        <td>{{item.edad}}</td>
        <td>{{item.sexo}}</td>
        <td><b-button class="btn btn-warning btn-sm">Editar</b-button></td>
        <td><b-button class="btn btn-danger btn-sm" @click="eliminarEstudiante(item.id)">Eliminar</b-button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'

export default {
  name: 'Estudiante',
  computed: {
    ...mapState(['loading','mensaje','dismissCountDown']),
    ...mapState('estudiantes',['estudiantes'])
  },
  methods: {
    ...mapActions('estudiantes',['obtenerEstudiantes','eliminarEstudiante']),
    ...mapMutations(['showAlert','countDownChanged'])
  },
  mounted() {
    this.obtenerEstudiantes()
  },
}
</script>
