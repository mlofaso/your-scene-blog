document.querySelector('.delete-btn').addEventListener('click', function () {
  fetch(
    `/api/posts/${document
      .querySelector('.delete-btn')
      .getAttribute('data-id')}`,
    {
      method: 'DELETE',
    }
  )
    .then((response) => response.json())
    .then(document.location.replace('/'));
});
