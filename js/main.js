document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvp-form');
    const selectElement = document.getElementById('nombre-familia');
    const cuposInput = document.getElementById('cupos');
    const asistenciaSelect = document.getElementById('asistencia');
    const juegoSeccion = document.getElementById('juego-seccion');

    // Mapeo de nombres a cupos y estado
    const invitadosData = {
        "Alejandro Caro": {"cupos": 1, "asistencia": null, "juego": false},
        "Alex Gallego": { "cupos": 2, "asistencia": null, "juego": false },
        "Alfonso Bustos": { "cupos": 6, "asistencia": null, "juego": false },
        "Angel Beltran": { "cupos": 2, "asistencia": null, "juego": false },
        "Angélica Buriticá": { "cupos": 1, "asistencia": null, "juego": false },
        "Anyi Paola Granados": { "cupos": 2, "asistencia": null, "juego": false },
        "Delia Navarro": { "cupos": 4, "asistencia": null, "juego": false },
        "Diani Prada": { "cupos": 6, "asistencia": null, "juego": false },
        "Eduardo Prada": { "cupos": 1, "asistencia": null, "juego": false },
        "Emilse Navarro": { "cupos": 3, "asistencia": null, "juego": false },
        "Geno Hawkins": { "cupos": 3, "asistencia": null, "juego": false },
        "Gleidy Prada": { "cupos": 2, "asistencia": null, "juego": false },
        "Jacklin Alviarez": { "cupos": 2, "asistencia": null, "juego": false },
        "Jennifer Moreno": { "cupos": 2, "asistencia": null, "juego": false },
        "Jhon Baker": { "cupos": 1, "asistencia": null, "juego": false },
        "Juan Sebastian Valencia": { "cupos": 1, "asistencia": null, "juego": false },
        "Leonardo Valencia": { "cupos": 6, "asistencia": null, "juego": false },
        "Marcela Castaño": { "cupos": 2, "asistencia": null, "juego": false },
        "Mariano Gómez": { "cupos": 3, "asistencia": null, "juego": false },
        "Miguel Almenarez": { "cupos": 1, "asistencia": null, "juego": false },
        "Oscar Palacio": { "cupos": 2, "asistencia": null, "juego": false },
        "Paola Galvis": { "cupos": 1, "asistencia": null, "juego": false },
        "Sandy Fernandez": { "cupos": 2, "asistencia": null, "juego": false },
        "Sara Galvis": { "cupos": 1, "asistencia": null, "juego": false },
        "Sebastian Jaramillo": { "cupos": 3, "asistencia": null, "juego": false },
        "Sebastian Marín": { "cupos": 1, "asistencia": null, "juego": false },
        "Vanesa Ortiz": { "cupos": 1, "asistencia": null, "juego": false },
        "Vladimir Bustos": { "cupos": 2, "asistencia": null, "juego": false },
        "Yohana Prada": { "cupos": 2, "asistencia": null, "juego": false },
        "Yori Kamelo": { "cupos": 2, "asistencia": null, "juego": false },
    };

    // Llenar el select con los nombres de las familias
    for (const nombre in invitadosData) {
        let option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectElement.appendChild(option);
    }

    // Funcionalidad para preloader
    const preloader = document.getElementById('preloader');
    const landingContainer = document.getElementById('landing-container');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
                landingContainer.style.opacity = '1';
                landingContainer.style.transform = 'translateY(0)';
            }, 800);
        }, 3000);
    });

    // Funcionalidad para cuenta regresiva
    const countDownDate = new Date("Jan 17, 2026 16:00:00").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("dias").innerHTML = days;
        document.getElementById("horas").innerHTML = hours;
        document.getElementById("minutos").innerHTML = minutes;
        document.getElementById("segundos").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "¡Es Hoy!";
        }
    }, 1000);

    // Funcionalidad de la lista de invitados para que se bloquee después de la selección
    const selectedKey = 'invitadoSeleccionado';
    const invitadoSeleccionado = localStorage.getItem(selectedKey);
    
    // Si ya hay un nombre guardado, deshabilitar la lista
    if (invitadoSeleccionado) {
        selectElement.value = invitadoSeleccionado;
        selectElement.disabled = true;
        // Opcional: Mostrar los cupos y el estado de asistencia guardados
        const data = invitadosData[invitadoSeleccionado];
        if (data) {
            cuposInput.value = data.cupos;
            asistenciaSelect.value = data.asistencia;
            // Si el juego estaba habilitado, mostrarlo
            if (data.juego) {
                juegoSeccion.classList.remove('d-none');
            }
        }
    }

    selectElement.addEventListener('change', function() {
        if (this.value) {
            const data = invitadosData[this.value];
            if (data) {
                cuposInput.value = data.cupos;
            }
        } else {
            cuposInput.value = '';
        }
    });

    // Validar y guardar la selección al enviar el formulario
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío por defecto
        
        const selectedName = selectElement.value;
        const asistenciaValue = asistenciaSelect.value;
        
        if (selectedName && asistenciaValue) {
            // Guarda el nombre seleccionado en el localStorage
            localStorage.setItem(selectedKey, selectedName);

            // Actualiza el estado en la variable
            invitadosData[selectedName].asistencia = asistenciaValue;
            if (asistenciaValue === "si") {
                juegoSeccion.classList.remove('d-none');
                invitadosData[selectedName].juego = true;
            } else {
                juegoSeccion.classList.add('d-none');
                invitadosData[selectedName].juego = false;
            }

            // Deshabilitar la lista para evitar cambios
            selectElement.disabled = true;

            // Enviar el formulario a Formspree
            const formData = new FormData(rsvpForm);
            fetch(rsvpForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert("¡Gracias por confirmar tu asistencia! 😊");
                } else {
                    alert("Hubo un error al enviar tu confirmación.");
                }
            }).catch(error => {
                console.error('Error:', error);
                alert("Hubo un error al enviar tu confirmación.");
            });
        }
    });
});