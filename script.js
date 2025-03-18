async function fetchPosts() {
    const query = document.getElementById('searchQuery').value;
    const response = await fetch(`https://search.nfthing.com:443/socialsearch?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    displayPosts(data.posts);
}

function displayPosts(posts) {
    const container = document.getElementById('postsContainer');
    container.innerHTML = ''; // Clear previous results
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.username} (@${post.handle})</h2>
            <p>${post.description}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
            ${post.userimage ? `<img src="${post.userimage}" alt="User Image" style="width:50px; height:50%; border-radius:50%;">` : ''}
            <div class="post-detail"><strong>Source:</strong> ${post.source}</div>
            <div class="post-detail"><strong>Type:</strong> ${post.type}</div>
            <div class="post-detail"><strong>Title:</strong> ${post.title || 'N/A'}</div>
            <div class="post-detail"><strong>Content URL:</strong> ${post.content_url ? `<a href="${post.content_url}">Link</a>` : 'N/A'}</div>
            <div class="post-detail"><strong>Channel URL:</strong> ${post.channel_url ? `<a href="${post.channel_url}">Link</a>` : 'N/A'}</div>
            <div class="post-detail"><strong>Thumbnail URL:</strong> ${post.thumbnail_url ? `<img src="${post.thumbnail_url}" alt="Thumbnail" style="width:100px;">` : 'N/A'}</div>
            <div class="post-detail"><strong>Time:</strong> ${new Date(parseInt(post.time)).toLocaleString()}</div>
            <div class="post-detail"><strong>Canonical URL:</strong> ${post.canonical_url ? `<a href="${post.canonical_url}">Link</a>` : 'N/A'}</div>
            <div class="post-detail"><strong>Similarity Score:</strong> ${post.similarity_score != null ? post.similarity_score.toFixed(3) : 'N/A'}</div>
        `;
        container.appendChild(postElement);
    });
}
