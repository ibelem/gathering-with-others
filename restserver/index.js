/*
 * Copyright © 2018 Intel Corporation. All Rights Reserved.
 */
'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const rest = require('./authrequest');
const config = require('../config.json');

// Directory 'public' for static files
app.use(
	express.static('public', {
		setHeaders: (res) => {
			res.set('Cross-Origin-Embedder-Policy', 'require-corp');
			res.set('Cross-Origin-Opener-Policy', 'same-origin');
		}
	})
);
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

// Set rejectUnauthorized to true for production use
const request = rest(config.id, config.key, config.url, false);

// Prepare sample room before start-up
const prepareSampleRoom = new Promise((onOk, onError) => {
	const checkResponse = (resp) => {
		const rooms = JSON.parse(resp);
		let sampleRoomId = null;
		// Find sample room
		for (const room of rooms) {
			if (room.name === 'sampleRoom') {
				sampleRoomId = room._id;
				break;
			}
		}
		if (sampleRoomId) {
			onOk(sampleRoomId);
		} else {
			// Try create
			const createBody = JSON.stringify({
				name: 'sampleRoom',
				options: {}
			});
			const createOk = (resp) => {
				onOk(JSON.parse(resp)._id);
			};
			request('POST', '/v1/rooms', createBody, createOk, onError);
		}
	};

	request('GET', '/v1/rooms?page=1&per_page=100', null, checkResponse, onError);
});

function onRequestFail(err) {
	console.log('Request Fail:', err);
}

prepareSampleRoom
	.then((sampleRoom) => {
		console.log('Get sampleRoom Id:', sampleRoom);

		// Create token API with default room
		app.post('/createToken/', function (req, res) {
			const tokenRoom = req.body.room || sampleRoom;
			request('POST', '/v1/rooms/' + tokenRoom + '/tokens', req.body)
				.then((imRes) => {
					res.writeHead(imRes.statusCode, imRes.headers);
					imRes.pipe(res);
				})
				.catch(onRequestFail);
		});

		// Route internal REST interface
		app.use(function (req, res) {
			request(req.method, '/v1' + req.path, req.body)
				.then((imRes) => {
					res.writeHead(imRes.statusCode, imRes.headers);
					imRes.pipe(res);
				})
				.catch(onRequestFail);
		});

		// app.get('/tflite', function (req, res) {
		//   res.render('index', { title: 'Hey', message: 'Hello there!'});
		// });

		// Start HTTP server
		// app.listen(config.httpPort);
		// console.log(`Listening on HTTP port ${config.httpPort}`);

		// Start HTTPS server
		try {
			https
				.createServer(
					{
						cert: fs.readFileSync(config.cert),
						key: fs.readFileSync(config.certkey)
					},
					app
				)
				.listen(config.httpsPort);
			console.log(`Rest Server Listening on HTTPS port ${config.httpsPort}`);
		} catch (e) {
			console.log(e);
		}
	})
	.catch((e) => {
		console.log('Failed to intialize sampleRoom', e);
	});
