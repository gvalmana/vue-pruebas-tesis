<template>
    <div class="container my-2">
        <h3>{{estudianteForm.error}}</h3>
        <form @submit.prevent="crearEstudiantes">
          <div class="row">
            <div class="col-md-6">
              <label for="nombre">Nombre</label>
              <input type="text" v-model="estudianteForm.nombre" id="nombre" class="form-control my-2">
              {{estudianteForm.errores.nombre}}
              <label for="primera_pellido">Primer Apellido</label>
              <input type="text" v-model="estudianteForm.primer_apellido" id="primerapellido" class="form-control my-2">
              {{estudianteForm.errores.primer_apellido}}
              <label for="segundo_apelligo">Segundo Apellido</label>
              <input type="text" v-model="estudianteForm.segundo_apellido" id="segundoapelligo" class="form-control my-2">
              {{estudianteForm.errores.segundo_apellido}}
            </div>
            <div class="col-md-6">
              <label for="edad">Edad</label>
              <input type="text" id="edad" v-model="estudianteForm.edad" class="form-control my-2">
              {{estudianteForm.errores.edad}}
              <label for="sexo"></label>
              <select name="" id="sexo" v-model="estudianteForm.sexo" class="form-control my-2">
                  <option value="MASCULINO">MASCULINO</option>
                  <option value="FEMENINO">FEMENINO</option>
              </select>
            </div>
          </div>
            {{estudianteForm.errores.sexo}}
            <button type="submit" class="btn btn-success btn-block">Aceptar</button>
        </form>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
    name: 'EstudianteForm',
    computed: {
      ...mapState('estudiantes',['estudianteForm'])
    },
    methods: {
      ...mapActions('estudiantes',['crearEstudiantes']),
    },
}
</script>
