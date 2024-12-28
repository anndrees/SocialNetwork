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
contenedorAddUser.addEventListener("click",()=>{
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
btnCrearUser.addEventListener("click",()=>{
  //Comprobar los campos sean válidos
  if(camposValidos()){
    let nombre = document.querySelector("#nombrePersona");
    let nombreUser = document.querySelector("#user-Name");
    let correo = document.querySelector("#correo-User");
    let latitud = document.querySelector("#latitud");
    let longitud = document.querySelector("#longitud");
    let telefono = document.querySelector("#telefono");
    let sitioWeb = document.querySelector("#sitio-web");

    //incrementamos el id maximo antes de crear al user
    maxIdUsuario = maxIdUsuario + 1;

    let nuevoUsuario = new User(maxIdUsuario,nombre,nombreUser,correo,latitud,longitud,telefono,sitioWeb);
    console.log(nuevoUsuario);
    console.log("longitud array: " + usuariosPredefinidos.length);
    //metemos al user en el array
    usuariosPredefinidos.push(nuevoUsuario);
    console.log("longitud array despues de meter user: "+usuariosPredefinidos.length);
  }else{
    document.querySelector("#span-datos-incorrectos").textContent = "Los campos en rojon son incorrectos";
  }
});

//Este botón es para ocultar la creación del usuario
let btnCancelarUser = document.getElementById("cancelar-creacion-user");
btnCancelarUser.addEventListener("click",()=>{
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

// Crear objetos Todo
todosObjetos = todos.map(todo => new Todo(todo));

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
  if (usuario) {
    newPost.asignarUsuario(usuario);
  }

  // Añadir al principio del array
  publicacionesObjetos.splice(0, 0, newPost);

  // Renderizar la nueva publicación al principio del contenedor de posts
  const contenedorPublicaciones = document.getElementById('posts-container');
  contenedorPublicaciones.insertBefore(newPost.render(), contenedorPublicaciones.firstChild);

  // Limpiar el formulario
  this.reset();
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

// Eventos para la funcionalidad de eliminar
document.addEventListener('click', (e) => {
  if (e.target.closest('.eliminar-post-btn')) {
    mostrarModalEliminar();
  }

  // Cerrar modal al hacer click fuera
  if (e.target === modalEliminar) {
    ocultarModalEliminar();
  }
});

btnCancelar.addEventListener('click', ocultarModalEliminar);

btnEliminar.addEventListener('click', () => {
  alert("Esto aun no está implementado jaja poneros las pilas");
  ocultarModalEliminar();

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

// Funcionalidad del modal de usuario
const modalUsuario = document.getElementById('modal-usuario');
const btnCerrarModalUsuario = modalUsuario.querySelector('.cerrar-modal');
let clicado = false;

// Hacer la función mostrarPerfilUsuario disponible globalmente
window.mostrarPerfilUsuario = function (userId) {
  const usuario = usuariosObjetos.find(user => user.id === userId);
  if (!usuario) return;

  
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
    const todoElement = document.createElement('div');
    todoElement.className = 'todo-item';
    todoElement.innerHTML = `
      <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
      <label for="todo-${todo.id}">${todo.title}</label>
    `;

    const checkbox = todoElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => {
      todo.completed = e.target.checked;
    });

    todosContainer.appendChild(todoElement);
  });

  let email = modalUsuario.querySelector('.perfil-email');
  let telefono = modalUsuario.querySelector('.perfil-telefono');

  let btnModificarUsuario = modalUsuario.querySelector(".btn-modificar-usuario");
    btnModificarUsuario.addEventListener("click",()=>{
      if (!clicado) {
        email.innerHTML = "<input type='text' id='email1' value='"+usuario.email+"'>";
        telefono.innerHTML = "<input type='text' id='telefono1' value='"+usuario.phone+"'>";
      }else{
        let textoInputEmail = document.getElementById("email1").value;
        let textoInputTelefono = document.getElementById("telefono1").value;

        if (!(textoInputEmail=="" && textoInputTelefono=="")) {
          email.textContent = textoInputEmail;
          telefono.textContent = textoInputTelefono;
          usuario.email = email.textContent;
          usuario.phone = telefono.textContent;
        }
      }
      clicado = !clicado;
    });

  // Mostrar el modal
  modalUsuario.classList.remove('oculto');
  document.body.classList.add('modal-open');
};



function ocultarModalUsuario() {
  modalUsuario.classList.add('oculto');
  document.body.classList.remove('modal-open');
}

// Eventos para abrir/cerrar el modal de usuario
btnCerrarModalUsuario.addEventListener('click', ocultarModalUsuario);
modalUsuario.addEventListener('click',(e) => {
  if (e.target === modalUsuario) {
    ocultarModalUsuario();
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
        const usuario = usuariosObjetos.find(u => u.id === userId);
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
  if (!consulta) {
    encabezadoResultados.textContent = '';
    listaResultados.innerHTML = '';
    return;
  }

  let resultados = [];
  consulta = consulta.toLowerCase();

  switch (tipoBusquedaSeleccionado) {
    case 'usuarios':
      resultados = usuariosObjetos.filter(usuario =>
        usuario.username.toLowerCase().includes(consulta)
      );
      break;
    case 'publicaciones':
      resultados = posts.filter(publicacion =>
        publicacion.title.toLowerCase().includes(consulta)
      );
      break;
    case 'comentarios':
      resultados = comments.filter(comentario =>
        comentario.name.toLowerCase().includes(consulta)
      );
      break;
    case 'fotos':
      resultados = photos.filter(foto =>
        foto.title.toLowerCase().includes(consulta)
      ).map(foto => new Photo(foto));
      break;
    case 'todos':
      resultados = todos.filter(tarea =>
        tarea.title.toLowerCase().includes(consulta)
      ).map(tarea => new Todo(tarea));
      break;
  }

  mostrarResultados(resultados, tipoBusquedaSeleccionado);
}

// Función para mostrar el modal de añadir comentarios
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

// Función para ocultar el modal de comentarios
function ocultarModalComentarios(postElement) {
  const modalComentarios = postElement.querySelector('#modal-add-comments');
  modalComentarios.classList.add('oculto');
  document.body.classList.remove('modal-open');
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
    const contenido = modalComentarios.querySelector('#postBody').value;
    
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

// Funciones para el modal de fotos
function mostrarModalFoto(foto) {
  const modalFoto = document.getElementById('modal-foto');
  const titulo = modalFoto.querySelector('.foto-titulo');
  const imagen = modalFoto.querySelector('.foto-imagen');
  const albumSpan = modalFoto.querySelector('.foto-album span');
  const urlLink = modalFoto.querySelector('.foto-url a');

  titulo.textContent = foto.title;
  imagen.src = foto.url;
  imagen.alt = foto.title;
  albumSpan.textContent = foto.albumId;
  urlLink.href = foto.url;
  urlLink.textContent = foto.url;

  modalFoto.classList.remove('oculto');
  document.body.classList.add('modal-open');
}

function ocultarModalFoto() {
  const modalFoto = document.getElementById('modal-foto');
  modalFoto.classList.add('oculto');
  document.body.classList.remove('modal-open');
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
});
