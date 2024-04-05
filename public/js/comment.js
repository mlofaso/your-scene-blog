const newCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#comment-content').value.trim();

  console.log(content);

  const postId = window.location.pathname.split('/').pop();
  console.log(postId);
  if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ content, post_id: postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project');
    }
  }
};
document
  .querySelector('.commentBtn')
  .addEventListener('click', newCommentHandler);
