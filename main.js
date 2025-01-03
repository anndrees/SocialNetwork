import { users } from './data/users.js';
import { posts } from './data/posts.js';
import { comments } from './data/comments.js';
import { photos } from './data/photos.js';
import { todos } from './data/todos.js';

import { User } from './models/User.js';
import { Post } from './models/Post.js';
import { Comment } from './models/Comment.js';
import { Todo } from './models/Todo.js';
import { Photo } from './models/Photo.js';

// Arrays para almacenar los objetos
const usuariosObjetos = [];
const publicacionesObjetos = [];
const comentariosObjetos = [];
let todosObjetos = [];
let imagenes = [];

// Inicializar todos
todos.forEach(todoData => {
  const todo = new Todo(todoData.id, todoData.userId, todoData.title, todoData.completed);
  todosObjetos.push(todo);
});

// Crear usuarios predefinidos
let idMaximo = 0;
for (let i = 0; i < users.length; i++) {
  if (users[i].id > idMaximo) {
    idMaximo = users[i].id;
  }
}

const usuariosPredefinidos = [
  { id: idMaximo + 1, name: "Andrés", username: "andres.aranda", email: "andres@example.com", lat: "38.471785", lng: "-0.796950", phone: "123-456-789", website: "andres.dev" },
  { id: idMaximo + 2, name: "Saúl", username: "saul.dominguez", email: "saul@example.com", lat: "38.435533", lng: "-0.839848", phone: "234-567-890", website: "saul.dev" },
  { id: idMaximo + 3, name: "Miguel", username: "miguel.rico", email: "miguel@example.com", lat: "38.435533", lng: "-0.839848", phone: "345-678-901", website: "miguel.dev" },
  { id: idMaximo + 4, name: "Carlos", username: "carlos.perea", email: "carlos@example.com", lat: "38.38236415002482", lng: "-0.7611997778939564", phone: "456-789-012", website: "carlos.dev" }
];

// Crear objetos User para los usuarios predefinidos
usuariosPredefinidos.forEach(datosUsuario => {
  const usuario = new User(
    datosUsuario.id,
    datosUsuario.name,
    datosUsuario.username,
    datosUsuario.email,
    datosUsuario.lat,
    datosUsuario.lng,
    datosUsuario.phone,
    datosUsuario.website
  );
  usuariosObjetos.push(usuario);
});

// Crear objetos User para los usuarios del JSON
users.forEach(datosUsuario => {
  const usuario = new User(
    datosUsuario.id,
    datosUsuario.name,
    datosUsuario.username,
    datosUsuario.email,
    datosUsuario.address.geo.lat,
    datosUsuario.address.geo.lng,
    datosUsuario.phone,
    datosUsuario.website
  );
  usuariosObjetos.push(usuario);
  usuariosPredefinidos.push(usuario);
});

//Coger el contenedor de añadir usuario
let contenedorAddUser = document.querySelector(".contenedor-add-user");
let div = document.querySelector("#modal-add-user");

//Este es el contenedor de el logo de añadir usuario que cuando se haga click se mostrará un div oculto (un formulario)
contenedorAddUser.addEventListener("click", () => {
  //Con esto mostramos el formulario
  div.classList.remove("oculto");
  div.classList.add("modal-open");
});

//CREAR USUARIO
//Nos creamos las variales de las expresiones regulares

//Nombre: letras, espacios y acentos, mínimo 2 caracteres
let nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

//Nombre de usuario: letras, números y guiones bajos, 3-20 caracteres
let nombreUserRegex = /^[a-zA-Z0-9_]{3,20}$/;

//Correo electrónico
let correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//Latitud: número decimal entre -90 y 90
let latitudRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

//Longitud: número decimal entre -180 y 180
let longitudRegex = /^-?((1[0-7]\d(\.\d+)?)|([1-9]?\d(\.\d+)?)|180(\.0+)?)$/;

//teléfono: formato español (9 dígitos, puede empezar con +34)
let telefonoRegex = /^(\+34|0034|34)?[6-9]\d{8}$/;

//Expresión regular para validar URLs opcionales con http/https, www, nombre de dominio y extensión, permitiendo rutas opcionales.
let sitioWebRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

function camposValidos() {
  let nombre = document.querySelector("#nombrePersona");
  let nombreUser = document.querySelector("#user-Name");
  let correo = document.querySelector("#correo-User");
  let latitud = document.querySelector("#latitud");
  let longitud = document.querySelector("#longitud");
  let telefono = document.querySelector("#telefono");
  let sitioWeb = document.querySelector("#sitio-web");

  let esValido = true;

  function validarCampo(elemento, regex) {
    if (!regex.test(elemento.value)) {
      elemento.style.borderColor = "red";
      esValido = false;
    } else {
      elemento.style.borderColor = "";
    }
  }

  validarCampo(nombre, nombreRegex);
  validarCampo(nombreUser, nombreUserRegex);
  validarCampo(correo, correoRegex);
  validarCampo(latitud, latitudRegex);
  validarCampo(longitud, longitudRegex);
  validarCampo(telefono, telefonoRegex);
  validarCampo(sitioWeb, sitioWebRegex);

  return esValido;
}

//El id max de los users es siempre 14 al principio ya que contamos los de el grupo
let maxIdUsuario = 14;

//BOTÓN CREAR
//Cogemos el botónd de crear para hacer evento
let btnCrearUser = document.querySelector("#crearUser");

//EVENTO CREAR USER
//Creamos el evento de crear user
btnCrearUser.addEventListener("click", () => {
  //Comprobar los campos sean válidos
  if (camposValidos()) {
    let nombre = document.querySelector("#nombrePersona").value;
    let nombreUser = document.querySelector("#user-Name").value;
    let correo = document.querySelector("#correo-User").value;
    let latitud = document.querySelector("#latitud").value;
    let longitud = document.querySelector("#longitud").value;
    let telefono = document.querySelector("#telefono").value;
    let sitioWeb = document.querySelector("#sitio-web").value;

    //incrementamos el id maximo antes de crear al user
    maxIdUsuario = maxIdUsuario + 1;

    let nuevoUsuario = new User(maxIdUsuario, nombre, nombreUser, correo, latitud, longitud, telefono, sitioWeb);

    //metemos al user en el array
    usuariosPredefinidos.push(nuevoUsuario);
    usuariosObjetos.push(nuevoUsuario);

    let selectorUsuarioNuevo = document.getElementById('usuarioSelect');
    let opcionNueva = document.createElement('option');
    opcionNueva.value = nuevoUsuario.id;
    opcionNueva.textContent = `${nuevoUsuario.name} (@${nuevoUsuario.username})`;
    selectorUsuarioNuevo.appendChild(opcionNueva);

    // Reiniciar el formulario
    const form = document.querySelector(".formulario-usuario form");
    form.reset();

    // Limpiar mensaje de error si existe
    document.querySelector("#span-datos-incorrectos").textContent = "";

    // Cerrar el modal
    div.classList.add("oculto");
    div.classList.remove("modal-open");
    document.body.classList.remove("modal-open");

  } else {
    document.querySelector("#span-datos-incorrectos").textContent = "Los campos en rojo son incorrectos";
  }
});

