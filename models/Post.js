export class Post {
  constructor(id, userId, title, body) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.user = null;
    this.comments = [];
    this.commentIndex = 3; // Inicialmente mostraremos 3 comentarios
  }

  asignarUsuario(user) {
    this.user = user;
  }

  agregarComentario(comment) {
    this.comments.push(comment);
  }

   render() {
    const template = document.getElementById('post-template').content.cloneNode(true);
    const postElement = template.querySelector('.post');
    
    // Añadir el data-post-id al elemento del post
    postElement.dataset.postId = this.id;
    
    postElement.querySelector('.post-titulo').textContent = this.title;
    const autorElement = postElement.querySelector('.post-autor');
    autorElement.textContent = `Publicado por ${this.user.name} (@${this.user.username})`;
    autorElement.dataset.userid = this.user.id;
    autorElement.classList.add('usuario-link');

    postElement.querySelector('.post-body').textContent = this.body;

    const commentsContainer = postElement.querySelector('.comments-container');
    const commentsCount = postElement.querySelector('.comments-count');
    commentsCount.textContent = this.comments.length;
    const postID = postElement.querySelector('#post-id'); 
    postID.textContent = this.id;
    postID.classList.add('oculto');

    //Coger los botones para el comentario
    let btnAddComentario = postElement.querySelector("#add-comment");
    let btnCancelarComment = postElement.querySelector("#cancelar-comment");

    //Mostrar el formulario de añadir el comentario
    btnAddComentario.addEventListener("click",()=>{
      postElement.querySelector("#modal-add-comments").classList.remove("oculto");
      document.body.classList.add('modal-open');
    });

    //Crear un nuevo comentario comentario
    /* let btnPublicar = postElement.querySelector("#publicarComment");
    console.log(btnPublicar);
    btnPublicar.addEventListener("click", () => {
      console.log("has hecho click");
      let tituloComment = postElement.querySelector("#tituloComment").value;
      let contenidoComment = postElement.querySelector("#postId").value;
      let nuevoComment = new Comment("nextId", "postId", name, contenidoComment);
      console.log(nuevoComment)
      nuevoComment.push(comentariosObjetos);
    }); */

    //Ocultar el formulario de añadir el comentario al pulsar cancelar
    btnCancelarComment.addEventListener("click",()=>{
      postElement.querySelector("#modal-add-comments").classList.add("oculto");
      document.body.classList.remove('modal-open');
    });
    
    // Mostrar los primeros 3 comentarios
    this.comments.slice(0, 3).forEach(comment => {
      const commentElement = comment.render();
      commentsContainer.appendChild(commentElement);
    });

    // Ocultar el resto de comentarios
    this.comments.slice(3).forEach(comment => {
      const commentElement = comment.render();
      commentElement.classList.add('hidden');
      commentsContainer.appendChild(commentElement);
    });
    //Miguel gil
    // Si hay más de 3 comentarios, mostrar el enlace "Ver más comentarios"
    if (this.comments.length > 3) {
      const verMasLink = document.createElement('a');
      verMasLink.href = '#';
      verMasLink.className = 'ver-mas-comentarios';
      verMasLink.textContent = 'Ver más comentarios';
      
      verMasLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.mostrarMasComentarios(commentsContainer);
      });
      
      commentsContainer.appendChild(verMasLink);
    }

    // Añadir event listener para el click en el autor
    autorElement.addEventListener('click', () => {
      if (this.user) {
        const mostrarPerfilUsuario = window.mostrarPerfilUsuario;
        if (typeof mostrarPerfilUsuario === 'function') {
          mostrarPerfilUsuario(this.user.id);
        }
      }
    });

    return postElement;
  }

  mostrarMasComentarios(commentsContainer) {
    // Calcular cuántos comentarios más mostrar
    const start = this.commentIndex;
    const end = Math.min(start + 5, this.comments.length);
    
    // Mostrar los siguientes comentarios con animación
    const commentsOcultos = commentsContainer.querySelectorAll('.comment.hidden');
    for (let i = 0; i < end - start; i++) {
      if (commentsOcultos[i]) {
        commentsOcultos[i].classList.remove('hidden');
        commentsOcultos[i].classList.add('showing');
      }
    }
    
    // Actualizar el índice
    this.commentIndex = end;
    
    // Si no hay más comentarios para mostrar, ocultar el enlace
    if (this.commentIndex >= this.comments.length) {
      const verMasLink = commentsContainer.querySelector('.ver-mas-comentarios');
      verMasLink.style.display = 'none';
    }
  }
}
