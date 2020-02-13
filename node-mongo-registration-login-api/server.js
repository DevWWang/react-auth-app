require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const config = require('config.json');
const webpush = require('web-push')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Webpush
webpush.setGCMAPIKey(config.googleAPIKey);
webpush.setVapidDetails(config.webpushContact, config.vapidPublicKey, config.vapidPrivateKey);

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/messages', require('./messages/messages.controller'));
 
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8989 })

const users = [];

const broadcast = (data, ws) => {
	wss.client.forEach((client) => {
		if (client.readyState === WebSocket.OPEN && client !== ws) {
			client.send(JSON.stringify(data))
		}
	})
}

wss.on('connect', (ws) => {
	let index;
	ws.on('message', (message) => {
		const data = JSON.parse(message);
		console.log(message);
		switch (data.type) {
			case 'USER_JOINED':
				index = users.length;
				users.push({name: data.name, id: index + 1});
				ws.send(JSON.stringify({
					type: 'CHATROOM_MEMBERS',
					users
				}))
				broadcast({
					type: 'CHATROOM_MEMBERS',
					users
				}, ws)
				break;

			case 'RECEIVE_REQUEST':
				broadcast({
					type: 'RECEIVE_REQUEST',
					message: data.message
				}, ws)
				break;

			default:
				break;
		}
	})

	ws.on('close', () => {
		users.splice(index, 1)
		broadcast({
			type: 'CHATROOM_MEMBERS',
			users
		}, ws)
	})
})