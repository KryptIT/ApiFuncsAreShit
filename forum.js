const forumEl = document.getElementById('forum');
const form = document.getElementById('new-post-form');

async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  forumEl.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${post.username}</strong> <em>${new Date(post.time).toLocaleString()}</em><pre>${post.message}</pre>`;
    forumEl.appendChild(div);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!username || !message) return;

  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, message })
  });

  form.reset();
  loadPosts();
});

loadPosts();
