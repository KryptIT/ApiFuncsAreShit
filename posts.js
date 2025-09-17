const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'posts.json');

exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      const data = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : [];
      return { statusCode: 200, body: JSON.stringify(data) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const posts = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath))
        : [];
      posts.push({ ...body, time: new Date().toISOString() });
      fs.writeFileSync(filePath, JSON.stringify(posts));
      return { statusCode: 200, body: JSON.stringify(posts) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
