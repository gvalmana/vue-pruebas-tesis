<template>
  <div class="home">
    <EstudianteForm v-if="formulario"/>
    <button @click="mostrarFormulario" class="btn btn-primary">Nuevo</button>
    <Estudiante/>
  </div>
</template>

<script>
// @ is an alias to /src
import Estudiante from '@/components/Estudiante.vue'
import EstudianteForm from '@/components/EstudianteForm.vue'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  name: 'home',
  components: {
    Estudiante,
    EstudianteForm
  },
  computed: {
    ...mapState('estudiantes',['formulario'])
  },
  methods: {
    ...mapMutations('estudiantes',['mostrarFormulario'])
  },
}
</script>
