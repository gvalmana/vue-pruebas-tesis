<template>
    <div>
        <h3>{{estudianteForm.error}}</h3>
        <form @submit.prevent="insertarEstudiantes">
            <label for="nombre">Nombre</label>
            <input type="text" v-model="estudianteForm.nombre" id="nombre">
            {{estudianteForm.errores.nombre}}
            <br>
            <label for="primera_pellido">Primer Apellido</label>
            <input type="text" v-model="estudianteForm.primer_apellido" id="primerapellido">
            {{estudianteForm.errores.primer_apellido}}
            <br>
            <label for="segundo_apelligo">Segundo Apellido</label>
            <input type="text" v-model="estudianteForm.segundo_apellido" id="segundoapelligo">
            {{estudianteForm.errores.segundo_apellido}}
            <br>
            <label for="edad">Edad</label>
            <input type="text" id="edad" v-model="estudianteForm.edad">
            {{estudianteForm.errores.edad}}
            <br>
            <label for="sexo"></label>
            <select name="" id="sexo" v-model="estudianteForm.sexo">
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMENINO">FEMENINO</option>
            </select>
            {{estudianteForm.errores.sexo}}
            <br>
            <button type="submit">Aceptar</button>
        </form>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'

export default {
    name: 'EstudianteForm',
    computed: {
      ...mapState(['loading']),
      ...mapState('estudiantes',['estudianteForm'])
    },
    methods: {
        ...mapMutations(['mostrarLoading','ocultarLoading']),
        ...mapActions('estudiantes',['insertarEstudiantes'])
    },
}
</script>
