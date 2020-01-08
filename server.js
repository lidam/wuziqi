const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8092, clientTracking: true });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(client => {
      client.send(message);
    })
  });
});