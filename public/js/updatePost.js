document.querySelector('.update-btn').addEventListener('click', function() {
  
    let currentContent = document.querySelector('.text-area').textContent;
  
    let textArea = document.createElement('textarea');
    textArea.value = currentContent;
  
    // Replace the <p> element with the text area for editing
    document.querySelector('p').replaceWith(textArea);
  
    // Change the button text to "Save Changes"
    document.querySelector('.update-btn').textContent = 'Save Changes';
  
    // Update the event listener to save the changes
    document.querySelector('.update-btn').style.display='none';

    document.querySelector('.save-btn').style.display='block';

    document.querySelector('.save-btn').addEventListener('click', function() {
      let updatedContent = textArea.value;
        console.log(updatedContent)
      // Send a PUT request to update the post
      fetch(`/api/posts/${document.querySelector('.save-btn').getAttribute('data-id')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContent }),
      })
        .then(response => response.json())
        .then(updatedPost => {
          // Handle the updated post data
          console.log('Post updated:', updatedPost);
  
          // Replace the text area with the updated content
          let newParagraph = document.createElement('p');
          newParagraph.textContent = updatedContent;
          textArea.replaceWith(newParagraph);
  
          // Change the button text back to "Update Post"
          document.querySelector('.update-btn').textContent = 'Update Post';
        })
        .catch(error => console.error('Error updating post:', error));
    });
  });
  