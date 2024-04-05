const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  console.log(name, content);

  if (name && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, content }),
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
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
