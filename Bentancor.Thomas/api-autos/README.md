# Sistema de Automóviles

Trabajo Práctico de Programación III — Tecnicatura Universitaria en Programación, UTN Avellaneda.

## Descripción

Aplicación web que permite administrar un listado de automóviles (consultar, agregar,
modificar y eliminar) consumiendo una API REST externa.

La aplicación cuenta con 5 páginas:

- **index.html**: página principal con el menú de navegación.
- **consulta.html**: muestra todos los autos en una tabla (ordenados por ID) y permite
  buscar uno en particular por su ID.
- **alta.html**: formulario para agregar un auto nuevo (con ID opcional).
- **modificar.html**: permite buscar un auto por ID y modificar su marca, precio y color.
- **eliminar.html**: permite buscar un auto por ID, ver sus datos y eliminarlo (con
  confirmación previa).

## Tecnologías utilizadas

**Frontend:**
- HTML5
- CSS3
- JavaScript (ES6+), sin frameworks 

La API REST utilizada está publicada en:
`https://api-autos-tgwd.onrender.com/autos`

## Cómo ejecutar el proyecto

1. Clonar o descargar este repositorio.
2. Abrir la carpeta con un servidor local (por ejemplo, la extensión Live Server de
   Visual Studio Code).
3. Abrir `index.html` en el navegador.

> Nota: la API está alojada en un servicio gratuito (Render) que puede tardar unos
> segundos en responder la primera vez que se usa, si estuvo inactiva.

## Autor

THomas Bentancor — Tecnicatura Universitaria en Programación, UTN Avellaneda.