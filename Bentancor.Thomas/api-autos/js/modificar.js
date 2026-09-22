const API_URL = "https://api-autos-tgwd.onrender.com/autos";

let idActual = null;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#formBuscar").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = document.querySelector("#idBuscar").value;
        buscarAuto(id);
    });

    document.querySelector("#formModificar").addEventListener("submit", (event) => {
        event.preventDefault();
        guardarCambios();
    });

    document.querySelector("#btnLimpiarBusqueda").addEventListener("click", () => {
    document.querySelector("#marca").value = "";
    document.querySelector("#precio").value = "";
    document.querySelector("#color").value = "#000000";
    });

    document.querySelector("#btnCancelar").addEventListener("click", () => {
        document.querySelector("#idBuscar").value = "";
        document.querySelector("#formModificar").style.display = "none";
        document.querySelector("#mensajeBusqueda").innerHTML = "";
    });

    // Si llegamos desde la página de consulta con un id en la URL (ej: modificar.html?id=5),
    // lo cargamos en el campo y buscamos automáticamente.
    const parametros = new URLSearchParams(window.location.search);
    const idDesdeUrl = parametros.get("id");

    if (idDesdeUrl !== null) {
        document.querySelector("#idBuscar").value = idDesdeUrl;
        buscarAuto(idDesdeUrl);
    }

});

// ---------- Buscar (GET /autos/:id) ----------

async function buscarAuto(id) {
    try {
        const respuesta = await fetch(API_URL + "/" + id);

        if (!respuesta.ok) {
            document.querySelector("#formModificar").style.display = "none";
            mostrarMensaje("mensajeBusqueda", "No existe un automóvil con ese ID.", false);
            return;
        }

        const auto = await respuesta.json();
        idActual = auto.id;

        document.querySelector("#idAuto").value = auto.id;
        document.querySelector("#marca").value = auto.marca;
        document.querySelector("#precio").value = auto.precio;
        document.querySelector("#color").value = auto.color;

        document.querySelector("#formModificar").style.display = "flex";
        mostrarMensaje("mensajeBusqueda", "Automóvil encontrado.", true);

    } catch (error) {
        mostrarMensaje("mensajeBusqueda", "Ocurrió un error al buscar.", false);
    }
}

// ---------- Modificar (PUT /autos/:id) ----------

async function guardarCambios() {
    const marca = document.querySelector("#marca").value;
    const precio = document.querySelector("#precio").value;
    const color = document.querySelector("#color").value;

    const datosActualizados = {
        marca: marca,
        precio: Number(precio),
        color: color
    };

    try {
        const respuesta = await fetch(API_URL + "/" + idActual, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        });

        if (!respuesta.ok) {
            mostrarMensaje("mensajeModificar", "No se pudo modificar el automóvil.", false);
            return;
        }

        mostrarMensaje("mensajeModificar", "Automóvil modificado correctamente.", true);

    } catch (error) {
        mostrarMensaje("mensajeModificar", "Ocurrió un error al modificar.", false);
    }
}

// ---------- Mensajes ----------

function mostrarMensaje(idContenedor, texto, esExito) {
    const contenedor = document.querySelector("#" + idContenedor);
    contenedor.innerHTML = texto;
    contenedor.className = "mensaje " + (esExito ? "mensaje-exito" : "mensaje-error");
}