//Este botón es para ocultar la creación del usuario
let btnCancelarUser = document.getElementById("cancelar-creacion-user");
btnCancelarUser.addEventListener("click", () => {
  div.classList.add("oculto");
  div.classList.remove("modal-open");
});

// Crear objetos Post
posts.forEach(datosPublicacion => {
  const publicacion = new Post(
    datosPublicacion.id,
    datosPublicacion.userId,
    datosPublicacion.title,
    datosPublicacion.body
  );

  // Encontrar el usuario correspondiente y asignarlo al post
  const usuario = usuariosObjetos.find(u => u.id === datosPublicacion.userId);
  if (usuario) {
    publicacion.asignarUsuario(usuario);
  }
  publicacionesObjetos.push(publicacion);
});

// Crear objetos Comment y asociarlos con las publicaciones
comments.forEach(datosComentario => {
  const comentario = new Comment(
    datosComentario.id,
    datosComentario.postId,
    datosComentario.name,
    datosComentario.email,
    datosComentario.body
  );
  comentariosObjetos.push(comentario);

  // Encontrar la publicacion a la que pertenece el comentario y agregarlo
  const publicacion = publicacionesObjetos.find(p => p.id === datosComentario.postId);
  if (publicacion) {
    publicacion.agregarComentario(comentario);
  }
});

// Establecer el select con los usuarios predefinidos
const selectorUsuario = document.getElementById('usuarioSelect');
usuariosPredefinidos.forEach(usuario => {
  const opcion = document.createElement('option');
  opcion.value = usuario.id;
  opcion.textContent = `${usuario.name} (@${usuario.username})`;
  selectorUsuario.appendChild(opcion);
});

// Manejar la creación de nuevas publicaciones
document.getElementById('nuevoPostForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = parseInt(document.getElementById('usuarioSelect').value);
  const title = document.getElementById('postTitulo').value;
  const body = document.getElementById('postBody').value;

  // Obtener el siguiente ID disponible
  let nextId = 0;
  for (const post of publicacionesObjetos) {
    nextId = Math.max(nextId, post.id);
  }
  nextId++;

  // Crear nuevo post
  const newPost = new Post(nextId, userId, title, body);
  const usuario = usuariosObjetos.find(u => u.id === userId);
  if (!usuario) {
    return;
  }
  newPost.asignarUsuario(usuario);

  // Añadir al principio del array
  publicacionesObjetos.splice(0, 0, newPost);

  // Renderizar la nueva publicación al principio del contenedor de posts
  const contenedorPublicaciones = document.getElementById('posts-container');
  contenedorPublicaciones.insertBefore(newPost.render(), contenedorPublicaciones.firstChild);

  // Limpiar el formulario
  this.reset();

  // Actualizar la busqueda
  realizarBusqueda(entradaBusqueda.value);
});

// Renderizar las publicaciones
const contenedorPublicaciones = document.getElementById('posts-container');
const fragmento = document.createDocumentFragment();

publicacionesObjetos.forEach(publicacion => {
  const elementoPublicacion = publicacion.render();

  // Actualizar el contador de comentarios
  const contadorComentarios = elementoPublicacion.querySelector('.comments-count');
  const cantidadComentarios = publicacion.comments.length;
  contadorComentarios.textContent = cantidadComentarios;

  fragmento.appendChild(elementoPublicacion);
});

contenedorPublicaciones.appendChild(fragmento);

// Lógica para el botón de volver arriba
const botonVolverArriba = document.getElementById('volverArriba');

// Mostrar/ocultar el botón según el scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    botonVolverArriba.classList.add('visible');
  } else {
    botonVolverArriba.classList.remove('visible');
  }
});

// Volver arriba con animación suave
botonVolverArriba.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Funcionalidad del modal
const modalEliminar = document.getElementById('modal-eliminar');
const btnCancelar = document.getElementById('btn-cancelar');
const btnEliminar = document.getElementById('btn-eliminar');

function mostrarModalEliminar() {
  modalEliminar.classList.remove('oculto');
  document.body.classList.add('modal-open');
}

