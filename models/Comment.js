export class Comment {
  constructor(id, postId, name, email, body) {
    this.id = id;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
    this.user = null; // Añadimos una referencia al usuario
  }

  asignarUsuario(usuario) {
    this.user = usuario;
  }

  render() {
    const template = document.getElementById('comment-template').content.cloneNode(true);
    const commentElement = template.querySelector('.comment');
    
    // Añadir atributos data para identificación
    commentElement.dataset.commentId = this.id;
    commentElement.dataset.postId = this.postId;
    
    commentElement.querySelector('.comment-autor').textContent = this.name;
    commentElement.querySelector('.comment-username').textContent = this.email;
    commentElement.querySelector('.comment-body').textContent = this.body;

    // Añadir avatar si tenemos usuario asignado
    if (this.user) {
      commentElement.querySelector('.comment-avatar').src = this.user.getAvatarUrl(25);
    } else {
      // Si no hay usuario, generar avatar basado en el email
      const [localPart, domain] = this.email.split('@');
      const avatarText = `${localPart[0]}${domain[0]}`; // Primera letra de cada parte
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarText)}&size=25&background=random`;
      commentElement.querySelector('.comment-avatar').src = avatarUrl;
    }
    
    return commentElement;
  }
}
