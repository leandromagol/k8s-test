const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 8080;
const BRANCH = process.env.BRANCH_NAME || 'unknown';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Preview Environment - ${BRANCH}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: rgba(255,255,255,0.95);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 600px;
          width: 100%;
        }
        h1 {
          color: #667eea;
          margin-bottom: 30px;
          font-size: 2.5em;
          text-align: center;
        }
        .info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin: 15px 0;
          border-left: 4px solid #667eea;
        }
        .info strong {
          color: #333;
          display: inline-block;
          min-width: 120px;
        }
        .info span {
          color: #667eea;
          font-weight: 600;
        }
        .success {
          background: #d4edda;
          color: #155724;
          padding: 15px;
          border-radius: 10px;
          margin-top: 20px;
          text-align: center;
          font-weight: 600;
        }
        .emoji { font-size: 1.5em; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1><span class="emoji">🚀</span> Preview Environment 2:w</h1>
        <div class="info">
          <strong>Branch:</strong> <span>${BRANCH}</span>
        </div>
        <div class="info">
          <strong>Hostname:</strong> <span>${os.hostname()}</span>
        </div>
        <div class="info">
          <strong>Platform:</strong> <span>${os.platform()}</span>
        </div>
        <div class="info">
          <strong>Timestamp:</strong> <span>${new Date().toLocaleString('pt-BR')}</span>
        </div>
        <div class="success">
          ✅ Deployment realizado com sucesso!
        </div>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} for branch ${BRANCH}`);
});
