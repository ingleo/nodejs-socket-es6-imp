const socket = io();

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

const newDiv = document.createElement('div');
newDiv.className = 'border border-info-subtle mb-2';
const newContent = document.createTextNode('Starting chat...');
newDiv.appendChild(newContent);
newDiv.appendChild(document.createElement('br'));
const msgDiv = document.getElementById('msg-div');
document.body.insertBefore(newDiv, msgDiv);

socket.on('connect', () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  lblOffline.style.display = '';
  lblOnline.style.display = 'none';
});

socket.on('message-event', (payload) => {
  console.log(payload);
  addMessageToChat(payload, null);
});

btnSend.addEventListener('click', () => {
  const message = txtMessage.value;

  const payload = {
    message,
    date: new Date().getTime(),
    clientId: socket.id,
  };

  socket.emit('message-event', payload, (messageId) => {
    console.log(messageId);
    addMessageToChat(message, 'me');
  });
});

function addMessageToChat(message, subject) {
  if (subject) {
    subjectElement = document.createElement('span');
    subjectContent = document.createTextNode('Me: ');
    subjectElement.appendChild(subjectContent);
    subjectElement.style.color = 'green';
    newDiv.appendChild(subjectElement);
    messageContent = document.createTextNode(message);
    newDiv.appendChild(messageContent);
    newDiv.appendChild(document.createElement('br'));
  } else {
    subjectElement = document.createElement('span');
    subjectContent = document.createTextNode('Friend: ');
    subjectElement.appendChild(subjectContent);
    subjectElement.style.color = 'blue';
    newDiv.appendChild(subjectElement);
    messageContent = document.createTextNode(message);
    newDiv.appendChild(messageContent);
    newDiv.appendChild(document.createElement('br'));
  }
}
