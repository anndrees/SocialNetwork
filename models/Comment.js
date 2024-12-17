export class Comment {
  constructor(id, postId, name, email, body) {
    this.id = id;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
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
    
    return commentElement;
  }
}