function ocultarModalEliminar() {
  modalEliminar.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

function obtenerPapi(elemento, tipo) {
  let actual = elemento;
  while (actual && !actual.classList.contains(tipo)) {
    actual = actual.parentElement;
  }
  return actual;
}

// Eventos para la funcionalidad de eliminar
document.addEventListener('click', (e) => {
  if (e.target.closest('.eliminar-post-btn')) {
    mostrarModalEliminar();
    btnEliminar.addEventListener('click', (event) => {
      const postElement = obtenerPapi(e.target, "post");
      const postId = parseInt(postElement.getAttribute('data-post-id'));

      // Eliminar el post del array
      const indicePost = publicacionesObjetos.findIndex(post => post.id === postId);
      if (indicePost !== -1) {
        publicacionesObjetos.splice(indicePost, 1);
      }

      // Eliminar los comentarios asociados al post
      const comentariosAMantener = comentariosObjetos.filter(comment => comment.postId !== postId);
      comentariosObjetos.splice(0, comentariosObjetos.length, ...comentariosAMantener);

      postElement.remove();
      ocultarModalEliminar();

      // Actualizar los resultados de búsqueda
      realizarBusqueda(entradaBusqueda.value);
    }, { once: true });
  }

  if (e.target.closest('.delete-comment-btn')) {
    mostrarModalEliminar();
    btnEliminar.addEventListener('click', (event) => {
      const commentElement = obtenerPapi(e.target, "comment");
      const commentId = parseInt(commentElement.getAttribute('data-comment-id'));
      const postElement = commentElement.closest('.post');
      const postId = parseInt(postElement.querySelector('#post-id').textContent);

      // Eliminar el comentario del array
      const indiceComment = comentariosObjetos.findIndex(comment => comment.id === commentId);
      if (indiceComment !== -1) {
        comentariosObjetos.splice(indiceComment, 1);
      }

      // Actualizar el contador de comentarios en el post
      const comentariosPost = comentariosObjetos.filter(comment => comment.postId === postId);
      const contadorComentarios = postElement.querySelector('.comments-count');
      if (contadorComentarios) {
        contadorComentarios.textContent = comentariosPost.length;
      }

      // Verificar si el comentario eliminado era uno de los visibles
      const comentariosContainer = postElement.querySelector('.comments-container');
      if (comentariosContainer) {
        const comentariosVisibles = comentariosContainer.querySelectorAll('.comment:not(.hidden)');
        const eraVisible = Array.from(comentariosVisibles).some(c => c === commentElement);

        // Eliminar el comentario del DOM
        commentElement.remove();

        // Si era uno de los visibles y hay comentarios ocultos, mostrar el siguiente
        if (eraVisible) {
          const comentariosOcultos = comentariosContainer.querySelectorAll('.comment.hidden');
          if (comentariosOcultos.length > 0) {
            comentariosOcultos[0].classList.remove('hidden');
            comentariosOcultos[0].classList.add('showing');
          }
        }

        // Actualizar el enlace "Ver más comentarios"
        const verMasLink = comentariosContainer.querySelector('.ver-mas-comentarios');
        if (verMasLink) {
          if (comentariosPost.length <= 3) {
            verMasLink.style.display = 'none';
          }
        }
      }

      ocultarModalEliminar();

      // Actualizar los resultados de búsqueda
      realizarBusqueda(entradaBusqueda.value);
    }, { once: true });
  }

  if (e.target.closest('#btn-eliminar-usuario')) {
    const userId = modalUsuario.querySelector('.perfil-info').dataset.userId;
    ocultarModalUsuario();
    mostrarModalEliminar();

    btnEliminar.addEventListener('click', (event) => {
      const idUsuario = parseInt(userId);

      // Eliminar el usuario del array
      const indiceUsuario = usuariosObjetos.findIndex(user => user.id === idUsuario);
      if (indiceUsuario !== -1) {
        usuariosObjetos.splice(indiceUsuario, 1);
      }

      // Eliminar los posts del usuario
      const postsUsuario = publicacionesObjetos.filter(post => post.userId === idUsuario);
      postsUsuario.forEach(post => {
        const postElement = document.querySelector(`[data-post-id="${post.id}"]`);
        if (postElement) postElement.remove();
      });
      // Modificar el array existente en lugar de reasignarlo
      publicacionesObjetos.splice(0, publicacionesObjetos.length, ...publicacionesObjetos.filter(post => post.userId !== idUsuario));

      // Eliminar los comentarios del usuario (mismo cambio)
      comentariosObjetos.splice(0, comentariosObjetos.length, ...comentariosObjetos.filter(comment => comment.userId !== idUsuario));

      // Eliminar los todos del usuario (mismo cambio)
      todosObjetos.splice(0, todosObjetos.length, ...todosObjetos.filter(todo => todo.userId !== idUsuario));

      // Actualizar el select de usuarios
      const usuarioSelect = document.getElementById('usuarioSelect');
      const opcionUsuario = usuarioSelect.querySelector(`option[value="${idUsuario}"]`);
      if (opcionUsuario) opcionUsuario.remove();

      ocultarModalEliminar();

      // Actualizar los resultados de búsqueda con el valor actual del buscador
      realizarBusqueda(entradaBusqueda.value);
    }, { once: true });

    btnCancelar.addEventListener('click', (event) => {
      ocultarModalEliminar();
      mostrarPerfilUsuario(parseInt(userId));
    }, { once: true });
  }

  // Cerrar modal al hacer click fuera
  if (e.target === modalEliminar) {
    ocultarModalEliminar();
  }
});

btnCancelar.addEventListener('click', ocultarModalEliminar);


//Funcionalidad de modificar posts
const modalModificar = document.getElementById('modal-modificar');
const btnCancelarModificar = document.getElementById('btn-cancelar-modificar');
let formularioModificar = document.getElementById("modificarPost");

function mostrarModalModificar() {
  modalModificar.classList.remove('oculto');
  document.body.classList.add('modal-open');
}

function ocultarModalModificar() {
  modalModificar.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

// Eventos para la funcionalidad de modificar
document.addEventListener('click', (e) => {
  //modificar posts
  if (e.target.closest('.modificar-post-btn')) {

    mostrarModalModificar();
    document.getElementById("modificarTitulo").value = obtenerPapi(e.target, "post").querySelector(".post-titulo").textContent;
    document.getElementById("modificarBody").value = obtenerPapi(e.target, "post").querySelector(".post-body").textContent;

    let publicacion1 = publicacionesObjetos.find((publicacion) => publicacion.id == obtenerPapi(e.target, "post").getAttribute("data-post-id"));

    if (publicacion1) {
      formularioModificar.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!document.getElementById("modificarTitulo").value == "") {
          publicacion1.title = document.getElementById("modificarTitulo").value;
        }
        if (!document.getElementById("modificarBody").value == "") {
          publicacion1.body = document.getElementById("modificarBody").value;
        }

        let postsArray = Array.from(document.querySelectorAll(".post"));
        let postObjetivo = postsArray.find((post) => post.getAttribute("data-post-id") == publicacion1.id);
        postObjetivo.querySelector(".post-titulo").textContent = publicacion1.title;
        postObjetivo.querySelector(".post-body").textContent = publicacion1.body;

        ocultarModalModificar();

      }, { once: true });

    }
    //modificar comentarios
  }else if (e.target.closest(".edit-comment-btn")) {
    mostrarModalModificar();  
    document.getElementById("modificarTitulo").value = obtenerPapi(e.target,"comment").querySelector(".comment-autor").textContent;
    document.getElementById("modificarBody").value =  obtenerPapi(e.target,"comment").querySelector(".comment-body").textContent;

    let comentario1 = comentariosObjetos.find((comentario) => comentario.id == obtenerPapi(e.target, "comment").getAttribute("data-comment-id"));

    if (comentario1) {
      formularioModificar.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!document.getElementById("modificarTitulo").value == "") {
          comentario1.name = document.getElementById("modificarTitulo").value;
        }
        if (!document.getElementById("modificarBody").value == "") {
          comentario1.body = document.getElementById("modificarBody").value;
        }

        let comentsArray = Array.from(document.querySelectorAll(".comment"));
        let commentObjetivo = comentsArray.find((coment) => coment.getAttribute("data-comment-id") == comentario1.id);
        commentObjetivo.querySelector(".comment-autor").textContent = comentario1.name;
        commentObjetivo.querySelector(".comment-body").textContent = comentario1.body;

        ocultarModalModificar();

      }, { once: true });

    }

  }
  // Cerrar modal al hacer click fuera
  if (e.target === modalModificar) {
    ocultarModalModificar();
  }

});
btnCancelarModificar.addEventListener('click', ocultarModalModificar);


//Modificar TODO

let btnClicado = false;

document.addEventListener('click', (e) => {
  try {
    if (e.target.closest('.edit-todo')) {
      let elementoPadre = obtenerPapi(e.target, "todo-item");
      let textoInput = elementoPadre.querySelector("label").textContent;
      let id = elementoPadre.querySelector(".edit-todo").getAttribute("data-todo-id");
      let todoActual = todosObjetos.find((todo) => todo.id == id);
      if (!btnClicado) {
        elementoPadre.querySelector("label").innerHTML = 
          `<input type="text" value="${textoInput}" class="editable-input">`;
        
        elementoPadre.querySelector("input[type='text']").focus();
      } else {
        if (elementoPadre.querySelector("input[type='text']").value != "") {
          textoInput = elementoPadre.querySelector("input[type='text']").value;
        }
        elementoPadre.querySelector("label").textContent = textoInput;
        todoActual.title = textoInput;
      }
  
      btnClicado = !btnClicado;
    }
  
    if (!e.target.closest('.todo-item') && btnClicado) {
    
        btnClicado = false;
    }
  } catch (error) {
    
  }
  
});

