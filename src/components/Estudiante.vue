<template>
  <div class="hello">
    <h1 v-if="loading.estado">{{loading.titulo}}</h1>
    <table v-else>
      <tr>
        <td>Nombre</td>
        <td>Primer Apellido</td>
        <td>Segundo Apellido</td>
        <td>Edad</td>
      </tr>
      <tr v-for="item in estudiantes" :key="item.id">
        <td>{{item.nombre}}</td>
        <td>{{item.primer_apellido}}</td>
        <td>{{item.segundo_apellido}}</td>
        <td>{{item.edad}}</td>
        <td>{{item.sexo}}</td>
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
    ...mapState(['loading','estudiantes']),
  },  
  methods: {
    ...mapMutations(['mostrarLoading','ocultarLoading','cargarEstudiantes']),
    ...mapActions(['obtenerEstudiantes']),
  },
  mounted() {
    this.obtenerEstudiantes()    
  },
}
</script>
