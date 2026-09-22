const API_URL = "https://api-autos-tgwd.onrender.com/autos";

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#formAlta").addEventListener("submit", (event) => {
        event.preventDefault();

        const idIngresado = document.querySelector("#id").value;
        const marca = document.querySelector("#marca").value;
        const precio = document.querySelector("#precio").value;
        const color = document.querySelector("#color").value;
        
        if (idIngresado !== "") {
             const idNumero = Number(idIngresado);
             if (isNaN(idNumero) || idNumero <= 0) {
                 mostrarMensaje("El ID debe ser un número mayor que cero.", false);
                 return;
             }
         }
     
         // Validación del precio
         const precioNumero = Number(precio);
        if (isNaN(precioNumero) || precioNumero <= 0) {
             mostrarMensaje("El precio debe ser un número mayor que cero.", false);
             return;
         }

        const nuevoAuto = {
            marca: marca,
            precio: Number(precio),
            color: color
        };

        if (idIngresado !== "") {
            nuevoAuto.id = Number(idIngresado);
        }

        agregarAuto(nuevoAuto);
    });

});

async function agregarAuto(nuevoAuto) {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoAuto)
        });

        if (!respuesta.ok) {
            mostrarMensaje("Ya existe un automóvil con ese ID.", false);
            return;
        }

        const autoCreado = await respuesta.json();
        mostrarMensaje("Automóvil agregado correctamente (ID " + autoCreado.id + ").", true);
        document.querySelector("#formAlta").reset();

    } catch (error) {
        mostrarMensaje("Ocurrió un error al agregar el automóvil.", false);
    }
}

function mostrarMensaje(texto, esExito) {
    const contenedor = document.querySelector("#mensajeAlta");
    contenedor.innerHTML = texto;
    contenedor.className = "mensaje " + (esExito ? "mensaje-exito" : "mensaje-error");
}