// Configuración de búsqueda
const entradaBusqueda = document.getElementById('buscador');
const opcionesBusqueda = document.querySelectorAll('.search-option');
const encabezadoResultados = document.querySelector('.search-results-header');
const listaResultados = document.querySelector('.search-results-list');
let tipoBusquedaSeleccionado = 'publicaciones';

// Evento para cambiar el tipo de búsqueda
opcionesBusqueda.forEach(opcion => {
  opcion.addEventListener('click', () => {
    // Remover la clase selected de todas las opciones
    opcionesBusqueda.forEach(opt => opt.classList.remove('selected'));
    // Añadir la clase selected a la opción clickeada
    opcion.classList.add('selected');
    // Actualizar el tipo de búsqueda seleccionado
    tipoBusquedaSeleccionado = opcion.dataset.type;
    // Realizar la búsqueda con el nuevo tipo
    realizarBusqueda(entradaBusqueda.value);
  });
});

// Evento para realizar la búsqueda mientras se escribe
entradaBusqueda.addEventListener('input', (e) => {
  realizarBusqueda(e.target.value);
});

// Realizar búsqueda inicial para mostrar todas las publicaciones
realizarBusqueda('')

// Funcionalidad del modal de usuario
const modalUsuario = document.getElementById('modal-usuario');
const btnCerrarModalUsuario = modalUsuario.querySelector('.cerrar-modal');
let clicado = false;

