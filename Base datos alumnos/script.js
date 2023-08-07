document.addEventListener('DOMContentLoaded', function () {
    const alumnos = [];
    const alumnosList = document.getElementById('alumnos-list');
    const altaBtn = document.getElementById('alta-btn');
    const inscripcionBtn = document.getElementById('inscripcion-btn');
    const alumnosDropdown = document.getElementById('alumnos-dropdown');
    const materiaInput = document.getElementById('materia');
    const calificacionBtn = document.getElementById('calificacion-btn');
    const alumnosCalifDropdown = document.getElementById('alumnos-calif-dropdown');
    const calificacionInput = document.getElementById('calificacion');
    const grupoBtn = document.getElementById('grupo-btn');
    const nombreGrupoInput = document.getElementById('nombre-grupo');
    const buscarNombreBtn = document.getElementById('buscar-nombre-btn');
    const buscarApellidoBtn = document.getElementById('buscar-apellido-btn');
    const promedioAlumnoBtn = document.getElementById('promedio-alumno-btn');
    const promedioGrupoBtn = document.getElementById('promedio-grupo-btn');
    const ordenarAscendenteBtn = document.getElementById('ordenar-ascendente-btn');
    const ordenarDescendenteBtn = document.getElementById('ordenar-descendente-btn');
    const alumnosDropdownPromedio = document.getElementById('alumnos-dropdown-promedio');
  
    altaBtn.addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value;
      const apellidos = document.getElementById('apellidos').value;
      const edad = document.getElementById('edad').value;
  
      altaAlumno(nombre, apellidos, edad);
      updateAlumnosList();
      updateAlumnosDropdowns();
      updateAlumnosDropdownPromedio();
    });
  
    inscripcionBtn.addEventListener('click', () => {
        const alumnoIndex = alumnosDropdown.selectedIndex;
        const materia = materiaInput.value;

        inscribirMateria(alumnoIndex, materia);
    });

    calificacionBtn.addEventListener('click', () => {
        const alumnoIndex = alumnosCalifDropdown.selectedIndex;
        const calificacion = parseFloat(calificacionInput.value);

        asignarCalificacion(alumnoIndex, calificacion);
    });

    grupoBtn.addEventListener('click', () => {
        const nombreGrupo = nombreGrupoInput.value;

        crearGrupo(nombreGrupo);
    });

    alumnosList.addEventListener('click', event => {
        if (event.target.classList.contains('ver-detalle-btn')) {
            const alumnoIndex = parseInt(event.target.getAttribute('data-index'));
            verDetalle(alumnoIndex);
        }
    });

    function altaAlumno(nombre, apellidos, edad) {
        alumnos.push({
            nombre,
            apellidos,
            edad,
            materias: [],
            calificaciones: []
        });
    }

    function updateAlumnosList() {
        alumnosList.innerHTML = '';
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const alumnoDiv = document.createElement('div');
            alumnoDiv.classList.add('alumno');
            alumnoDiv.innerHTML = `
                <h3>${alumno.nombre} ${alumno.apellidos}</h3>
                <p>Edad: ${alumno.edad}</p>
                <button class="ver-detalle-btn" data-index="${i}">Ver Detalle</button>
            `;
            alumnosList.appendChild(alumnoDiv);
        }
    }

    function updateAlumnosDropdowns() {
        alumnosDropdown.innerHTML = '';
        alumnosCalifDropdown.innerHTML = '';

        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const option = document.createElement('option');
            option.text = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosDropdown.appendChild(option);

            const califOption = document.createElement('option');
            califOption.text = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosCalifDropdown.appendChild(califOption);
        }
    }

    function inscribirMateria(alumnoIndex, materia) {
        if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
            alumnos[alumnoIndex].materias.push(materia);
        }
    }

    function asignarCalificacion(alumnoIndex, calificacion) {
        if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
            alumnos[alumnoIndex].calificaciones.push(calificacion);
        }
    }

    const grupos = {}; // Estructura de datos para almacenar los grupos

    function crearGrupo(nombreGrupo) {
        grupos[nombreGrupo] = [];

        for (let i = 0; i < alumnos.length; i++) {
            grupos[nombreGrupo].push(alumnos[i]);
        }

        console.log(grupos);
    }

    function verDetalle(alumnoIndex) {
        const alumno = alumnos[alumnoIndex];

        let detallesHtml = `
            <h3>${alumno.nombre} ${alumno.apellidos}</h3>
            <p>Edad: ${alumno.edad}</p>
            <h4>Materias Inscritas:</h4>
            <ul>`;

        for (let i = 0; i < alumno.materias.length; i++) {
            detallesHtml += `<li>${alumno.materias[i]}</li>`;
        }

        detallesHtml += `</ul><h4>Calificaciones:</h4><ul>`;

        for (let i = 0; i < alumno.calificaciones.length; i++) {
            detallesHtml += `<li>${alumno.calificaciones[i]}</li>`;
        }

        detallesHtml += `</ul>`;

        const detallesDiv = document.createElement('div');
        detallesDiv.innerHTML = detallesHtml;

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.appendChild(detallesDiv);

        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    const limpiarBtn = document.getElementById('limpiar-btn');
    limpiarBtn.addEventListener('click', () => {
        alumnosList.innerHTML = '';
        alumnosDropdown.innerHTML = '';
        alumnosCalifDropdown.innerHTML = '';
    });

    updateAlumnosDropdowns();
  
    buscarNombreBtn.addEventListener('click', () => {
        const nombreBuscado = document.getElementById('buscar-nombre').value;
        const resultados = buscarAlumnosPorNombre(nombreBuscado);
        mostrarResultados(resultados);
    });
  
    function buscarAlumnosPorNombre(nombreBuscado) {
        return alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
    }
  
    buscarApellidoBtn.addEventListener('click', () => {
        const apellidoBuscado = document.getElementById('buscar-apellido').value;
        const resultados = buscarAlumnosPorApellido(apellidoBuscado);
        mostrarResultados(resultados);
    });
  
    function buscarAlumnosPorApellido(apellidoBuscado) {
        return alumnos.filter(alumno => alumno.apellidos.toLowerCase().includes(apellidoBuscado.toLowerCase()));
    }
  
    promedioAlumnoBtn.addEventListener('click', () => {
        const alumnoIndex = alumnosDropdownPromedio.selectedIndex;
        const promedio = obtenerPromedioAlumno(alumnoIndex);
        alert(`El promedio del alumno es: ${promedio}`);
    });
  
    function obtenerPromedioAlumno(alumnoIndex) {
        if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
            const alumno = alumnos[alumnoIndex];
            if (alumno.calificaciones.length === 0) {
                return 0;
            }
            const sumaCalificaciones = alumno.calificaciones.reduce((total, calificacion) => total + calificacion, 0);
            const promedio = sumaCalificaciones / alumno.calificaciones.length;
            return promedio.toFixed(2);
        } else {
            return 'Alumno no válido';
        }
    }
  
    promedioGrupoBtn.addEventListener('click', () => {
        const promedio = obtenerPromedioGrupo();
        alert(`El promedio del grupo es: ${promedio}`);
    });
  
    function obtenerPromedioGrupo() {
        if (alumnos.length === 0) {
            return 0;
        }
    
        let sumaTotalCalificaciones = 0;
        let totalCalificaciones = 0;
    
        for (let i = 0; i < alumnos.length; i++) {
            sumaTotalCalificaciones += alumnos[i].calificaciones.reduce((total, calificacion) => total + calificacion, 0);
            totalCalificaciones += alumnos[i].calificaciones.length;
        }
    
        if (totalCalificaciones === 0) {
            return 0;
        }
    
        const promedioGrupo = sumaTotalCalificaciones / totalCalificaciones;
        return promedioGrupo.toFixed(2);
    }

    ordenarAscendenteBtn.addEventListener('click', () => {
        const alumnosOrdenados = ordenarAlumnosPorCalificacion(true);
        mostrarResultados(alumnosOrdenados);
    });
  
    ordenarDescendenteBtn.addEventListener('click', () => {
        const alumnosOrdenados = ordenarAlumnosPorCalificacion(false);
        mostrarResultados(alumnosOrdenados);
    });
  
