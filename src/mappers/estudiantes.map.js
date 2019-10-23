export const mapEstudianteVtoAPI = (student) => student && ({
    nombre: student.nombre,
    primer_apellido: student.primer_apellido,
    segundo_apellido: student.segundo_apellido,
    edad: student.edad,
    sexo: student.sexo
});

export const mapEstudianteAPItoV = (student) => student && ({
    nombre: student.nombre,
    primer_apellido: student.primer_apellido,
    segundo_apellido: student.segundo_apellido,
    edad: student.edad,
    sexo: student.sexo
});
