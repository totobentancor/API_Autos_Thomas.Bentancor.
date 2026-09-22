const API_URL = "https://api-autos-tgwd.onrender.com/autos";

let idActual = null;

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#formBuscar").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = document.querySelector("#idBuscar").value;
        buscarAuto(id);
    });

    document.querySelector("#btnEliminar").addEventListener("click", () => {
        eliminarAuto();
    });
    document.querySelector("#btnCancelar").addEventListener("click", () => {
        document.querySelector("#datosAuto").style.display = "none";
    });
    
    // Si llegamos desde la página de consulta con un id en la URL (ej: eliminar.html?id=5),
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
            document.querySelector("#datosAuto").style.display = "none";
            mostrarMensaje("mensajeBusqueda", "No existe un automóvil con ese ID.", false);
            return;
        }

        const auto = await respuesta.json();
        idActual = auto.id;

        document.querySelector("#verId").innerHTML = auto.id;
        document.querySelector("#verMarca").innerHTML = auto.marca;
        document.querySelector("#verPrecio").innerHTML = auto.precio;
        document.querySelector("#verColor").value = auto.color;

        document.querySelector("#datosAuto").style.display = "block";
        mostrarMensaje("mensajeBusqueda", "Automóvil encontrado.", true);

    } catch (error) {
        mostrarMensaje("mensajeBusqueda", "Ocurrió un error al buscar.", false);
    }
}

// ---------- Eliminar (DELETE /autos/:id) ----------

async function eliminarAuto() {
    const confirmar = confirm("¿Seguro que desea eliminar el automóvil con ID " + idActual + "?");

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(API_URL + "/" + idActual, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            mostrarMensaje("mensajeEliminar", "No se pudo eliminar el automóvil.", false);
            return;
        }

        mostrarMensaje("mensajeEliminar", "Automóvil eliminado correctamente.", true);
        document.querySelector("#datosAuto").style.display = "none";

    } catch (error) {
        mostrarMensaje("mensajeEliminar", "Ocurrió un error al eliminar.", false);
    }
}

// ---------- Mensajes ----------

function mostrarMensaje(idContenedor, texto, esExito) {
    const contenedor = document.querySelector("#" + idContenedor);
    contenedor.innerHTML = texto;
    contenedor.className = "mensaje " + (esExito ? "mensaje-exito" : "mensaje-error");
}
