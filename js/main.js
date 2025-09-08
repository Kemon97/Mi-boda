window.addEventListener('load', function() {
   const preloader = document.getElementById('preloader');
    const landingContainer = document.getElementById('landing-container');

    if (!preloader || !landingContainer) {
        console.error("Elementos del preloader o landing-container no encontrados. Verifique el HTML.");
        return;
    }

    // Simula un tiempo mínimo de carga para que la animación se vea bien
    // Aunque la página cargue rápido, se verá el preloader por un momento.
    setTimeout(() => {
        // 1. Ocultar Preloader con fade-out
        preloader.style.opacity = 0;

        // 2. Mostrar Landing Page con fade-in y slide-up
        landingContainer.classList.add('visible'); // Añade la clase 'visible'

        // 3. Remover el preloader del DOM después de que se haya desvanecido
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto'; // Habilitar el scroll
        }, 800); // Coincide con la duración de la transición de opacidad del preloader

    }, 3000);
});

document.addEventListener('DOMContentLoaded', function() {
    const listaInvitados = {
        'Alfonso Bustos': 6,
        'Vladimir Bustos': 2,
        'Delia Navarro': 4,
        'Emilsen': 2,
        'Jacklin Alviarez': 2,
        'Angel Beltran': 2,
        'Diani Prada': 6,
        'Yohana Prada': 2,
        'Eduardo Prada': 1,
        'Santiago Prada': 1,
        'Gleidy Prada': 2,
        'Sandy Fernandez': 2,
        'Geno Hawkiins': 3,
        'Jenniffer Moreno': 2,
        'Vanesa Ortiz': 1,
        'Yori Kamelo': 2,
        'Marcela Castaño': 2,
        'Leonardo Valencia': 6,
        'Angélica Buriticá': 1,
        'Juan Sebastian Valencia': 1,
        'Miguel Almenarez': 1,
        'Jhon Baker': 1,
        'Anyi Paola Granados': 1,
        'Sebastian Jaramillo': 3,
        'Sebastian Marin': 1,
        'Alex Gallego': 2,
        'Oscar Palacio': 2,
        'Mariano Gomez': 3,
    };

    const selectNombre = document.getElementById('nombre-familia');
    const inputCupos = document.getElementById('cupos');
    const rsvpForm = document.getElementById('rsvp-form');

    function llenarLista(){
        if(selectNombre){
            for(const familia in listaInvitados){
                const option = document.createElement('option');
                option.value = familia;
                option.textContent = familia;
                selectNombre.appendChild(option);
            }
        }
    }

    llenarLista();

    if(selectNombre){
        selectNombre.addEventListener('change', () => {
            const familiaSeleccionada = selectNombre.value;
            if(familiaSeleccionada && inputCupos){
                inputCupos.value = listaInvitados[familiaSeleccionada];
            }else if(inputCupos){
                inputCupos.value = '';
            }
        });
    }
    
    if(rsvpForm){
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por confirmar tu asistencia. ¡Nos vemos en la boda!');
            // Aquí enviarías los datos a un servicio externo.
            // Por ejemplo:
            // const formData = new FormData(rsvpForm);
            // fetch('URL_DE_TU_SERVICIO_DE_FORMULARIO', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => console.log(data))
            // .catch(error => console.error('Error:', error));
            rsvpForm.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const fechaBoda = new Date('Jan 17, 2026 16:00:00').getTime();
    const countdownElement = document.getElementById("countdown");
    const diasElement = document.getElementById("dias");
    const horasElement = document.getElementById("horas");
    const minutosElement = document.getElementById("minutos");
    const segundosElement = document.getElementById("segundos");

     if (!countdownElement || !diasElement || !horasElement || !minutosElement || !segundosElement) {
        console.warn("Elementos de la cuenta regresiva no encontrados, la cuenta no se iniciará.");
        return; // Salir si no se encuentran los elementos
    }
    const x = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        const dias = Math.floor(distancia /(1000*60*60*24));
        const horas = Math.floor((distancia %(1000*60*60*24))/ (1000*60*60));
        const minutos = Math.floor((distancia %(1000*60*60))/(1000*60));
        const segundos = Math.floor((distancia %(1000*60))/(1000));

        diasElement.innerHTML = dias;
        horasElement.innerHTML = horas;
        minutosElement.innerHTML = minutos;
        segundosElement.innerHTML = segundos;

        if(distancia < 0){
            clearInterval(x);
            countdownElement.innerHTML = "¡Ya nos casamos!";
        }
    }, 1000);
});
    
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e){
    if(e.metaKey && e.shiftKey && e.keyCode === 52){
        e.preventDefault();
        alert('No se permiten capturas de pantalla.');
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode === 52){
        e.preventDefault();
        alert('No se permiten capturas de pantalla.');
    }
    if(e.key === 'PrintScreen' || e.key === 'PrtSc'){
        e.preventDefault();
        alert('No se permiten capturas de pantalla');
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const juegoSeccion = document.getElementById('juego-seccion');

    const fechaBoda = new Date('Jan 17, 2026 16:00:00').getTime();

    const mostrarJuego = () => {
        if(juegoSeccion){
            juegoSeccion.classList.remove('d-none');
        }
    };

    const verificarFecha = () => {
        const ahora = new Date().getTime();
        if(ahora >= fechaBoda){
            mostrarJuego();
        }else{
            const tiempoRestante = fechaBoda - ahora;
            setTimeout(mostrarJuego, tiempoRestante);
        }
    };

    verificarFecha();

});





