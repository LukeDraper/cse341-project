const { json } = require('express');
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    const jsonFile = "users.JSON";
    let users = JSON.parse(fs.readFileSync(jsonFile));
    // fs.readFile("users.JSON", (err, content) =>{
    //     if(err) throw err;
    //     users = JSON.parse(content);
    //     users = users.users;
    //     console.log(users);
    //     return users;
    // });
    console.log(users);

    if (url === '/') {  
        res.write('<html>');
        res.write('<head><title>User Assignment</title></head>');
        res.write('<body><h1>Welcome to this page. You are my favorite user.</h1><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Create User</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {  
        res.write('<html>');
        res.write('<head><title>Users List</title></head>');
        res.write('<body><h1>Users</h1><ul>');
        users.forEach(user => {
            res.write(`<li>${user}</li>`);
        });
        res.write('</ul></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1];
            let usersString;
            console.log("Username: " + userName);
            users.push(userName);
            usersString = JSON.stringify(users);
            console.log("usersString: " + usersString);
            fs.writeFile(jsonFile, usersString, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            });
        });
    }
}

exports.handler = requestHandler;