// Hacer la función mostrarPerfilUsuario disponible globalmente
window.mostrarPerfilUsuario = function (userId) {
  const usuario = usuariosObjetos.find(user => user.id === userId);
  if (!usuario) return;

  modalUsuario.querySelector('.perfil-info').dataset.userId = userId;

  // Código existente del perfil...
  modalUsuario.querySelector('.perfil-avatar').src = usuario.getAvatarUrl(120);
  modalUsuario.querySelector('.perfil-nombre').textContent = usuario.name;
  modalUsuario.querySelector('.perfil-username').textContent = `@${usuario.username}`;
  modalUsuario.querySelector('.perfil-email').textContent = usuario.email;
  modalUsuario.querySelector('.perfil-telefono').textContent = usuario.phone;

  const websiteLink = modalUsuario.querySelector('.perfil-website');
  websiteLink.href = `http://${usuario.website}`;
  websiteLink.textContent = usuario.website;

  modalUsuario.querySelector('.perfil-ubicacion').textContent = `Lat: ${usuario.lat}, Lng: ${usuario.lng}`;

  // Configurar el enlace a Google Maps
  const mapaLink = modalUsuario.querySelector('.perfil-mapa');
  mapaLink.href = `https://www.google.com/maps/search/?api=1&query=${usuario.lat},${usuario.lng}&zoom=20`;

  // Mostrar los todos del usuario
  const todosUsuario = todosObjetos.filter(todo => todo.userId === userId);
  const todosContainer = document.querySelector('.user-todos-list');
  todosContainer.innerHTML = '';

  todosUsuario.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <div>
        <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
        <label for="todo-${todo.id}">${todo.title}</label>
      </div>
      <div class="todo-actions">
        <button class="edit-todo" data-todo-id="${todo.id}">
          <img src="img/pencil-svgrepo-com.svg" alt="Editar" title="Editar to-do">
        </button>
        <button class="delete-todo" data-todo-id="${todo.id}">
          <img src="img/papelera.svg" alt="Eliminar" title="Eliminar to-do">
        </button>
      </div>
    `;

    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
      todo.completed = e.target.checked;
    });

    todosContainer.appendChild(todoItem);
  });

  let email = modalUsuario.querySelector('.perfil-email');
  let telefono = modalUsuario.querySelector('.perfil-telefono');

  let btnModificarUsuario = modalUsuario.querySelector(".btn-modificar-usuario");
  btnModificarUsuario.addEventListener("click", () => {
    const userId = modalUsuario.querySelector('.perfil-info').dataset.userId;
    const usuario = usuariosObjetos.find(u => u.id === parseInt(userId));
    if (usuario) {
      mostrarModalModificarUsuario(usuario);
    }
  });

  // Mostrar el modal
  modalUsuario.classList.remove('oculto');
  document.getElementById('userId-tarea').value = usuario.id;
  document.body.classList.add('modal-open');
};

function ocultarModalUsuario() {
  modalUsuario.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

// Eventos para abrir/cerrar el modal de usuario
btnCerrarModalUsuario.addEventListener('click', ocultarModalUsuario);
modalUsuario.addEventListener('click', (e) => {
  if (e.target === modalUsuario) {
    ocultarModalUsuario();
  }
});

// Evento para eliminar to-dos
document.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete-todo');
  if (deleteBtn) {
    const todoId = parseInt(deleteBtn.dataset.todoId);
    todosObjetos = todosObjetos.filter(todo => todo.id !== todoId);
    deleteBtn.closest('.todo-item').remove();
  }
});

// Función para mostrar los resultados
function mostrarResultados(resultados, tipo) {
  encabezadoResultados.textContent = `${resultados.length} resultados encontrados`;

  listaResultados.innerHTML = '';
  resultados.forEach(resultado => {
    let template;
    switch (tipo) {
      case 'usuarios':
        template = document.querySelector('#usuario-resultado-template').content.cloneNode(true);
        template.querySelector('.username').textContent = `@${resultado.username}`;
        template.querySelector('.name').textContent = resultado.name;
        template.querySelector('.usuario').dataset.userid = resultado.id;
        template.querySelector('.usuario-resultado-avatar').src = resultado.getAvatarUrl(30);
        break;

      case 'fotos':
        template = document.querySelector('#foto-resultado-template').content.cloneNode(true);
        const img = template.querySelector('.photo-img');
        img.src = resultado.url;
        img.alt = resultado.title;
        template.querySelector('.photo-title').textContent = resultado.title;
        template.querySelector('.item-resultado-busqueda.photo').dataset.photoId = resultado.id;
        break;

      case 'publicaciones':
        template = document.querySelector('#publicacion-resultado-template').content.cloneNode(true);
        const autor = usuariosObjetos.find(user => user.id === resultado.userId);
        template.querySelector('.post-title').textContent = resultado.title;
        template.querySelector('.post-author').textContent = `Publicado por @${autor.username}`;
        template.querySelector('.item-resultado-busqueda').dataset.postId = resultado.id;
        break;

      case 'comentarios':
        template = document.querySelector('#comentario-resultado-template').content.cloneNode(true);
        template.querySelector('.comment-name').textContent = resultado.name;
        template.querySelector('.comment-body').textContent = `${resultado.body.substring(0, 100)}...`;
        template.querySelector('.item-resultado-busqueda').dataset.commentId = resultado.id;
        template.querySelector('.item-resultado-busqueda').dataset.postId = resultado.postId;
        break;

      case 'todos':
        template = document.querySelector('#todo-resultado-template').content.cloneNode(true);
        template.querySelector('.todo-title').textContent = resultado.title;
        template.querySelector('.todo-status').textContent = resultado.completed ? '✓ Completado' : '○ Pendiente';
        // Buscar el usuario correspondiente y mostrar su nombre
        const usuario = usuariosObjetos.find(user => user.id === resultado.userId);
        if (usuario) {
          template.querySelector('.todo-user').textContent = `Tarea de: ${usuario.name} (@${usuario.username})`;
          template.querySelector('.item-resultado-busqueda').dataset.userId = usuario.id;
        }
        break;

      default:
        template = document.createElement('div');
        template.className = 'item-resultado-busqueda';
        template.textContent = resultado.title || resultado.name;
    }

    listaResultados.appendChild(template);
  });

  // Añadir event listeners para los resultados de usuarios
  if (tipo === 'usuarios') {
    // si se hace click en un resultado de usuario, se abre su perfil en un modal
    const resultadosUsuarios = listaResultados.querySelectorAll('.item-resultado-busqueda.usuario');
    resultadosUsuarios.forEach(resultado => {
      resultado.addEventListener('click', () => {
        const userId = parseInt(resultado.dataset.userid);
        const usuario = usuariosObjetos.find(user => user.id === userId);
        if (usuario) {
          mostrarPerfilUsuario(usuario.id);
        }
      });
    });
  } else if (tipo === 'publicaciones') {
    // si se hace click en un resultado de publicación, se hace scroll hasta ella para verla en detalle
    listaResultados.querySelectorAll('.item-resultado-busqueda').forEach(resultado => {
      resultado.addEventListener('click', () => {
        const postId = resultado.dataset.postId;
        const postElement = document.querySelector(`.post[data-post-id="${postId}"]`);
        if (postElement) {
          const offsetTop = postElement.offsetTop - 90;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  } else if (tipo === 'comentarios') {
    listaResultados.querySelectorAll('.item-resultado-busqueda').forEach(resultado => {
      resultado.addEventListener('click', () => {
        const commentId = resultado.dataset.commentId;
        const postId = resultado.dataset.postId;
        const postElement = document.querySelector(`.post[data-post-id="${postId}"]`);

        if (postElement) {
          // Hacer scroll hasta el post
          const offsetTop = postElement.offsetTop - 90;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Esperar a que termine el scroll y buscar el comentario
          setTimeout(() => {
            const commentElement = postElement.querySelector(`.comment[data-comment-id="${commentId}"]`);
            const commentsContainer = postElement.querySelector('.comments-container');

            // Si el comentario está oculto, mostrar más comentarios
            if (commentElement && commentElement.classList.contains('hidden')) {
              const verMasLink = commentsContainer.querySelector('.ver-mas-comentarios');
              // Ejecutamos la función mostrarSiguientesComentarios después de 300 ms hasta que el comentario se muestre
              const mostrarSiguientesComentarios = () => {
                if (verMasLink && !verMasLink.style.display && commentElement.classList.contains('hidden')) {
                  verMasLink.click();
                  setTimeout(mostrarSiguientesComentarios, 300);
                } else {
                  // Resaltar el comentario con una animación
                  commentElement.style.transition = 'opacity 0.3s ease-in-out';
                  commentElement.style.opacity = '0.3';
                  setTimeout(() => {
                    commentElement.style.opacity = '1';
                  }, 300);
                }
              };
              mostrarSiguientesComentarios();
            } else if (commentElement) {
              // Si el comentario ya es visible, solo resaltarlo
              commentElement.style.transition = 'opacity 0.3s ease-in-out';
              commentElement.style.opacity = '0.3';
              setTimeout(() => {
                commentElement.style.opacity = '1';
              }, 300);
            }
          }, 800);
        }
      });
    });
  } else if (tipo === 'todos') {
    // Añadir event listener para los resultados de to-dos
    listaResultados.querySelectorAll('.item-resultado-busqueda').forEach(resultado => {
      resultado.addEventListener('click', () => {
        // Convertir a número ya que es un string
        const userId = parseInt(resultado.dataset.userId);
        const usuario = usuariosObjetos.find(user => user.id === userId);
        if (usuario) {
          mostrarPerfilUsuario(userId);
        }
      });
    });
  }
}

// Función para realizar la búsqueda
function realizarBusqueda(consulta) {
  let resultados = [];
  consulta = consulta ? consulta.toLowerCase() : '';

  switch (tipoBusquedaSeleccionado) {
    case 'usuarios':
      resultados = usuariosObjetos.filter(usuario =>
        consulta ? usuario.username.toLowerCase().includes(consulta) : true
      );
      break;
    case 'publicaciones':
      resultados = publicacionesObjetos.filter(publicacion =>
        consulta ? publicacion.title.toLowerCase().includes(consulta) : true
      );
      break;
    case 'comentarios':
      resultados = comentariosObjetos.filter(comentario =>
        consulta ? comentario.name.toLowerCase().includes(consulta) : true
      );
      break;
    case 'fotos':
      resultados = photos.filter(foto =>
        consulta ? foto.title.toLowerCase().includes(consulta) : true
      ).map(foto => new Photo(foto.albumId, foto.id, foto.title, foto.url, foto.thumbnailUrl));
      break;
    case 'todos':
      resultados = todosObjetos.filter(tarea =>
        consulta ? tarea.title.toLowerCase().includes(consulta) : true
      );
      break;
  }

  mostrarResultados(resultados, tipoBusquedaSeleccionado);
}

// Funciones para el modal de fotos
function mostrarModalFoto(foto) {
  const modalFoto = document.getElementById('modal-foto');
  const modalBody = modalFoto.querySelector(".modal-body");
  const tituloFoto = modalFoto.querySelector("#titulo-foto");
  const imagen = modalFoto.querySelector(".foto-imagen");
  const albumSpan = modalFoto.querySelector(".foto-album span");
  const urlLink = modalFoto.querySelector(".foto-url a");
  
  // Establecer título y datos de la foto
  tituloFoto.textContent = foto.title;
  tituloFoto.dataset.photoId = foto.id;
  
  // Establecer imagen y sus atributos
  imagen.src = foto.url;
  imagen.alt = foto.title;
  
  // Establecer información adicional
  albumSpan.textContent = foto.albumId;
  urlLink.href = foto.url;
  urlLink.textContent = foto.url;
  
  modalFoto.classList.remove("oculto");
  document.body.classList.add("modal-open");
}

function ocultarModalFoto() {
  const modalFoto = document.getElementById('modal-foto');
  modalFoto.classList.add("oculto");
  document.body.classList.remove("modal-open");
}

// Event listeners para el modal de fotos
document.addEventListener('click', (e) => {
  const fotoResultado = e.target.closest('.item-resultado-busqueda.photo');
  if (fotoResultado) {
    const fotoId = fotoResultado.dataset.photoId;
    const foto = photos.find(p => p.id === parseInt(fotoId));
    if (foto) {
      mostrarModalFoto(foto);
    }
  }

  if (e.target.closest('#modal-foto .cerrar-modal')) {
    ocultarModalFoto();
  }

  if (e.target.id === 'modal-foto') {
    ocultarModalFoto();
  }

  if (e.target.closest('#btn-eliminar-foto')) {
    const modalFoto = document.getElementById('modal-foto');
    const fotoId = parseInt(modalFoto.querySelector('.foto-imagen').dataset.photoId);
    const foto = photos.find(p => p.id === fotoId);

    // Cerrar el modal de la foto
    ocultarModalFoto();

    // Mostrar el modal de confirmación
    mostrarModalEliminar();

    // Evento para el botón de eliminar
    btnEliminar.addEventListener('click', () => {
      // Eliminar la foto del array
      const indice = photos.findIndex(f => f.id === fotoId);
      if (indice !== -1) {
        photos.splice(indice, 1);
      }

      // Eliminar el resultado de búsqueda si existe
      const resultadoFoto = document.querySelector(`.item-resultado-busqueda.photo[data-photo-id="${fotoId}"]`);
      if (resultadoFoto) {
        resultadoFoto.remove();
      }

      ocultarModalEliminar();

      // Actualizar los resultados de búsqueda si estamos en la sección de fotos
      if (tipoBusquedaSeleccionado === 'fotos') {
        realizarBusqueda(entradaBusqueda.value);
      }
    }, { once: true });

    // Evento para el botón de cancelar
    btnCancelar.addEventListener('click', () => {
      ocultarModalEliminar();
      if (foto) {
        mostrarModalFoto(foto);
      }
    }, { once: true });
  }
});

// Funciones para el modal de comentarios
function mostrarModalComentarios(postElement) {
  const postId = postElement.querySelector('#post-id').textContent;
  const modalComentarios = postElement.querySelector('#modal-add-comments');
  modalComentarios.classList.remove('oculto');
  document.body.classList.add('modal-open');

  // Obtener el select de usuarios en el modal de comentarios
  const usuarioSelectComentarios = modalComentarios.querySelector('#usuarioSelectComentario');

  // Limpiar opciones existentes
  usuarioSelectComentarios.innerHTML = '<option value="">Selecciona un usuario</option>';

  // Poblar el select con todos los usuarios
  usuariosObjetos.forEach(usuario => {
    const option = document.createElement('option');
    option.value = usuario.id;
    option.textContent = usuario.name + ' (@' + usuario.username + ')';
    usuarioSelectComentarios.appendChild(option);
  });
}

function ocultarModalComentarios(postElement) {
  const modalComentarios = postElement.querySelector('#modal-add-comments');
  modalComentarios.classList.add('oculto');
  document.body.classList.remove('modal-open'); // Desbloquear el scroll
}

// Eventos para el modal de comentarios
document.addEventListener('click', (e) => {
  if (e.target.closest('#add-comment')) {
    const postElement = obtenerPapi(e.target, 'post');
    if (postElement) {
      mostrarModalComentarios(postElement);
      
      // Llenar el select de usuarios
      const usuarioSelect = document.getElementById('usuarioSelectComentario');
      usuarioSelect.innerHTML = '<option value="">Selecciona un usuario</option>';
      usuariosObjetos.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.name;
        usuarioSelect.appendChild(option);
      });
    }
  }
});

document.getElementById('publicarComment').addEventListener('click', () => {
  const postElement = document.querySelector('.post');
  if (validarFormularioComentario()) {
    crearComentario(postElement);
  }
});

document.getElementById('cancelar-comment').addEventListener('click', () => {
  const postElement = document.querySelector('.post');
  ocultarModalComentarios(postElement);
});

// Función para validar el formulario de comentario
function validarFormularioComentario() {
  const usuario = document.getElementById('usuarioSelectComentario').value;
  const titulo = document.getElementById('tituloComment').value;
  const contenido = document.getElementById('bodyComment').value;
  
  if (!usuario || !titulo || !contenido) {
    alert('Por favor, rellena todos los campos');
    return false;
  }
  return true;
}

// Función para crear un nuevo comentario
function crearComentario(postElement) {
  const postId = postElement.querySelector('#post-id').textContent;
  const userId = parseInt(document.getElementById('usuarioSelectComentario').value);
  const titulo = document.getElementById('tituloComment').value;
  const contenido = document.getElementById('bodyComment').value;

  // Encontrar el máximo ID actual de comentarios
  const maxId = Math.max(...comentariosObjetos.map(comment => comment.id), 0);

  // Crear el nuevo comentario
  const nuevoComentario = new Comment(maxId + 1, postId, titulo, contenido, userId);

  // Añadir el comentario al array
  comentariosObjetos.push(nuevoComentario);

  // Actualizar la vista
  const commentsContainer = postElement.querySelector('.comments-container');
  const commentsCount = postElement.querySelector('.comments-count');

  // Crear y añadir el nuevo comentario al DOM
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.dataset.commentId = nuevoComentario.id;

  const usuario = usuariosObjetos.find(user => user.id === userId);

  commentElement.innerHTML = `
    <div class="comment-cabecera">
      <div class="comment-autor-container">
        <img class="comment-avatar" src="https://ui-avatars.com/api/?name=${usuario?.name || 'User'}&background=random" alt="Avatar del autor">
        <div class="comment-autor-info">
          <strong class="comment-autor">${usuario?.name || 'Usuario'}</strong>
          <span class="comment-username">@${usuario?.username || 'usuario'}</span>
        </div>
      </div>
      <div class="comment-actions">
        <button class="edit-comment-btn">
          <img src="img/pencil-square-svgrepo-com.svg" alt="Editar comentario" title="Editar comentario">
        </button>
        <button class="delete-comment-btn">
          <img src="img/papelera.svg" alt="Eliminar comentario" title="Eliminar comentario">
        </button>
      </div>
    </div>
    <p class="comment-body">${contenido}</p>
  `;

  commentsContainer.appendChild(commentElement);

  // Actualizar el contador de comentarios
  const comentariosPost = comentariosObjetos.filter(comment => comment.postId === parseInt(postId));
  commentsCount.textContent = comentariosPost.length;

  // Cerrar el modal y limpiar el formulario
  const modalComentarios = document.getElementById('modal-add-comments');
  modalComentarios.classList.add('oculto');
  document.body.classList.remove('modal-open'); // Desbloquear el scroll
  document.getElementById('usuarioSelectComentario').value = '';
  document.getElementById('tituloComment').value = '';
  document.getElementById('bodyComment').value = '';
}

// Eventos para el modal de comentarios
document.addEventListener('click', (e) => {
  const addCommentBtn = e.target.closest('#add-comment');
  const modalComentarios = e.target.closest('#modal-add-comments');
  const formularioComentario = e.target.closest('.formulario-comentario');

  if (addCommentBtn) {
    const postElement = addCommentBtn.closest('.post');
    mostrarModalComentarios(postElement);
  }

  // Si se hace clic fuera del formulario y dentro del modal, cerrar el modal
  if (modalComentarios && !formularioComentario) {
    const postElement = modalComentarios.closest('.post');
    ocultarModalComentarios(postElement);
    document.body.classList.remove('modal-open');
  }

  if (e.target.id === 'cancelar-comment') {
    const postElement = e.target.closest('.post');
    ocultarModalComentarios(postElement);
  }

  if (e.target.id === 'publicarComment') {
    const postElement = e.target.closest('.post');
    const modalComentarios = postElement.querySelector('#modal-add-comments');
    const usuarioId = modalComentarios.querySelector('#usuarioSelectComentario').value;
    const titulo = modalComentarios.querySelector('#tituloComment').value;
    const contenido = modalComentarios.querySelector('#bodyComment').value;

    if (usuarioId && titulo && contenido) {
      // Aquí iría la lógica para crear el comentario
      // Por ahora solo ocultamos el modal
      ocultarModalComentarios(postElement);
      document.body.classList.remove('modal-open');

      // Limpiar el formulario
      modalComentarios.querySelector('form').reset();
    }
  }
});

//CREAR NUEVAS TAREAS

//Hacemos que el formulario se muestre
let formOculto = document.querySelector("#form-oculto");
let btnAddTarea = document.getElementById("add-tarea");

btnAddTarea.addEventListener("click", () => {
  formOculto.style.display = "block";
});

//Creamos la tarea nueva
let btnCrearTarea = document.querySelector("#crear-tarea");
btnCrearTarea.addEventListener("click", () => {
  const userId = document.getElementById("userId-tarea").value;
  let tituloTarea = document.getElementById("nombreTarea").value;

  // Encontrar el ID más alto actual
  const maxId = Math.max(...todosObjetos.map(todo => todo.id), 0);

  // Crear nueva tarea con ID siguiente al máximo
  let nuevaTarea = new Todo(maxId + 1, parseInt(userId), tituloTarea, false);
  todosObjetos.unshift(nuevaTarea);

  // Ocultar formulario y limpiar campo
  formOculto.style.display = "none";
  document.getElementById("nombreTarea").value = ``;

  // Actualizar la vista del perfil
  mostrarPerfilUsuario(parseInt(userId));
});

//Hacemos que el formulario se oculte
let btnCancelarTarea = document.getElementById("cancelar-tarea");
btnCancelarTarea.addEventListener("click", () => {
  formOculto.style.display = "none";
});

//CREAMOS NUEVAS IMAGENES
//Coger el contenedor de añadir imagen, el modal a mostrar y los botones
let numeroFotosArchivo = photos.length; //Esto es para ver el número de imagenes del json
let contenedorAddImagen = document.querySelector(".contenedor-add-photo");
let divImagen = document.querySelector("#modal-add-imagen");
let btnCancelarNuevaImagen = document.querySelector("#cancelar-creacion-imagen");
let btnAddImagen = document.querySelector("#add-imagen");
let formImagen = document.querySelector("#form-add-imagen");

//Este es el contenedor de el logo de añadir imagen que cuando se haga click se mostrará un div oculto (un formulario)
contenedorAddImagen.addEventListener("click", () => {
  divImagen.classList.remove("oculto");
  divImagen.classList.add("modal-open");
});

//Aquí se creará la imagen (se guardará en memoria) 
btnAddImagen.addEventListener("click",()=>{
  let tituloImagen = document.querySelector("#tituloImagen").value;
  let archivoImagen = document.querySelector("#subirImagen").files[0];

  if (tituloImagen && archivoImagen) {
    // Crear URL temporal para la imagen
    const urlTemporal = URL.createObjectURL(archivoImagen);
    
    // Crear nueva foto con la URL temporal
    let nuevaImagen = new Photo(1, numeroFotosArchivo + 1, tituloImagen, urlTemporal, urlTemporal);
    photos.unshift(nuevaImagen);
    numeroFotosArchivo++;

    // Limpiar el formulario
    document.querySelector("#tituloImagen").value = "";
    document.querySelector("#subirImagen").value = ``;

    // Cerrar el modal
    divImagen.classList.add("oculto");
    divImagen.classList.remove("modal-open");

    // Actualizar los resultados de búsqueda si estamos en la sección de fotos
    if (tipoBusquedaSeleccionado === 'fotos') {
      realizarBusqueda(entradaBusqueda.value);
    }
  }
});

//Aquí para cuando se pulse cancelar se oculte el modal
btnCancelarNuevaImagen.addEventListener("click",()=>{
  // Limpiar el formulario
  document.querySelector("#tituloImagen").value = "";
  document.querySelector("#subirImagen").value = ``;
  
  divImagen.classList.add("oculto");
  divImagen.classList.remove("modal-open");
});

// Funciones para el modal de modificar usuario
function mostrarModalModificarUsuario(usuario) {
  const modalModificarUsuario = document.getElementById('modal-modificar-usuario');
  const form = document.getElementById('form-modificar-usuario');
  
  // Rellenar el formulario con los datos actuales
  document.getElementById('mod-nombre').value = usuario.name;
  document.getElementById('mod-email').value = usuario.email;
  document.getElementById('mod-telefono').value = usuario.phone;
  document.getElementById('mod-website').value = usuario.website;
  
  // Guardar el ID del usuario en el formulario
  form.dataset.userId = usuario.id;
  
  // Mostrar el modal
  modalModificarUsuario.classList.remove('oculto');
  document.body.classList.add('modal-open');
}

function ocultarModalModificarUsuario() {
  const modalModificarUsuario = document.getElementById('modal-modificar-usuario');
  modalModificarUsuario.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

// Event listeners para el modal de modificar usuario
document.addEventListener('DOMContentLoaded', () => {
  const modalModificarUsuario = document.getElementById('modal-modificar-usuario');
  const form = document.getElementById('form-modificar-usuario');
  const btnCancelar = document.getElementById('btn-cancelar-modificar-usuario');
  const btnCerrar = modalModificarUsuario.querySelector('.cerrar-modal');

  // Evento para guardar los cambios
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = parseInt(form.dataset.userId);
    const usuario = usuariosObjetos.find(u => u.id === userId);
    
    if (usuario) {
      // Actualizar los datos del usuario
      usuario.name = document.getElementById('mod-nombre').value;
      usuario.email = document.getElementById('mod-email').value;
      usuario.phone = document.getElementById('mod-telefono').value;
      usuario.website = document.getElementById('mod-website').value;
      
      // Actualizar la vista del perfil
      const perfilNombre = modalUsuario.querySelector('.perfil-nombre');
      const perfilEmail = modalUsuario.querySelector('.perfil-email');
      const perfilTelefono = modalUsuario.querySelector('.perfil-telefono');
      const perfilWebsite = modalUsuario.querySelector('.perfil-website');
      
      perfilNombre.textContent = usuario.name;
      perfilEmail.textContent = usuario.email;
      perfilTelefono.textContent = usuario.phone;
      perfilWebsite.textContent = usuario.website;
      perfilWebsite.href = usuario.website.startsWith('http') ? usuario.website : `http://${usuario.website}`;
      
      // Actualizar la búsqueda si hay un término de búsqueda activo
      const searchInput = document.getElementById('buscador');
      if (searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.toLowerCase();
        const resultados = usuariosObjetos.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.phone.toLowerCase().includes(searchTerm) ||
          user.website.toLowerCase().includes(searchTerm)
        );
        mostrarResultados(resultados, 'usuarios');
      }
      
      // Cerrar el modal
      ocultarModalModificarUsuario();
    }
  });

  // Eventos para cerrar el modal
  btnCancelar.addEventListener('click', ocultarModalModificarUsuario);
  btnCerrar.addEventListener('click', ocultarModalModificarUsuario);
  modalModificarUsuario.addEventListener('click', (e) => {
    if (e.target === modalModificarUsuario) {
      ocultarModalModificarUsuario();
    }
  });
});

