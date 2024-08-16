document.getElementById('send-button').addEventListener('click', function() {
    const webhookUrl = document.getElementById('webhook-url').value;
    const username = document.getElementById('username').value;
    const avatarUrl = document.getElementById('avatar-url').value;
    const content = document.getElementById('content').value;
    const audioFile = document.getElementById('audio-file').files[0];
    const videoUrl = document.getElementById('video-url').value;

    const embed = {
        title: document.getElementById('embed-title').value,
        description: document.getElementById('embed-description').value + (videoUrl ? `\n\nVideo: ${videoUrl}` : ''),
        color: parseInt(document.getElementById('embed-color').value.replace('#', ''), 16),
        url: document.getElementById('embed-url').value,
        image: { url: document.getElementById('image-url').value },
        thumbnail: { url: document.getElementById('thumbnail-url').value },
        footer: {
            text: document.getElementById('footer-text').value,
            icon_url: document.getElementById('footer-icon-url').value
        }
    };

    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({
        username: username,
        avatar_url: avatarUrl,
        content: content,
        embeds: [embed]
    }));

    if (audioFile) {
        formData.append('file', audioFile);
    }

    fetch(webhookUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Message sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message.');
    });
});
