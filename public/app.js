const urlForm = document.getElementById('urlForm');
const originalUrlInput = document.getElementById('originalUrl');
const shortUrlDiv = document.getElementById('shortUrl');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalUrl = originalUrlInput.value;
    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl })
    });
    
    const data = await response.json();
    shortUrlDiv.innerHTML = `Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
});