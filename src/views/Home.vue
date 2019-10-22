<template>
  <div class="home">
    <EstudianteForm v-if="formulario"/>
    <button @click="formulario=!formulario">Nuevo</button>
    <Estudiante msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Estudiante from '@/components/Estudiante.vue'
import EstudianteForm from '@/components/EstudianteForm.vue'
export default {
  name: 'home',
  data() {
    return {
      formulario:false
    }
  },
  components: {
    Estudiante,
    EstudianteForm
  },
  computed: {

  },
  methods: {

  },
}
</script>
