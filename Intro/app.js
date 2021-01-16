const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8' 
        });

        if (req.url === '/') {
            const htmlFileName = 'index.html';
        } else if (req.url === '/about') {
            const htmlFileName = 'about.html';
        }

        if (req.url === '/') {
            fs.readFile(
                path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);
                }
            );
        } else if (req.url === '/about') {
            fs.readFile(
                path.join(__dirname, 'views', 'about.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);
                }
            );
        } else if (req.url === '/api/users') {
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });

            const users = [
                {name: 'Vlad', age: 22},
                {name: 'Sergey', age: 22}
            ];

            res.end(JSON.stringify(users));
        }
    } else if (req.method === 'POST') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        
        const body = [];

        req.on('data', data => {
            body.push(Buffer.from(data));
        });

        req.on('end', () => {
            const message = body.toString().split('=')[1];

            res.end(`
                <h1>Your message: ${message}</h1>
            `);
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});