function ordenarAlumnosPorCalificacion(ascendente) {
    const alumnosOrdenados = [...alumnos];

    alumnosOrdenados.sort((a, b) => {
        const promedioA = a.calificaciones.length > 0 ? a.calificaciones.reduce((total, calificacion) => total + calificacion, 0) / a.calificaciones.length : 0;
        const promedioB = b.calificaciones.length > 0 ? b.calificaciones.reduce((total, calificacion) => total + calificacion, 0) / b.calificaciones.length : 0;

        if (ascendente) {
            return promedioA - promedioB;
        } else {
            return promedioB - promedioA;
        }
    });

    return alumnosOrdenados;
}

function updateAlumnosDropdownPromedio() {
    alumnosDropdownPromedio.innerHTML = '';

    for (let i = 0; i < alumnos.length; i++) {
        const alumno = alumnos[i];
        const option = document.createElement('option');
        option.text = `${alumno.nombre} ${alumno.apellidos}`;
        alumnosDropdownPromedio.appendChild(option);
    }
}

function mostrarResultados(resultados) {
    const resultadosSection = document.getElementById('resultados');
    resultadosSection.innerHTML = '';

    if (resultados.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No se encontraron resultados';
        resultadosSection.appendChild(mensaje);
    } else {
        const listaResultados = document.createElement('ul');
        for (const resultado of resultados) {
            const itemResultado = document.createElement('li');
            itemResultado.textContent = `${resultado.nombre} ${resultado.apellidos}`;
            listaResultados.appendChild(itemResultado);
        }
        resultadosSection.appendChild(listaResultados);
    }
}

  
    updateAlumnosDropdowns();
    updateAlumnosDropdownPromedio();
});


