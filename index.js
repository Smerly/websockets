// Get references to DOM elements
const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');

let ws;

// Display messages from the websocket
function showMessage(message) {
	const newMessage = document.createElement('li');
	newMessage.appendChild(document.createTextNode(`${message}`));
	messages.appendChild(newMessage);
	messages.scrollTop = messages.scrollHeight; // scroll to the top
	messageInput.value = ''; // clear the input field
}

function init() {
	// Clean up before restarting a websocket connection
	if (ws) {
		ws.onerror = ws.onopen = ws.onclose = null;
		ws.close();
	}

	// Make a new Websocket
	ws = new WebSocket('ws://localhost:6969');

	// Handle the connection when it opens
	ws.onopen = () => console.log('!Connection opened!');

	// handle a message event
	ws.onmessage = (e) => {
		var reader = new FileReader();
		reader.onload = function () {
			const data = JSON.parse(reader.result);
			data.date = new Date(data.date);
			showMessage(`${data.username}: ${data.message} - ${data.date}`);
		};
		reader.readAsText(e.data);
	};

	// Handle a close event
	ws.onclose = () => (ws = null);
}

// Handle button clicks
sendBtn.onclick = function () {
	// Send a message
	if (!ws) {
		showMessage('No WebSocket connection :(');
		return;
	}

	const data = {
		message: messageInput.value,
		username: nameInput.value,
		date: new Date(),
	};
	console.log(nameInput.value);
	ws.send(JSON.stringify(data));
	showMessage(`${data.username}: ${data.message} - ${data.date}`);
};

init();

// ------

// // Get references to DOM elements
// const sendBtn = document.querySelector('#send');
// const messages = document.querySelector('#messages');
// const messageInput = document.querySelector('#message-input');
// const username = document.querySelector('#username');

// let ws;

// // Display messages from the websocket
// function showMessage(message) {
// 	const newMessage = document.createElement('li');
// 	// messages.innerHTML += `${message}\n\n` // display the message
// 	newMessage.appendChild(document.createTextNode(`${message}`));
// 	messages.appendChild(newMessage);
// 	messages.scrollTop = messages.scrollHeight; // scroll to the top
// 	messageInput.value = ''; // clear the input field
// }

// function init() {
// 	// Clean up before restarting a websocket connection
// 	if (ws) {
// 		ws.onerror = ws.onopen = ws.onclose = null;
// 		ws.close();
// 	}

// 	// Make a new Websocket
// 	ws = new WebSocket('ws://localhost:6969');

// 	// Handle the connection when it opens
// 	ws.onopen = () => console.log('!Connection opened!');

// 	// handle a message event
// 	ws.onmessage = (e) => {
// 		// blob reader
// 		var reader = new FileReader();
// 		reader.onload = function () {
// 			const data = JSON.parse(reader.result);
// 			data.date = new Date(data.date);
// 			showMessage(`${data.message}`);
// 		};
// 		reader.readAsText(e.data);
// 	};

// 	// Handle a close event
// 	ws.onclose = () => (ws = null);
// }

// // Handle button clicks
// sendBtn.onclick = function () {
// 	// Send a message
// 	if (!ws) {
// 		showMessage('No WebSocket connection :(');
// 		return;
// 	}
// 	const data = {
// 		message: messageInput.value,
// 	};
// 	ws.send(JSON.stringify(data));
// 	showMessage(
// 		`${data.date.getHours()}:${data.date.getMinutes()} ${data.username}: ${
// 			data.message
// 		}`
// 	);
// };
// init();
