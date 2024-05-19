const urlForm = document.getElementById('urlForm');
const originalUrlInput = document.getElementById('originalUrl');
const shortUrlDiv = document.getElementById('shortUrl');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalUrl = originalUrlInput.value;
    try {
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        shortUrlDiv.innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
    } catch (error) {
        console.error('Error:', error);
        // Handle error, e.g., display an error message to the user
        shortUrlDiv.innerHTML = 'Error occurred. Please try again.';
    }
});