/*document.addEventListener('DOMContentLoaded', function () {
    const alumnos = [];
    const alumnosList = document.getElementById('alumnos-list');
    const altaBtn = document.getElementById('alta-btn');
    const inscripcionBtn = document.getElementById('inscripcion-btn');
    const alumnosDropdown = document.getElementById('alumnos-dropdown');
    const materiaInput = document.getElementById('materia');
    const calificacionBtn = document.getElementById('calificacion-btn');
    const alumnosCalifDropdown = document.getElementById('alumnos-calif-dropdown');
    const calificacionInput = document.getElementById('calificacion');
    const grupoBtn = document.getElementById('grupo-btn');
    const nombreGrupoInput = document.getElementById('nombre-grupo');

    altaBtn.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const edad = document.getElementById('edad').value;

        altaAlumno(nombre, apellidos, edad);
        updateAlumnosList();
        updateAlumnosDropdowns();
    });

    inscripcionBtn.addEventListener('click', () => {
        const alumnoIndex = alumnosDropdown.selectedIndex;
        const materia = materiaInput.value;

        inscribirMateria(alumnoIndex, materia);
    });

    calificacionBtn.addEventListener('click', () => {
        const alumnoIndex = alumnosCalifDropdown.selectedIndex;
        const calificacion = parseFloat(calificacionInput.value);

        asignarCalificacion(alumnoIndex, calificacion);
    });

    grupoBtn.addEventListener('click', () => {
        const nombreGrupo = nombreGrupoInput.value;

        crearGrupo(nombreGrupo);
    });

    alumnosList.addEventListener('click', event => {
        if (event.target.classList.contains('ver-detalle-btn')) {
            const alumnoIndex = parseInt(event.target.getAttribute('data-index'));
            verDetalle(alumnoIndex);
        }
    });

    function altaAlumno(nombre, apellidos, edad) {
        alumnos.push({
            nombre,
            apellidos,
            edad,
            materias: [],
            calificaciones: []
        });
    }

    function updateAlumnosList() {
        alumnosList.innerHTML = '';
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const alumnoDiv = document.createElement('div');
            alumnoDiv.classList.add('alumno');
            alumnoDiv.innerHTML = `
                <h3>${alumno.nombre} ${alumno.apellidos}</h3>
                <p>Edad: ${alumno.edad}</p>
                <button class="ver-detalle-btn" data-index="${i}">Ver Detalle</button>
            `;
            alumnosList.appendChild(alumnoDiv);
        }
    }

    function updateAlumnosDropdowns() {
        alumnosDropdown.innerHTML = '';
        alumnosCalifDropdown.innerHTML = '';

        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            const option = document.createElement('option');
            option.text = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosDropdown.appendChild(option);

            const califOption = document.createElement('option');
            califOption.text = `${alumno.nombre} ${alumno.apellidos}`;
            alumnosCalifDropdown.appendChild(califOption);
        }
    }

    function inscribirMateria(alumnoIndex, materia) {
        if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
            alumnos[alumnoIndex].materias.push(materia);
        }
    }

    function asignarCalificacion(alumnoIndex, calificacion) {
        if (alumnoIndex >= 0 && alumnoIndex < alumnos.length) {
            alumnos[alumnoIndex].calificaciones.push(calificacion);
        }
    }

    const grupos = {}; // Estructura de datos para almacenar los grupos

    function crearGrupo(nombreGrupo) {
        grupos[nombreGrupo] = [];

        for (let i = 0; i < alumnos.length; i++) {
            grupos[nombreGrupo].push(alumnos[i]);
        }

        console.log(grupos);
    }

    function verDetalle(alumnoIndex) {
        const alumno = alumnos[alumnoIndex];

        let detallesHtml = `
            <h3>${alumno.nombre} ${alumno.apellidos}</h3>
            <p>Edad: ${alumno.edad}</p>
            <h4>Materias Inscritas:</h4>
            <ul>`;

        for (let i = 0; i < alumno.materias.length; i++) {
            detallesHtml += `<li>${alumno.materias[i]}</li>`;
        }

        detallesHtml += `</ul><h4>Calificaciones:</h4><ul>`;

        for (let i = 0; i < alumno.calificaciones.length; i++) {
            detallesHtml += `<li>${alumno.calificaciones[i]}</li>`;
        }

        detallesHtml += `</ul>`;

        const detallesDiv = document.createElement('div');
        detallesDiv.innerHTML = detallesHtml;

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.appendChild(detallesDiv);

        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    const limpiarBtn = document.getElementById('limpiar-btn');
    limpiarBtn.addEventListener('click', () => {
        alumnosList.innerHTML = '';
        alumnosDropdown.innerHTML = '';
        alumnosCalifDropdown.innerHTML = '';
    });


    updateAlumnosDropdowns();
});*/