// Función para convertir el título en input
function convertirTituloEnInput(foto) {
  const tituloFoto = document.querySelector("#titulo-foto");
  const tituloContainer = document.querySelector(".titulo-imagen");
  const btnEditar = tituloContainer.querySelector(".btn-editar-foto");
  
  // Crear el input y el botón de guardar
  const input = document.createElement("input");
  input.type = "text";
  input.value = foto.title;
  input.id = "editar-titulo-foto";
  
  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar";
  btnGuardar.classList.add("btn-guardar-titulo");
  
  // Ocultar el título y el botón de editar
  tituloFoto.style.display = "none";
  btnEditar.style.display = "none";
  
  // Añadir el input y el botón de guardar
  tituloContainer.insertBefore(input, btnEditar);
  tituloContainer.insertBefore(btnGuardar, btnEditar);
  
  // Enfocar el input
  input.focus();
  
  // Manejar el guardado
  btnGuardar.addEventListener("click", () => {
    guardarTituloFoto(foto, input.value);
  });
  
  // Manejar el Enter en el input
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      guardarTituloFoto(foto, input.value);
    }
  });
}

// Función para guardar el nuevo título
function guardarTituloFoto(foto, nuevoTitulo) {
  const tituloFoto = document.querySelector("#titulo-foto");
  const tituloContainer = document.querySelector(".titulo-imagen");
  const btnEditar = tituloContainer.querySelector(".btn-editar-foto");
  const input = document.querySelector("#editar-titulo-foto");
  const btnGuardar = tituloContainer.querySelector(".btn-guardar-titulo");
  
  // Actualizar el título en el objeto y en la vista
  foto.title = nuevoTitulo;
  tituloFoto.textContent = nuevoTitulo;
  
  // Actualizar también el título en la galería
  const fotoGaleria = document.querySelector(`.foto[data-id="${foto.id}"] .foto-titulo`);
  if (fotoGaleria) {
    fotoGaleria.textContent = nuevoTitulo;
  }
  
  // Actualizar la búsqueda
  const opcionSeleccionada = document.querySelector('.search-option.selected');
  const tipoSeleccionado = opcionSeleccionada?.dataset.type;
  const searchInput = document.getElementById('buscador');
  
  if (tipoSeleccionado === 'fotos') {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm !== '') {
      const resultados = photos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm)
      );
      mostrarResultados(resultados, 'fotos');
    } else {
      mostrarResultados(photos, 'fotos');
    }
  }
  
  // Restaurar la vista normal
  tituloFoto.style.display = "block";
  btnEditar.style.display = "block";
  input.remove();
  btnGuardar.remove();
}

