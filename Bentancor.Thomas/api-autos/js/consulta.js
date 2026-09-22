const API_URL = "https://api-autos-tgwd.onrender.com/autos";

document.addEventListener("DOMContentLoaded", () => {

    cargarTodosLosAutos();

    document.querySelector("#formConsultaId").addEventListener("submit", (event) => {
        event.preventDefault();
        const id = document.querySelector("#idBuscar").value;
        consultarAutoPorId(id);
    });

});

// ---------- Consulta general (GET /autos) ----------

async function cargarTodosLosAutos() {
    try {
        const respuesta = await fetch(API_URL);
        const autos = await respuesta.json();

        ordenarPorId(autos);
        document.querySelector("#contadorAutos").innerHTML = "Mostrando " + autos.length + " automóviles.";
        mostrarTabla(autos);

    } catch (error) {
        console.log("Error al obtener los autos:", error);
    }
}

function ordenarPorId(autos) {
    for (let i = 0; i < autos.length; i++) {
        for (let j = 0; j < autos.length - 1; j++) {
            if (autos[j].id > autos[j + 1].id) {
                
                const temporal = autos[j];
                autos[j] = autos[j + 1];
                autos[j + 1] = temporal;
            }
        }
    }
    return autos;
}

function mostrarTabla(autos) {
    const tbody = document.querySelector("#tablaAutos tbody");
    tbody.innerHTML = "";

    autos.forEach((auto) => {
        const fila = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.innerHTML = auto.id;

        const tdMarca = document.createElement("td");
        tdMarca.innerHTML = auto.marca;

        const tdPrecio = document.createElement("td");
        tdPrecio.innerHTML = auto.precio;

        const tdColor = document.createElement("td");
        const inputColor = document.createElement("input");
        inputColor.setAttribute("type", "color");
        inputColor.setAttribute("value", auto.color);
        inputColor.setAttribute("disabled", true);
        tdColor.appendChild(inputColor);

        const tdAcciones = document.createElement("td");

        const linkModificar = document.createElement("a");
        linkModificar.innerHTML = "Modificar";
        linkModificar.setAttribute("href", "modificar.html?id=" + auto.id);

        const linkEliminar = document.createElement("a");
        linkEliminar.innerHTML = "Eliminar";
        linkEliminar.setAttribute("href", "eliminar.html?id=" + auto.id);
        linkEliminar.style.marginLeft = "10px";

        tdAcciones.appendChild(linkModificar);
        tdAcciones.appendChild(linkEliminar);

        fila.appendChild(tdId);
        fila.appendChild(tdMarca);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdColor);
        fila.appendChild(tdAcciones);

        tbody.appendChild(fila);
    });
}

// ---------- Consulta individual (GET /autos/:id) ----------

async function consultarAutoPorId(id) {
    try {
        const respuesta = await fetch(API_URL + "/" + id);

        if (!respuesta.ok) {
            mostrarMensaje("No existe un automóvil con ese ID.", false);
            return;
        }

        const auto = await respuesta.json();
        mostrarMensaje("Auto encontrado: " + auto.marca + " - $" + auto.precio, true);

    } catch (error) {
        mostrarMensaje("Ocurrió un error al consultar.", false);
    }
}

// ---------- Mensajes ----------

function mostrarMensaje(texto, esExito) {
    const contenedor = document.querySelector("#mensajeConsulta");
    contenedor.innerHTML = texto;
    contenedor.className = "mensaje " + (esExito ? "mensaje-exito" : "mensaje-error");
}
