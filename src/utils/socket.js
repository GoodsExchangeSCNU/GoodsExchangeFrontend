class WebSocketService {
  constructor(userId) {
    this.userId = userId;
    this.socket = null;
    this.callbacks = {
      FetchChatroomlist: [],
      ReceiveNotice: [],
      FetchMessage: [],
      ReceiveMessage: []
    };
  }

  init() {
    this.socket = new WebSocket(`ws://8.138.167.80:6699/ws/chat/${this.userId}/`);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  handleMessage(data) {
    const type = data.type;
    if (this.callbacks[type]) {
      this.callbacks[type].forEach(callback => callback(data));
    }
  }

  send(event, payload) {
    const message = JSON.stringify({ event, ...payload });
    this.socket.send(message);
  }

  fetchAllChatrooms() {
    this.send('fetchallchatrooms', { userid: this.userId });
  }

  sendNotice(anotherUserId) {
    this.send('sendnotice', {
      userid: this.userId,
      another_userid: anotherUserId
    });
  }

  fetchMessage(tradeId) {
    this.send('fetchmessage', { tradeid: tradeId });
  }

  sendMessage(content, tradeId) {
    this.send('sendmessage', { content, tradeid: tradeId });
  }

  on(type, callback) {
    if (this.callbacks[type]) {
      this.callbacks[type].push(callback);
    }
  }
}

export default WebSocketService;