// Event listeners para el modal de foto
document.addEventListener("DOMContentLoaded", () => {
  const modalFoto = document.getElementById("modal-foto");
  const btnCerrar = modalFoto.querySelector(".cerrar-modal");
  const btnEditar = modalFoto.querySelector(".btn-editar-foto");
  
  btnCerrar.addEventListener("click", () => {
    modalFoto.classList.add("oculto");
    document.body.classList.remove("modal-open");
  });
  
  modalFoto.addEventListener("click", (e) => {
    if (e.target === modalFoto) {
      modalFoto.classList.add("oculto");
      document.body.classList.remove("modal-open");
    }
  });
  
  btnEditar.addEventListener("click", () => {
    const photoId = document.querySelector("#titulo-foto").dataset.photoId;
    const foto = photos.find(p => p.id === parseInt(photoId));
    if (foto) {
      convertirTituloEnInput(foto);
    }
  });
});

// Funciones para el modal de añadir usuario
function mostrarModalAddUser() {
  const modalAddUser = document.getElementById('modal-add-user');
  modalAddUser.classList.remove('oculto');
  document.body.classList.add('modal-open');
}

function ocultarModalAddUser() {
  const modalAddUser = document.getElementById('modal-add-user');
  modalAddUser.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

// Event listeners para el modal de añadir usuario
document.addEventListener('DOMContentLoaded', () => {
  const btnAddUser = document.querySelector('.contenedor-add-user');
  const btnCancelarAddUser = document.getElementById('cancelar-creacion-user');
  const modalAddUser = document.getElementById('modal-add-user');

  btnAddUser.addEventListener('click', mostrarModalAddUser);
  
  btnCancelarAddUser.addEventListener('click', ocultarModalAddUser);
  
  modalAddUser.addEventListener('click', (e) => {
    if (e.target === modalAddUser) {
      ocultarModalAddUser();
    }
  });
});

// Funciones para eliminar foto
function eliminarFoto(photoId) {
  // Encontrar el índice de la foto en el array
  const index = photos.findIndex(photo => photo.id === parseInt(photoId));
  if (index !== -1) {
    // Eliminar la foto del array
    photos.splice(index, 1);
    
    // Actualizar la búsqueda
    const opcionSeleccionada = document.querySelector('.search-option.selected');
    const tipoSeleccionado = opcionSeleccionada?.dataset.type;
    const searchInput = document.getElementById('buscador');
    
    if (tipoSeleccionado === 'fotos') {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm !== '') {
        const resultados = photos.filter(photo => 
          photo.title.toLowerCase().includes(searchTerm)
        );
        mostrarResultados(resultados, 'fotos');
      } else {
        mostrarResultados(photos, 'fotos');
      }
    }
    
    // Cerrar el modal
    ocultarModalFoto();
  }
}

// Event listeners para eliminar foto
document.addEventListener('DOMContentLoaded', () => {
  const btnEliminarFoto = document.getElementById('btn-eliminar-foto');
  
  btnEliminarFoto.addEventListener('click', () => {
    const photoId = document.querySelector('#titulo-foto').dataset.photoId;
    mostrarModalEliminar();
    
    // Evento para confirmar eliminación
    const confirmarEliminacion = () => {
      eliminarFoto(photoId);
      ocultarModalEliminar();
      // Remover el event listener después de usarlo
      btnEliminar.removeEventListener('click', confirmarEliminacion);
    };
    
    btnEliminar.addEventListener('click', confirmarEliminacion);
    
    // Remover el event listener si se cancela
    btnCancelar.addEventListener('click', () => {
      btnEliminar.removeEventListener('click', confirmarEliminacion);
    });
  });
});